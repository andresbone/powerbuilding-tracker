import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExerciseCard } from '@/components/exercise-card';
import { initializeBasicExercises } from '@/app/actions/1rms';
import type { Exercise, User1RM } from '@/lib/supabase/types';
import Link from 'next/link';

export default async function OneRMPage() {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch exercises
    const { data: exercises, error: exercisesError } = await supabase
        .from('exercises')
        .select('*')
        .order('name');

    // Fetch user's current 1RMs
    const { data: user1RMs, error: user1RMsError } = await supabase
        .from('user_1rms')
        .select('*')
        .eq('user_id', user.id);

    if (exercisesError) {
        console.error('Error fetching exercises:', exercisesError);
    }

    if (user1RMsError) {
        console.error('Error fetching user 1RMs:', user1RMsError);
    }

    // Create a map of exercise_id -> 1RM for quick lookup
    const oneRMMap = new Map<string, User1RM>();
    user1RMs?.forEach((rm) => {
        oneRMMap.set(rm.exercise_id, rm);
    });

    // If no exercises exist, show initialization option
    if (!exercises || exercises.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="mb-4">
                                ← Volver al Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            Gestión de 1RMs
                        </h1>
                        <p className="text-muted-foreground">
                            Registra tus máximos de una repetición
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>No hay ejercicios disponibles</CardTitle>
                            <CardDescription>
                                Inicializa los ejercicios básicos para comenzar a trackear tus 1RMs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={async () => {
                                'use server';
                                await initializeBasicExercises();
                            }}>
                                <Button type="submit" size="lg" className="w-full">
                                    Inicializar Ejercicios Básicos
                                </Button>
                            </form>
                            <p className="text-sm text-muted-foreground mt-4">
                                Esto creará: Squat, Bench Press, Deadlift, Overhead Press, Barbell Row
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            ← Volver al Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Gestión de 1RMs
                    </h1>
                    <p className="text-muted-foreground">
                        Actualiza tus máximos de una repetición para cada ejercicio
                    </p>
                </div>

                <div className="space-y-4">
                    {exercises.map((exercise: Exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            current1RM={oneRMMap.get(exercise.id)}
                        />
                    ))}
                </div>

                {exercises.length === 0 && (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                No hay ejercicios disponibles. Contacta al administrador.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
