'use server';

import { createServerClient } from '@/lib/supabase';
import { FULL_PROGRAM } from '@/lib/data/powerbuilding-program';
import type { ExerciseData } from '@/lib/data/powerbuilding-program';

/**
 * Seeds the database with the complete Powerbuilding Program
 * This is idempotent - safe to run multiple times
 */
export async function seedFullProgram() {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in to seed the database' };
    }

    try {
        const program = FULL_PROGRAM;

        // Step 1: Create or get the program
        let { data: existingProgram } = await supabase
            .from('programs')
            .select('id')
            .eq('name', program.name)
            .single();

        let programId: string;

        if (existingProgram) {
            programId = existingProgram.id;
            console.log('Program already exists, using existing ID');
        } else {
            const { data: newProgram, error: programError } = await supabase
                .from('programs')
                .insert({
                    name: program.name,
                    author: program.author,
                })
                .select('id')
                .single();

            if (programError) throw programError;
            programId = newProgram.id;
            console.log('Created new program');
        }

        // Step 2: Collect all unique exercise names from the entire program
        const exerciseNamesSet = new Set<string>();
        program.weeks.forEach((week) => {
            week.days.forEach((day) => {
                day.exercises.forEach((exercise) => {
                    exerciseNamesSet.add(exercise.name);
                });
            });
        });

        const exerciseNames = Array.from(exerciseNamesSet);

        // Step 3: Ensure all exercises exist
        const exerciseMap = new Map<string, string>();

        for (const exerciseName of exerciseNames) {
            let { data: existingExercise } = await supabase
                .from('exercises')
                .select('id')
                .ilike('name', exerciseName)
                .single();

            if (existingExercise) {
                exerciseMap.set(exerciseName, existingExercise.id);
            } else {
                const { data: newExercise, error: exerciseError } = await supabase
                    .from('exercises')
                    .insert({ name: exerciseName, video_url: null })
                    .select('id')
                    .single();

                if (exerciseError) throw exerciseError;
                exerciseMap.set(exerciseName, newExercise.id);
                console.log(`Created exercise: ${exerciseName}`);
            }
        }

        // Step 4: Iterate through weeks and days to create templates
        let templatesCreated = 0;
        let templatesSkipped = 0;
        let totalExercisesCreated = 0;

        for (const week of program.weeks) {
            for (const day of week.days) {
                // Check if template already exists
                let { data: existingTemplate } = await supabase
                    .from('workout_templates')
                    .select('id')
                    .eq('program_id', programId)
                    .eq('week_num', week.weekNum)
                    .eq('day_num', day.dayNum)
                    .single();

                if (existingTemplate) {
                    console.log(`Template "${day.name}" already exists, skipping`);
                    templatesSkipped++;
                    continue;
                }

                // Create template
                const { data: newTemplate, error: templateError } = await supabase
                    .from('workout_templates')
                    .insert({
                        program_id: programId,
                        week_num: week.weekNum,
                        day_num: day.dayNum,
                        name: day.name,
                    })
                    .select('id')
                    .single();

                if (templateError) throw templateError;
                const templateId = newTemplate.id;
                templatesCreated++;

                // Step 5: Insert template exercises for this day
                const templateExercises = day.exercises.map((exercise: ExerciseData, index: number) => ({
                    template_id: templateId,
                    exercise_id: exerciseMap.get(exercise.name)!,
                    order_index: index + 1,
                    sets_planned: exercise.sets,
                    reps_target: exercise.reps,
                    rpe_target: exercise.rpe,
                    percent_1rm_min: exercise.percentMin,
                    percent_1rm_max: exercise.percentMax,
                    notes: exercise.notes,
                }));

                const { error: templateExercisesError } = await supabase
                    .from('template_exercises')
                    .insert(templateExercises);

                if (templateExercisesError) throw templateExercisesError;
                totalExercisesCreated += templateExercises.length;

                console.log(`Created template: ${day.name} with ${templateExercises.length} exercises`);
            }
        }

        return {
            success: true,
            message: `Program seeded successfully!`,
            details: {
                programId,
                weeksProcessed: program.weeks.length,
                templatesCreated,
                templatesSkipped,
                totalExercisesCreated,
                uniqueExercises: exerciseNames.length,
            },
        };

    } catch (error: any) {
        console.error('Error seeding program:', error);
        return {
            error: `Failed to seed program: ${error.message}`,
        };
    }
}

/**
 * Clears all program data (use with caution!)
 */
export async function clearProgramData() {
    const supabase = await createServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'You must be logged in' };
    }

    try {
        // Delete in reverse order of dependencies
        await supabase.from('template_exercises').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('workout_templates').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('programs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        return { success: true, message: 'Program data cleared' };
    } catch (error: any) {
        return { error: `Failed to clear data: ${error.message}` };
    }
}
