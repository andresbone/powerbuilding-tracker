import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { DeleteWorkoutButton } from '@/components/delete-workout-button';

interface WorkoutLogWithDetails {
    id: string;
    started_at: string;
    ended_at: string;
    workout_templates: {
        name: string;
        week_num: number;
        day_num: number;
    } | null;
    set_logs: {
        exercise_id: string;
        set_num: number;
        weight_kg: number;
        reps_performed: number;
        rpe_actual: number | null;
        exercises: {
            name: string;
        };
    }[];
}

interface ExerciseSummary {
    name: string;
    totalSets: number;
    bestSet: {
        weight: number;
        reps: number;
    };
}

function calculateDuration(startedAt: string, endedAt: string): string {
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}

function summarizeExercises(setLogs: WorkoutLogWithDetails['set_logs']): ExerciseSummary[] {
    const exerciseMap = new Map<string, ExerciseSummary>();

    setLogs.forEach((set) => {
        const existing = exerciseMap.get(set.exercise_id);

        if (existing) {
            existing.totalSets++;
            // Update best set if this one is heavier or same weight with more reps
            if (
                set.weight_kg > existing.bestSet.weight ||
                (set.weight_kg === existing.bestSet.weight && set.reps_performed > existing.bestSet.reps)
            ) {
                existing.bestSet = {
                    weight: set.weight_kg,
                    reps: set.reps_performed,
                };
            }
        } else {
            exerciseMap.set(set.exercise_id, {
                name: set.exercises.name,
                totalSets: 1,
                bestSet: {
                    weight: set.weight_kg,
                    reps: set.reps_performed,
                },
            });
        }
    });

    return Array.from(exerciseMap.values());
}

export default async function HistoryPage() {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch workout logs with related data
    const { data: workoutLogs, error } = await supabase
        .from('workout_logs')
        .select(`
      id,
      started_at,
      ended_at,
      workout_templates (
        name,
        week_num,
        day_num
      ),
      set_logs (
        exercise_id,
        set_num,
        weight_kg,
        reps_performed,
        rpe_actual,
        exercises (
          name
        )
      )
    `)
        .eq('user_id', user.id)
        .order('ended_at', { ascending: false });

    if (error) {
        console.error('Error fetching workout logs:', error);
    }

    const logs = (workoutLogs || []) as unknown as WorkoutLogWithDetails[];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            ← Volver al Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Historial de Entrenamientos
                    </h1>
                    <p className="text-muted-foreground">
                        Revisa tus entrenamientos pasados y tu progreso
                    </p>
                </div>

                {logs.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4 py-8">
                                <p className="text-lg text-muted-foreground">
                                    Aún no has completado ningún entrenamiento
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    ¡Comienza tu primer workout y empieza a trackear tu progreso!
                                </p>
                                <Button asChild className="mt-4">
                                    <Link href="/workout/start">Iniciar Entrenamiento</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {logs.map((log) => {
                            const exercises = summarizeExercises(log.set_logs);
                            const duration = log.ended_at
                                ? calculateDuration(log.started_at, log.ended_at)
                                : 'En progreso';

                            const relativeDate = formatDistanceToNow(new Date(log.started_at), {
                                addSuffix: true,
                                locale: es,
                            });

                            return (
                                <Card key={log.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl">
                                                    {log.workout_templates?.name || 'Entrenamiento Libre'}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    {relativeDate} • {duration}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                {log.workout_templates && (
                                                    <div className="text-right text-sm text-muted-foreground">
                                                        <div>Semana {log.workout_templates.week_num}</div>
                                                        <div>Día {log.workout_templates.day_num}</div>
                                                    </div>
                                                )}
                                                <DeleteWorkoutButton
                                                    workoutId={log.id}
                                                    workoutName={log.workout_templates?.name || 'Entrenamiento Libre'}
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {exercises.map((exercise, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between py-2 border-b last:border-0"
                                                >
                                                    <div className="flex-1">
                                                        <p className="font-medium">{exercise.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {exercise.totalSets} {exercise.totalSets === 1 ? 'serie' : 'series'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold">
                                                            {exercise.bestSet.weight} kg × {exercise.bestSet.reps}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Mejor serie
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
