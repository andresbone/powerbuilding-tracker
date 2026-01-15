'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

/**
 * Update or insert a user's 1RM for a specific exercise
 */
export async function update1RM(exerciseId: string, weightKg: number) {
    const supabase = await createServerClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in to update 1RMs' };
    }

    // Validate weight
    if (!weightKg || weightKg <= 0) {
        return { error: 'Weight must be a positive number' };
    }

    // Upsert the 1RM record
    const { error } = await supabase
        .from('user_1rms')
        .upsert({
            user_id: user.id,
            exercise_id: exerciseId,
            weight_kg: weightKg,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'user_id,exercise_id'
        });

    if (error) {
        console.error('Error updating 1RM:', error);
        return { error: `Failed to update 1RM: ${error.message}` };
    }

    // Revalidate the page to show updated data
    revalidatePath('/dashboard/1rms');

    return { success: true };
}

/**
 * Initialize basic exercises (Squat, Bench, Deadlift, OHP)
 * This is a temporary helper for development/testing
 */
export async function initializeBasicExercises() {
    const supabase = await createServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in' };
    }

    const basicExercises = [
        { name: 'Squat', video_url: null },
        { name: 'Bench Press', video_url: null },
        { name: 'Deadlift', video_url: null },
        { name: 'Overhead Press', video_url: null },
        { name: 'Barbell Row', video_url: null },
    ];

    const { error } = await supabase
        .from('exercises')
        .insert(basicExercises);

    if (error) {
        console.error('Error initializing exercises:', error);
        return { error: `Failed to initialize exercises: ${error.message}` };
    }

    revalidatePath('/dashboard/1rms');

    return { success: true };
}

/**
 * Delete a user's 1RM record
 */
export async function delete1RM(exerciseId: string) {
    const supabase = await createServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in' };
    }

    const { error } = await supabase
        .from('user_1rms')
        .delete()
        .eq('user_id', user.id)
        .eq('exercise_id', exerciseId);

    if (error) {
        console.error('Error deleting 1RM:', error);
        return { error: `Failed to delete 1RM: ${error.message}` };
    }

    revalidatePath('/dashboard/1rms');

    return { success: true };
}
