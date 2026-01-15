import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { VolumeChart } from '@/components/dashboard/volume-chart';

interface VolumeData {
    name: string;
    total: number;
}

export default async function DashboardPage() {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch workout logs with set_logs and templates for volume calculation
    const { data: workoutLogs } = await supabase
        .from('workout_logs')
        .select(`
            id,
            workout_templates (
                week_num
            ),
            set_logs (
                weight_kg,
                reps_performed
            )
        `)
        .eq('user_id', user.id);

    // Calculate weekly volume
    const weeklyVolumeMap = new Map<number, number>();

    workoutLogs?.forEach((log: any) => {
        const weekNum = log.workout_templates?.week_num;
        if (!weekNum) return;

        // Calculate volume for this workout
        const workoutVolume = log.set_logs?.reduce((sum: number, set: any) => {
            return sum + (set.weight_kg * set.reps_performed);
        }, 0) || 0;

        // Add to weekly total
        const currentTotal = weeklyVolumeMap.get(weekNum) || 0;
        weeklyVolumeMap.set(weekNum, currentTotal + workoutVolume);
    });

    // Convert to array and sort by week
    const volumeData: VolumeData[] = Array.from(weeklyVolumeMap.entries())
        .map(([week, total]) => ({
            name: `Semana ${week}`,
            total: Math.round(total)
        }))
        .sort((a, b) => {
            const weekA = parseInt(a.name.split(' ')[1]);
            const weekB = parseInt(b.name.split(' ')[1]);
            return weekA - weekB;
        });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user.email}
                    </p>
                </div>

                {/* Volume Chart - Prominent at top */}
                <div className="mb-8">
                    <VolumeChart data={volumeData} />
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
            </div>
        </div>
    );
}
