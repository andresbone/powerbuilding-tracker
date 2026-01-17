import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { VolumeChart } from '@/components/dashboard/volume-chart';
import { StrengthChart } from '@/components/dashboard/strength-chart';
import { AnalyticsCarousel } from '@/components/dashboard/analytics-carousel';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { DashboardOnboarding } from '@/components/dashboard/dashboard-onboarding';
import { getDailyPerformance } from '@/lib/logic/smart-coach';
import { format } from 'date-fns';

interface VolumeData {
    date: string;
    total: number;
}

interface StrengthDataPoint {
    date: string;
    historical: number | null;
    daily: number | null;
}

export default async function DashboardPage() {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check for onboarding: Fetch main lifts and user's 1RMs
    const mainLiftsNames = ["Back Squat", "Barbell Bench Press", "Deadlift", "Overhead Press"];
    const { data: mainLiftsExercises } = await supabase
        .from('exercises')
        .select('id, name')
        .in('name', mainLiftsNames);

    const { data: onboarding1RMs } = await supabase
        .from('user_1rms')
        .select('exercise_id')
        .eq('user_id', user.id)
        .in('exercise_id', (mainLiftsExercises || []).map(e => e.id));

    // Determine which main lifts are missing
    const onboarding1RMSet = new Set((onboarding1RMs || []).map(rm => rm.exercise_id));
    const missingExercises = (mainLiftsExercises || [])
        .filter(ex => !onboarding1RMSet.has(ex.id))
        .map(ex => ({ id: ex.id, name: ex.name }));

    const shouldShowOnboarding = missingExercises.length > 0;


    // Fetch workout logs with set_logs and templates for volume calculation
    const { data: workoutLogs } = await supabase
        .from('workout_logs')
        .select(`
            id,
            started_at,
            workout_templates (
                week_num
            ),
            set_logs (
                weight_kg,
                reps_performed,
                rpe_actual,
                exercise_id,
                created_at
            )
        `)
        .eq('user_id', user.id)
        .order('started_at', { ascending: true });

    // Calculate volume by date
    const volumeByDate = new Map<string, number>();

    workoutLogs?.forEach((log: any) => {
        const date = log.started_at;
        if (!date) return;

        // Calculate volume for this workout
        const workoutVolume = log.set_logs?.reduce((sum: number, set: any) => {
            return sum + (set.weight_kg * set.reps_performed);
        }, 0) || 0;

        // Add to date total
        const currentTotal = volumeByDate.get(date) || 0;
        volumeByDate.set(date, currentTotal + workoutVolume);
    });

    // Convert to array with dates
    const volumeData: VolumeData[] = Array.from(volumeByDate.entries())
        .map(([date, total]) => ({
            date,
            total: Math.round(total)
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Fetch user's 1RMs for strength chart
    const { data: user1RMs } = await supabase
        .from('user_1rms')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: true });

    // Calculate strength progression data
    // For simplicity, we'll focus on the main compound lifts
    const strengthData: StrengthDataPoint[] = [];

    // Get unique dates from workout logs
    const workoutDates = new Map<string, any[]>();
    workoutLogs?.forEach((log: any) => {
        const date = format(new Date(log.started_at), 'MMM dd');
        if (!workoutDates.has(date)) {
            workoutDates.set(date, []);
        }
        workoutDates.get(date)?.push(log);
    });

    // For each date, calculate the best daily estimated 1RM
    Array.from(workoutDates.entries()).forEach(([date, logs]) => {
        let maxDaily = 0;

        logs.forEach((log: any) => {
            log.set_logs?.forEach((set: any) => {
                if (set.rpe_actual && set.weight_kg && set.reps_performed) {
                    const daily = getDailyPerformance(
                        set.weight_kg,
                        set.reps_performed,
                        set.rpe_actual
                    );
                    if (daily > maxDaily) {
                        maxDaily = daily;
                    }
                }
            });
        });

        strengthData.push({
            date,
            historical: null,
            daily: maxDaily > 0 ? maxDaily : null,
        });
    });

    // Add historical 1RM data points
    user1RMs?.forEach((rm: any) => {
        const date = format(new Date(rm.updated_at), 'MMM dd');
        const existing = strengthData.find(d => d.date === date);
        if (existing) {
            existing.historical = rm.weight_kg;
        } else {
            strengthData.push({
                date,
                historical: rm.weight_kg,
                daily: null,
            });
        }
    });

    // Sort by date
    strengthData.sort((a, b) => {
        const dateA = new Date(a.date + ' 2024');
        const dateB = new Date(b.date + ' 2024');
        return dateA.getTime() - dateB.getTime();
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <SignOutButton />
                    </div>
                    <p className="text-muted-foreground">
                        Welcome back, {user.email}
                    </p>
                </div>

                {/* Analytics Carousel */}
                <div className="mb-8">
                    <AnalyticsCarousel
                        volumeData={volumeData}
                        strengthData={strengthData}
                    />
                </div>

                {/* Action Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>1RM Management</CardTitle>
                            <CardDescription>
                                Track your one-rep maxes for each exercise
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/dashboard/1rms">Manage 1RMs</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Start Workout</CardTitle>
                            <CardDescription>
                                Begin a new workout session with smart logging
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/workout/start">Start Workout</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Workout History</CardTitle>
                            <CardDescription>
                                View your past workouts and progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/dashboard/history">View History</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Panel</CardTitle>
                            <CardDescription>
                                Database seeding and management tools
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full" variant="secondary">
                                <Link href="/dashboard/admin">Admin Tools</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Onboarding Dialog */}
                <DashboardOnboarding
                    shouldShowOnboarding={shouldShowOnboarding}
                    missingExercises={missingExercises}
                />
            </div>
        </div>
    );
}
