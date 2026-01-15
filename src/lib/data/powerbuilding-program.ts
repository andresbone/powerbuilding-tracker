/**
 * Powerbuilding Program Data
 * Complete program structure for Jeff Nippard's Powerbuilding System
 */

export interface ExerciseData {
    name: string;
    sets: number;
    reps: string; // e.g., "8-10" or "5"
    percentMin?: number; // e.g., 75 for 75% (optional)
    percentMax?: number; // e.g., 80 for 80% (optional)
    rpe?: number; // e.g., 7.5 (optional)
    notes?: string; // Training notes (optional)
}

export interface DayData {
    dayNum: number;
    name: string;
    exercises: ExerciseData[];
}

export interface WeekData {
    weekNum: number;
    days: DayData[];
}

export interface ProgramData {
    name: string;
    author: string;
    weeks: WeekData[];
}

/**
 * Full Powerbuilding Program Data
 */
export const FULL_PROGRAM: ProgramData = {
    name: "Powerbuilding System 1.0",
    author: "Jeff Nippard",
    weeks: [
        // ==========================================
        // WEEK 1
        // ==========================================
        {
            weekNum: 1,
            days: [
                {
                    dayNum: 1,
                    name: "Week 1 - Full Body 1 (Squat, OHP)",
                    exercises: [
                        { name: "Back Squat", sets: 1, reps: "5", rpe: 7.5, percentMin: 75, percentMax: 80, notes: "Top Set. Focus on technique and explosive power!" },
                        { name: "Back Squat", sets: 2, reps: "8", percentMin: 70, notes: "Back-off sets. Keep back angle consistent." },
                        { name: "Overhead Press", sets: 3, reps: "8", percentMin: 70, notes: "Reset each rep (don't touch-and-press)" },
                        { name: "Glute Ham Raise", sets: 3, reps: "8-10", rpe: 7, notes: "Keep hips straight. Do Nordic Ham Curls if no GHR machine." },
                        { name: "Helms Row", sets: 3, reps: "12-15", rpe: 9, notes: "Strict form. Drive elbows out and back at 45 degree angle." },
                        { name: "Hammer Curl", sets: 3, reps: "20-25", rpe: 10, notes: "Keep elbows locked in place, squeeze the dumbbell handle hard!" }
                    ]
                },
                {
                    dayNum: 2,
                    name: "Week 1 - Full Body 2 (Deadlift, Bench)",
                    exercises: [
                        { name: "Deadlift", sets: 3, reps: "4", percentMin: 80, notes: "Conventional or Sumo. Use whatever stance you are stronger with." },
                        { name: "Barbell Bench Press", sets: 1, reps: "3", rpe: 8.5, percentMin: 82.5, percentMax: 87.5, notes: "Top Set. Leave 1 (maybe 2) reps in the tank. Hard set." },
                        { name: "Barbell Bench Press", sets: 2, reps: "10", percentMin: 67.5, notes: "Quick 1 second pause on the chest on each rep." },
                        { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "Machine, band or weighted. 1 second isometric hold at top." },
                        { name: "Weighted Pull-Up", sets: 3, reps: "5-8", rpe: 8, notes: "1.5x shoulder width grip. Pull your chest to the bar." },
                        { name: "Standing Calf Raise", sets: 3, reps: "8-10", rpe: 9, notes: "1-2 second pause at the bottom of each rep. Full ROM." }
                    ]
                },
                {
                    dayNum: 3,
                    name: "Week 1 - Full Body 3 (Squat, Dip)",
                    exercises: [
                        { name: "Back Squat", sets: 3, reps: "4", percentMin: 80, notes: "Maintain tight pressure in your upper back against the bar." },
                        { name: "Weighted Dip", sets: 3, reps: "8", rpe: 8, notes: "Do Dumbbell Floor Press if no access to dip handles." },
                        { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 9, notes: "Knees to chest, controlled reps. Straighten legs to increase difficulty." },
                        { name: "Lat Pull-Over", sets: 3, reps: "12-15", rpe: 8, notes: "Can use DB, cable/rope or band. Stretch and squeeze lats!" },
                        { name: "Incline Dumbbell Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Do each arm one at a time. Start with your weak arm." },
                        { name: "Face Pull", sets: 4, reps: "15-20", rpe: 9, notes: "Retract your shoulder blades as you pull." }
                    ]
                },
                {
                    dayNum: 4,
                    name: "Week 1 - Full Body 4 (Deadlift, Bench)",
                    exercises: [
                        { name: "Pause Deadlift", sets: 4, reps: "2", percentMin: 75, notes: "3 second pause right after the plates come off the ground." },
                        { name: "Pause Barbell Bench Press", sets: 3, reps: "5", percentMin: 75, notes: "2-3 second pause on the chest." },
                        { name: "Chest-Supported T-Bar Row", sets: 3, reps: "10", rpe: 7, notes: "Or Pendlay Row. Be mindful of lower back fatigue." },
                        { name: "Nordic Ham Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Can sub for Lying Leg Curl." },
                        { name: "Dumbbell Shrug", sets: 3, reps: "20-25", rpe: 9, notes: "Feel a stretch on the traps at the bottom, squeeze hard at the top." }
                    ]
                },
                {
                    dayNum: 5,
                    name: "Week 1 - Full Body 5 (Arm & Pump Day)",
                    exercises: [
                        { name: "Barbell Curl", sets: 3, reps: "12", rpe: 8, notes: "A1. Curl the bar out and up in an arc. Minimize momentum." },
                        { name: "Floor Skull Crusher", sets: 3, reps: "12", rpe: 8, notes: "A2. Arc the bar back behind your head, soft touch on the floor." },
                        { name: "Incline Dumbbell Curl (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B1. 7 full rom, 7 top half, 7 bottom half." },
                        { name: "Triceps Pressdown (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B2. 7 full rom, 7 bottom half, 7 top half." },
                        { name: "Dumbbell Lateral Raise", sets: 3, reps: "20", rpe: 9, notes: "C1. Arc the dumbbell out. Mind-muscle connection." },
                        { name: "Band Pull-Apart", sets: 3, reps: "20", rpe: 9, notes: "C2. Mind-muscle connection with rear delts." },
                        { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 9, notes: "C3. 1-2 second pause at bottom, full squeeze at top." },
                        { name: "Bicycle Crunch", sets: 3, reps: "15", rpe: 9, notes: "C4. Focus on rounding your back as you crunch hard!" }
                    ]
                }
            ]
        },

        // ==========================================
        // WEEK 2
        // ==========================================
        {
            weekNum: 2,
            days: [
                {
                    dayNum: 1,
                    name: "Week 2 - Lower #1",
                    exercises: [
                        { name: "Deadlift", sets: 3, reps: "3", percentMin: 80, notes: "Brace your lats, chest tall, pull slack out of bar." },
                        { name: "Sumo Box Squat", sets: 2, reps: "8", rpe: 7, notes: "Or Pause High-Bar Squat (2 sec pause)." },
                        { name: "Cable Pull-Through", sets: 3, reps: "12-15", rpe: 9, notes: "Use your glutes to move the weight." },
                        { name: "Leg Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Lying Leg Curl or Nordic Ham Curl." },
                        { name: "Standing Calf Raise", sets: 3, reps: "8-10", rpe: 9, notes: "1-2 sec pause at bottom, full squeeze." }
                    ]
                },
                {
                    dayNum: 2,
                    name: "Week 2 - Upper #1",
                    exercises: [
                        { name: "Barbell Bench Press", sets: 1, reps: "2", rpe: 8, percentMin: 85, percentMax: 90, notes: "Top Set. Leave ~2 reps in tank. Hard set." },
                        { name: "Barbell Bench Press", sets: 3, reps: "6", percentMin: 77.5, notes: "Back-off sets." },
                        { name: "Chin-Up", sets: 3, reps: "8-10", rpe: 8, notes: "Underhand grip. Add weight if needed to hit RPE." },
                        { name: "Arnold Dumbbell Press", sets: 2, reps: "10-12", rpe: 9, notes: "Rotate DBs in at bottom and out at top." },
                        { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "12-15", rpe: 9, notes: "Lie on incline bench and do rows." },
                        { name: "Face Pull", sets: 2, reps: "15-20", rpe: 9, notes: "Retract shoulder blades." },
                        { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 10, notes: "Arc dumbbell out." },
                        { name: "Concentration Bicep Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Pin elbow against leg." }
                    ]
                },
                {
                    dayNum: 3,
                    name: "Week 2 - Lower #2",
                    exercises: [
                        { name: "Back Squat", sets: 3, reps: "6", percentMin: 75, notes: "Sit back and down. Keep upper back tight." },
                        { name: "Good Morning", sets: 2, reps: "10-12", rpe: 7, notes: "Same as squat stance. Feel hamstrings." },
                        { name: "Leg Extension", sets: 3, reps: "12-15", rpe: 9, notes: "Use bands if no machine." },
                        { name: "Standing Calf Raise", sets: 3, reps: "15-20", rpe: 9, notes: "Emphasize mind-muscle connection." },
                        { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "Banded lateral walk or machine." },
                        { name: "V Sit-Up", sets: 3, reps: "12-15", rpe: 9, notes: "Squeeze upper and lower abs together." }
                    ]
                },
                {
                    dayNum: 4,
                    name: "Week 2 - Upper #2",
                    exercises: [
                        { name: "Overhead Press", sets: 3, reps: "4", percentMin: 80, notes: "Squeeze glutes to keep torso upright." },
                        { name: "Single-Arm Lat Pulldown", sets: 2, reps: "10-12", rpe: 9, notes: "Drive elbows down and in." },
                        { name: "Close-Grip Bench Press", sets: 2, reps: "12", rpe: 7, notes: "Shoulder width grip. Tuck elbows." },
                        { name: "Pendlay Row", sets: 2, reps: "10", rpe: 7, notes: "Stay light, minimize cheating." },
                        { name: "Pec Flye", sets: 2, reps: "15-20", rpe: 9, notes: "Cable, bands or dumbbells." },
                        { name: "Incline Shrug", sets: 2, reps: "15-20", rpe: 9, notes: "A1. Face down against incline bench." },
                        { name: "Upright Row", sets: 2, reps: "15-20", rpe: 9, notes: "A2. Stop ROM once elbows reach shoulder height." },
                        { name: "Barbell Skull Crusher", sets: 2, reps: "8-10", rpe: 8, notes: "Constant tension on triceps." }
                    ]
                },
                {
                    dayNum: 5,
                    name: "Week 2 - Lower #3",
                    exercises: [
                        { name: "Block Pull", sets: 2, reps: "4", rpe: 8, notes: "From 5 inch block (stack 45lb + 10lb plate)." },
                        { name: "Bulgarian Split Squat", sets: 2, reps: "12", rpe: 7, notes: "Keep torso upright." },
                        { name: "Barbell Hyperextension", sets: 2, reps: "8-10", rpe: 7, notes: "Or Hip Thrust." },
                        { name: "Seated Calf Raise", sets: 3, reps: "15-20", rpe: 9, notes: "Do standing if no machine." },
                        { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 8, notes: "Knees to chest, controlled reps." },
                        { name: "Neck Flexion/Extension", sets: 3, reps: "12", rpe: 8, notes: "Optional." }
                    ]
                },
                {
                    dayNum: 6,
                    name: "Week 2 - Upper #3",
                    exercises: [
                        { name: "Flat-Back Barbell Bench Press", sets: 3, reps: "10", rpe: 7, notes: "Slight arch in upper back. Minimize leg drive." },
                        { name: "Eccentric-Accentuated Pull-Up", sets: 2, reps: "AMRAP", rpe: 10, notes: "3 second negative on every rep." },
                        { name: "Weighted Dip", sets: 2, reps: "10", rpe: 8, notes: "Dumbbell floor press if no access to dip handles." },
                        { name: "Single-Arm Row", sets: 2, reps: "10-12", rpe: 9, notes: "Feel your lats working!" },
                        { name: "Barbell Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Focus on mind-muscle connection." },
                        { name: "Lean-Away Lateral Raise", sets: 2, reps: "30", rpe: 10, notes: "Light dumbbell, constant tension." },
                        { name: "Bicycle Crunch", sets: 2, reps: "10-12", rpe: 9, notes: "Keep hands behind ears." }
                    ]
                }
            ]
        },

        // ==========================================
        // WEEK 3
        // ==========================================
        {
            weekNum: 3,
            days: [
                {
                    dayNum: 1,
                    name: "Week 3 - Full Body 1 (Squat, OHP)",
                    exercises: [
                        { name: "Back Squat", sets: 1, reps: "8", rpe: 8.5, percentMin: 72.5, percentMax: 77.5, notes: "Top Set. Leave 1-2 reps in tank. Push it!" },
                        { name: "Back Squat", sets: 2, reps: "6", percentMin: 75, notes: "Back-off sets." },
                        { name: "Overhead Press", sets: 3, reps: "8", percentMin: 72.5, notes: "Reset each rep." },
                        { name: "Glute Ham Raise", sets: 2, reps: "8-10", rpe: 7, notes: "Nordic Ham Curl if no machine." },
                        { name: "Helms Row", sets: 3, reps: "12-15", rpe: 9, notes: "Strict form." },
                        { name: "Hammer Curl", sets: 3, reps: "20-25", rpe: 10, notes: "Squeeze DB handle hard." }
                    ]
                },
                {
                    dayNum: 2,
                    name: "Week 3 - Full Body 2 (Deadlift, Bench)",
                    exercises: [
                        { name: "Deadlift", sets: 4, reps: "2", percentMin: 85, notes: "Conventional or Sumo." },
                        { name: "Barbell Bench Press", sets: 1, reps: "6", rpe: 8.5, percentMin: 75, percentMax: 80, notes: "Top Set. Push it!" },
                        { name: "Barbell Bench Press", sets: 2, reps: "8", percentMin: 72.5, notes: "Back-off sets." },
                        { name: "Hip Abduction", sets: 2, reps: "15-20", rpe: 9, notes: "1 sec isometric hold." },
                        { name: "Weighted Pull-Up", sets: 3, reps: "5-8", rpe: 8, notes: "1.5x shoulder width grip." },
                        { name: "Standing Calf Raise", sets: 3, reps: "8", rpe: 9, notes: "Full ROM." }
                    ]
                },
                {
                    dayNum: 3,
                    name: "Week 3 - Full Body 3 (Squat, Dip)",
                    exercises: [
                        { name: "Back Squat", sets: 4, reps: "4", percentMin: 80, notes: "Maintain tight pressure." },
                        { name: "Weighted Dip", sets: 3, reps: "8", rpe: 8, notes: "Or DB Floor Press." },
                        { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 9, notes: "Control the reps." },
                        { name: "Lat Pull-Over", sets: 3, reps: "12-15", rpe: 8, notes: "Stretch and squeeze lats." },
                        { name: "Incline Dumbbell Curl", sets: 2, reps: "12-15", rpe: 9, notes: "One arm at a time." },
                        { name: "Face Pull", sets: 4, reps: "15-20", rpe: 9, notes: "Retract shoulder blades." }
                    ]
                },
                {
                    dayNum: 4,
                    name: "Week 3 - Full Body 4 (Deadlift, Bench)",
                    exercises: [
                        { name: "Pause Deadlift", sets: 4, reps: "2", percentMin: 77.5, notes: "3 sec pause off floor." },
                        { name: "Pause Barbell Bench Press", sets: 4, reps: "5", percentMin: 75, notes: "2-3 sec pause on chest." },
                        { name: "Chest-Supported T-Bar Row", sets: 3, reps: "10", rpe: 7, notes: "Or Pendlay Row." },
                        { name: "Nordic Ham Curl", sets: 2, reps: "6-8", rpe: 8, notes: "Sub for Lying Leg Curl." },
                        { name: "Dumbbell Shrug", sets: 3, reps: "20-25", rpe: 9, notes: "Squeeze hard at top." }
                    ]
                },
                {
                    dayNum: 5,
                    name: "Week 3 - Full Body 5 (Arm & Pump Day)",
                    exercises: [
                        { name: "Barbell Curl", sets: 3, reps: "12", rpe: 8, notes: "A1. Minimize momentum." },
                        { name: "Floor Skull Crusher", sets: 3, reps: "12", rpe: 8, notes: "A2. Soft touch on floor." },
                        { name: "Incline Dumbbell Curl (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B1. 7 full, 7 top, 7 bottom." },
                        { name: "Triceps Pressdown (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B2. 7 full, 7 bottom, 7 top." },
                        { name: "Dumbbell Lateral Raise", sets: 3, reps: "20", rpe: 9, notes: "C1. Mind-muscle connection." },
                        { name: "Band Pull-Apart", sets: 3, reps: "20", rpe: 9, notes: "C2." },
                        { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 9, notes: "C3." },
                        { name: "Bicycle Crunch", sets: 3, reps: "15", rpe: 9, notes: "C4." }
                    ]
                }
            ]
        },

        // ==========================================
        // WEEK 4
        // ==========================================
        {
            weekNum: 4,
            days: [
                {
                    dayNum: 1,
                    name: "Week 4 - Lower #1",
                    exercises: [
                        { name: "Deadlift", sets: 1, reps: "2", rpe: 9, percentMin: 87.5, percentMax: 92.5, notes: "Top Set! Aim for near PR." },
                        { name: "Deadlift", sets: 3, reps: "3", percentMin: 80, notes: "Back-off sets." },
                        { name: "Sumo Box Squat", sets: 2, reps: "8", rpe: 7, notes: "Or Pause High-Bar Squat." },
                        { name: "Cable Pull-Through", sets: 3, reps: "12-15", rpe: 9, notes: "Use glutes." },
                        { name: "Leg Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Machine or Nordic." },
                        { name: "Standing Calf Raise", sets: 3, reps: "8-10", rpe: 9, notes: "1-2 sec pause at bottom." }
                    ]
                },
                {
                    dayNum: 2,
                    name: "Week 4 - Upper #1",
                    exercises: [
                        { name: "Barbell Bench Press", sets: 3, reps: "6", percentMin: 77.5, notes: "Set up comfortable arch." },
                        { name: "Chin-Up", sets: 3, reps: "8-10", rpe: 8, notes: "Underhand grip." },
                        { name: "Arnold Dumbbell Press", sets: 2, reps: "10-12", rpe: 9, notes: "Rotate DBs." },
                        { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "12-15", rpe: 9, notes: "Pull with lats." },
                        { name: "Face Pull", sets: 2, reps: "15-20", rpe: 9, notes: "Retract shoulder blades." },
                        { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 10, notes: "Arc out." },
                        { name: "Concentration Bicep Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Pin elbow against leg." }
                    ]
                },
                {
                    dayNum: 3,
                    name: "Week 4 - Lower #2",
                    exercises: [
                        { name: "Back Squat", sets: 3, reps: "6", percentMin: 75, notes: "Sit back and down." },
                        { name: "Good Morning", sets: 2, reps: "10-12", rpe: 7, notes: "Feel hamstrings." },
                        { name: "Leg Extension", sets: 3, reps: "12-15", rpe: 9, notes: "Or use bands." },
                        { name: "Standing Calf Raise", sets: 3, reps: "15-20", rpe: 9, notes: "Emphasize connection." },
                        { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "Banded walk or machine." },
                        { name: "V Sit-Up", sets: 3, reps: "12-15", rpe: 9, notes: "Squeeze abs." }
                    ]
                },
                {
                    dayNum: 4,
                    name: "Week 4 - Upper #2",
                    exercises: [
                        { name: "Overhead Press / Push Press", sets: 3, reps: "3/3", percentMin: 80, notes: "First 3 reps Strict (no leg drive), last 3 Push Press (use leg drive)." },
                        { name: "Single-Arm Lat Pulldown", sets: 2, reps: "10-12", rpe: 9, notes: "Drive elbows down and in." },
                        { name: "Barbell Floor Press", sets: 2, reps: "12", rpe: 7, notes: "Control eccentric. Explosive up." },
                        { name: "Pendlay Row", sets: 2, reps: "10", rpe: 7, notes: "Minimize cheating." },
                        { name: "Pec Flye", sets: 2, reps: "15-20", rpe: 9, notes: "Full ROM." },
                        { name: "Incline Shrug", sets: 2, reps: "15-20", rpe: 9, notes: "A1. Full ROM squeeze." },
                        { name: "Bent Over Reverse Flye", sets: 2, reps: "15-20", rpe: 9, notes: "A2. Rear delts." },
                        { name: "Barbell Skull Crusher", sets: 2, reps: "8-10", rpe: 8, notes: "Constant tension." }
                    ]
                },
                {
                    dayNum: 5,
                    name: "Week 4 - Lower #3",
                    exercises: [
                        { name: "Block Pull", sets: 2, reps: "4", rpe: 8, notes: "From 4 inch block." },
                        { name: "Bulgarian Split Squat", sets: 2, reps: "12", rpe: 7, notes: "Torso upright." },
                        { name: "Barbell Hyperextension", sets: 2, reps: "8-10", rpe: 7, notes: "Or Hip Thrust." },
                        { name: "Seated Calf Raise", sets: 3, reps: "15-20", rpe: 9, notes: "Or standing." },
                        { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 8, notes: "Control reps." },
                        { name: "Neck Flexion/Extension", sets: 3, reps: "12", rpe: 8, notes: "Optional." }
                    ]
                },
                {
                    dayNum: 6,
                    name: "Week 4 - Upper #3",
                    exercises: [
                        { name: "Flat-Back Barbell Bench Press", sets: 3, reps: "10", rpe: 7, notes: "Minimize leg drive." },
                        { name: "Eccentric-Accentuated Pull-Up", sets: 2, reps: "AMRAP", rpe: 10, notes: "3 sec negative." },
                        { name: "Weighted Dip", sets: 2, reps: "10", rpe: 8, notes: "Or floor press." },
                        { name: "Single-Arm Row", sets: 2, reps: "10-12", rpe: 9, notes: "Feel lats." },
                        { name: "Barbell Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Mind-muscle connection." },
                        { name: "Lean-Away Lateral Raise", sets: 2, reps: "30", rpe: 10, notes: "No pause at bottom." },
                        { name: "Bicycle Crunch", sets: 2, reps: "10-12", rpe: 9, notes: "Hands behind ears." }
                    ]
                }
            ]
        },

        // ==========================================
        // WEEK 5
        // ==========================================
        {
            weekNum: 5,
            days: [
                {
                    dayNum: 1,
                    name: "Week 5 - Full Body 1 (Squat, OHP)",
                    exercises: [
                        { name: "Back Squat", sets: 1, reps: "3", rpe: 8.5, percentMin: 82.5, percentMax: 87.5, notes: "Top Set. Leave 1-2 reps in tank. Aim for near 3 rep PR." },
                        { name: "Back Squat", sets: 2, reps: "4", percentMin: 80, notes: "Keep form consistent." },
                        { name: "Overhead Press", sets: 3, reps: "8", percentMin: 75, notes: "Reset each rep." },
                        { name: "Glute Ham Raise", sets: 2, reps: "8-10", rpe: 8, notes: "Keep hips straight." },
                        { name: "Helms Row", sets: 3, reps: "12-15", rpe: 9, notes: "Strict form." },
                        { name: "Hammer Curl", sets: 3, reps: "20-25", rpe: 10, notes: "Squeeze handle hard." }
                    ]
                },
                {
                    dayNum: 2,
                    name: "Week 5 - Full Body 2 (Deadlift, Bench)",
                    exercises: [
                        { name: "Deadlift", sets: 3, reps: "3", percentMin: 85, notes: "Pull slack out of bar." },
                        { name: "Barbell Bench Press", sets: 1, reps: "4", rpe: 9, percentMin: 82.5, percentMax: 87.5, notes: "Top Set. Leave 1 rep in tank." },
                        { name: "Barbell Bench Press", sets: 2, reps: "6", percentMin: 80, notes: "1 sec pause on chest." },
                        { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "1 sec isometric hold." },
                        { name: "Weighted Pull-Up", sets: 3, reps: "5-8", rpe: 8, notes: "1.5x shoulder width." },
                        { name: "Standing Calf Raise", sets: 3, reps: "8", rpe: 9, notes: "1-2 sec pause at bottom." }
                    ]
                },
                {
                    dayNum: 3,
                    name: "Week 5 - Full Body 3 (Squat, Dip)",
                    exercises: [
                        { name: "Back Squat", sets: 3, reps: "6", percentMin: 77.5, notes: "Tight upper back." },
                        { name: "Weighted Dip", sets: 3, reps: "8", rpe: 8, notes: "Or DB floor press." },
                        { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 9, notes: "Control reps." },
                        { name: "Lat Pull-Over", sets: 3, reps: "12-15", rpe: 9, notes: "Squeeze lats." },
                        { name: "Incline Dumbbell Curl", sets: 2, reps: "12-15", rpe: 9, notes: "Start with weak arm." },
                        { name: "Face Pull", sets: 4, reps: "15-20", rpe: 9, notes: "Retract blades." }
                    ]
                },
                {
                    dayNum: 4,
                    name: "Week 5 - Full Body 4 (Deadlift, Bench)",
                    exercises: [
                        { name: "Pause Deadlift", sets: 4, reps: "2", percentMin: 82.5, notes: "3 sec pause off floor." },
                        { name: "Pause Barbell Bench Press", sets: 3, reps: "6", percentMin: 75, notes: "2-3 sec pause on chest." },
                        { name: "Chest-Supported T-Bar Row", sets: 3, reps: "10", rpe: 7, notes: "Be mindful of lower back." },
                        { name: "Nordic Ham Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Sub for leg curl." },
                        { name: "Dumbbell Shrug", sets: 3, reps: "20-25", rpe: 10, notes: "Squeeze hard at top." }
                    ]
                },
                {
                    dayNum: 5,
                    name: "Week 5 - Full Body 5 (Arm & Pump Day)",
                    exercises: [
                        { name: "Barbell Curl", sets: 3, reps: "12", rpe: 8, notes: "A1. Arc up." },
                        { name: "Floor Skull Crusher", sets: 3, reps: "12", rpe: 8, notes: "A2. Soft touch." },
                        { name: "Incline Dumbbell Curl (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B1. 7-7-7." },
                        { name: "Triceps Pressdown (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B2. 7-7-7." },
                        { name: "Dumbbell Lateral Raise", sets: 3, reps: "20", rpe: 9, notes: "C1. Mind-muscle." },
                        { name: "Band Pull-Apart", sets: 3, reps: "20", rpe: 9, notes: "C2." },
                        { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 9, notes: "C3." },
                        { name: "Bicycle Crunch", sets: 3, reps: "15", rpe: 9, notes: "C4." }
                    ]
                }
            ]
        }
    ]
};