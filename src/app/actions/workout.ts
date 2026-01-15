'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface SetData {
    exerciseId: string;
    setNum: number;
    weight: string;
    reps: string;
    rpe: string;
    completed: boolean;
}

export interface ExerciseData {
    exerciseId: string;
    sets: SetData[];
}

/**
 * Saves a completed workout to the database
 */
export async function finishWorkout(
    templateId: string,
    startedAt: string,
    exercises: ExerciseData[]
) {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in to save workouts' };
    }

    try {
        // Step 1: Create workout log
        const { data: workoutLog, error: workoutLogError } = await supabase
            .from('workout_logs')
            .insert({
                user_id: user.id,
                template_id: templateId,
                started_at: startedAt,
                ended_at: new Date().toISOString(),
            })
            .select('id')
            .single();

        if (workoutLogError) {
            throw new Error(`Failed to create workout log: ${workoutLogError.message}`);
        }

        const workoutLogId = workoutLog.id;

        // Step 2: Prepare set logs (only completed sets)
        const setLogs: any[] = [];

        for (const exercise of exercises) {
            for (const set of exercise.sets) {
                // Only save completed sets
                if (!set.completed) {
                    continue;
                }

                // Validate and parse values
                const weight = parseFloat(set.weight);
                const reps = parseInt(set.reps, 10);
                const rpe = set.rpe ? parseFloat(set.rpe) : null;

                // Validate required fields
                if (isNaN(weight) || weight < 0) {
                    return {
                        error: `Invalid weight for set ${set.setNum}. Please enter a valid number.`
                    };
                }

                if (isNaN(reps) || reps <= 0) {
                    return {
                        error: `Invalid reps for set ${set.setNum}. Please enter a valid number.`
                    };
                }

                if (rpe !== null && (isNaN(rpe) || rpe < 0 || rpe > 10)) {
                    return {
                        error: `Invalid RPE for set ${set.setNum}. Must be between 0 and 10.`
                    };
                }

                setLogs.push({
                    workout_log_id: workoutLogId,
                    exercise_id: exercise.exerciseId,
                    set_num: set.setNum,
                    weight_kg: weight,
                    reps_performed: reps,
                    rpe_actual: rpe,
                });
            }
        }

        // Check if at least one set was completed
        if (setLogs.length === 0) {
            // Delete the workout log since no sets were saved
            await supabase
                .from('workout_logs')
                .delete()
                .eq('id', workoutLogId);

            return {
                error: 'No completed sets found. Please complete at least one set before finishing.'
            };
        }

        // Step 3: Insert all set logs
        const { error: setLogsError } = await supabase
            .from('set_logs')
            .insert(setLogs);

        if (setLogsError) {
            // Try to clean up the workout log
            await supabase
                .from('workout_logs')
                .delete()
                .eq('id', workoutLogId);

            throw new Error(`Failed to save sets: ${setLogsError.message}`);
        }

        // Step 4: Revalidate paths
        revalidatePath('/dashboard');
        revalidatePath('/history');

        // Step 5: Redirect to dashboard
        redirect('/dashboard');

    } catch (error: any) {
        console.error('Error saving workout:', error);

        // If it's a redirect, let it through
        if (error.message === 'NEXT_REDIRECT') {
            throw error;
        }

        return {
            error: error.message || 'Failed to save workout. Please try again.'
        };
    }
}
