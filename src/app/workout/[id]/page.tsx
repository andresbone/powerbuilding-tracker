import { createServerClient } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { WorkoutSession } from '@/components/workout-session';
import Link from 'next/link';
import type { TemplateExerciseWithExercise } from '@/lib/supabase/types';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch the workout template with exercises
    const { data: template, error: templateError } = await supabase
        .from('workout_templates')
        .select(`
      id,
      name,
      week_num,
      day_num,
      programs (
        name,
        author
      )
    `)
        .eq('id', id)
        .single();

    if (templateError || !template) {
        notFound();
    }

    // Fetch template exercises with exercise details
    const { data: templateExercises, error: exercisesError } = await supabase
        .from('template_exercises')
        .select(`
      id,
      template_id,
      exercise_id,
      order_index,
      sets_planned,
      reps_target,
      rpe_target,
      percent_1rm_min,
      percent_1rm_max,
      notes,
      exercise:exercises (
        id,
        name,
        video_url
      )
    `)
        .eq('template_id', id)
        .order('order_index', { ascending: true });

    if (exercisesError) {
        console.error('Error fetching exercises:', exercisesError);
    }

    // Fetch user's 1RMs
    const { data: user1RMs, error: user1RMsError } = await supabase
        .from('user_1rms')
        .select('*')
        .eq('user_id', user.id);

    if (user1RMsError) {
        console.error('Error fetching user 1RMs:', user1RMsError);
    }

    // Type assertion for template exercises
    const exercises = (templateExercises || []) as unknown as TemplateExerciseWithExercise[];

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 py-6 max-w-3xl">
                <div className="mb-6">
                    <Link href="/workout/start">
                        <Button variant="ghost" className="mb-4">
                            ← Cambiar Rutina
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {template.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {template.programs.name} - Semana {template.week_num}, Día {template.day_num}
                        </p>
                    </div>
                </div>

                {exercises.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            Esta rutina no tiene ejercicios configurados.
                        </p>
                    </div>
                ) : (
                    <WorkoutSession
                        templateExercises={exercises}
                        user1RMs={user1RMs || []}
                        templateName={template.name}
                        templateId={id}
                    />
                )}
            </div>
        </div>
    );
}
