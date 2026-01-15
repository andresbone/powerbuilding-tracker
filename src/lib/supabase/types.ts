/**
 * Database type definitions for Supabase tables
 * These types match the schema created in Supabase
 */

export interface Exercise {
    id: string;
    name: string;
    video_url: string | null;
    created_at: string;
}

export interface Program {
    id: string;
    name: string;
    author: string;
    created_at: string;
}

export interface WorkoutTemplate {
    id: string;
    program_id: string;
    week_num: number;
    day_num: number;
    name: string;
    created_at: string;
}

export interface TemplateExercise {
    id: string;
    template_id: string;
    exercise_id: string;
    order_index: number;
    sets_planned: number;
    reps_target: string; // e.g., "8-10" or "6"
    rpe_target: number | null; // e.g., 8.5
    percent_1rm_min: number | null; // e.g., 75.00
    percent_1rm_max: number | null; // e.g., 80.00
    notes: string | null;
    created_at: string;
}

export interface User1RM {
    id: string;
    user_id: string;
    exercise_id: string;
    weight_kg: number;
    updated_at: string;
}

export interface WorkoutLog {
    id: string;
    user_id: string;
    template_id: string | null;
    started_at: string;
    ended_at: string | null;
    created_at: string;
}

export interface SetLog {
    id: string;
    workout_log_id: string;
    exercise_id: string;
    set_num: number;
    weight_kg: number;
    reps_performed: number;
    rpe_actual: number | null;
    created_at: string;
}

/**
 * Extended types with relations for common queries
 */

export interface TemplateExerciseWithExercise extends TemplateExercise {
    exercise: Exercise;
}

export interface WorkoutTemplateWithExercises extends WorkoutTemplate {
    template_exercises: TemplateExerciseWithExercise[];
}

export interface SetLogWithExercise extends SetLog {
    exercise: Exercise;
}

export interface WorkoutLogWithSets extends WorkoutLog {
    set_logs: SetLogWithExercise[];
}
