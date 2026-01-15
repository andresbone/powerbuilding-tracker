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
        },
        {
      weekNum: 6,
      days: [
        {
          dayNum: 1,
          name: "Week 6 - Lower #1 (Semi-Deload)",
          exercises: [
            { name: "Deadlift", sets: 3, reps: "4", percentMin: 80, notes: "Brace your lats. Pull slack out of bar." },
            { name: "Sumo Box Squat", sets: 2, reps: "8", rpe: 5, notes: "Or Pause High-Bar Squat. Light RPE." },
            { name: "Cable Pull-Through", sets: 2, reps: "12-15", rpe: 7, notes: "Use your glutes to move the weight." },
            { name: "Leg Curl", sets: 3, reps: "6-8", rpe: 7, notes: "Lying Leg Curl or Nordic Ham Curl." },
            { name: "Standing Calf Raise", sets: 2, reps: "8-10", rpe: 8, notes: "1-2 sec pause at bottom." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 6 - Upper #1 (Semi-Deload)",
          exercises: [
            { name: "Barbell Bench Press", sets: 2, reps: "7", percentMin: 77.5, notes: "Slight pause on chest. Explode up." },
            { name: "Chin-Up", sets: 2, reps: "8-10", rpe: 6, notes: "Underhand grip. Add weight if needed." },
            { name: "Standing Arnold Dumbbell Press", sets: 2, reps: "10-12", rpe: 6, notes: "Rotate DBs." },
            { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "12-15", rpe: 6, notes: "Pull with lats." },
            { name: "Face Pull", sets: 2, reps: "15-20", rpe: 8, notes: "Retract shoulder blades." },
            { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 8, notes: "Arc out." },
            { name: "Concentration Bicep Curl", sets: 3, reps: "12-15", rpe: 8, notes: "Pin elbow against leg." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 6 - Lower #2 (Semi-Deload)",
          exercises: [
            { name: "Back Squat", sets: 1, reps: "1", percentMin: 90, percentMax: 95, rpe: 9, notes: "ONLY HEAVY SET THIS WEEK! Perfect technique." },
            { name: "Back Squat", sets: 2, reps: "7", percentMin: 75, notes: "Low-bar back-off sets." },
            { name: "Leg Extension", sets: 3, reps: "12-15", rpe: 8, notes: "Mind-muscle connection." },
            { name: "Standing Calf Raise", sets: 3, reps: "15-20", rpe: 8, notes: "Emphasize connection." },
            { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 8, notes: "Banded walk or machine." },
            { name: "V Sit-Up", sets: 3, reps: "12-15", rpe: 8, notes: "Squeeze abs." }
          ]
        },
        {
          dayNum: 4,
          name: "Week 6 - Upper #2 (Semi-Deload)",
          exercises: [
            { name: "Overhead Press", sets: 3, reps: "4", percentMin: 82.5, notes: "Squeeze glutes." },
            { name: "Single-Arm Lat Pulldown", sets: 2, reps: "10-12", rpe: 7, notes: "Drive elbows down." },
            { name: "Deficit Push-Up", sets: 2, reps: "AMRAP", rpe: 10, notes: "Use handles or DBs for deficit." },
            { name: "Pendlay Row", sets: 2, reps: "10", rpe: 7, notes: "Minimize cheating." },
            { name: "Pec Flye", sets: 2, reps: "15-20", rpe: 7, notes: "Cable, band or DB." },
            { name: "Incline Shrug", sets: 2, reps: "15-20", rpe: 7, notes: "A1. Full ROM." },
            { name: "Upright Row", sets: 2, reps: "15-20", rpe: 7, notes: "A2. Stop at shoulder height." },
            { name: "Barbell Skull Crusher", sets: 2, reps: "8-10", rpe: 7, notes: "Constant tension." }
          ]
        },
        {
          dayNum: 5,
          name: "Week 6 - Lower #3 (Semi-Deload)",
          exercises: [
            { name: "Block Pull", sets: 2, reps: "4", rpe: 6, notes: "From 3 inch block." },
            { name: "Bulgarian Split Squat", sets: 2, reps: "12", rpe: 6, notes: "Constant tension." },
            { name: "Barbell Hyperextension", sets: 2, reps: "8-10", rpe: 6, notes: "Or Hip Thrust." },
            { name: "Seated Calf Raise", sets: 3, reps: "15-20", rpe: 8, notes: "Standing if no machine." },
            { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 8, notes: "Control reps." },
            { name: "Neck Flexion/Extension", sets: 3, reps: "12/12", rpe: 8, notes: "Optional." }
          ]
        },
        {
          dayNum: 6,
          name: "Week 6 - Upper #3 (Semi-Deload)",
          exercises: [
            { name: "Flat-Back Barbell Bench Press", sets: 3, reps: "10", rpe: 7, notes: "Minimize leg drive." },
            { name: "Neutral Grip Pull-Up", sets: 2, reps: "10", rpe: 7, notes: "Consistent tempo." },
            { name: "Weighted Dip", sets: 2, reps: "10", rpe: 7, notes: "Or floor press." },
            { name: "Single-Arm Row", sets: 2, reps: "10-12", rpe: 7, notes: "Feel lats." },
            { name: "Barbell Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Mind-muscle connection." },
            { name: "Lean-Away Lateral Raise", sets: 2, reps: "30", rpe: 9, notes: "Constant tension." },
            { name: "Bicycle Crunch", sets: 2, reps: "10-12", rpe: 8, notes: "Hands behind ears." }
          ]
        }
      ]
    },

    // ==========================================
    // WEEK 7
    // ==========================================
    {
      weekNum: 7,
      days: [
        {
          dayNum: 1,
          name: "Week 7 - Full Body 1 (Squat, OHP)",
          exercises: [
            { name: "Back Squat", sets: 1, reps: "3", percentMin: 85, percentMax: 90, rpe: 8.5, notes: "Top Set. Try to add weight from Week 5." },
            { name: "Back Squat", sets: 2, reps: "2", percentMin: 85, notes: "Back-off sets. Focus on driving back into bar." },
            { name: "Overhead Press", sets: 4, reps: "8", percentMin: 70, notes: "Reset each rep." },
            { name: "Glute Ham Raise", sets: 2, reps: "8-10", rpe: 8, notes: "Keep hips straight." },
            { name: "Helms Row", sets: 2, reps: "12-15", rpe: 9, notes: "Strict form." },
            { name: "Hammer Curl", sets: 3, reps: "20-25", rpe: 10, notes: "Squeeze hard." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 7 - Full Body 2 (Deadlift, Bench)",
          exercises: [
            { name: "Pause Deadlift", sets: 4, reps: "2", percentMin: 75, notes: "3 sec pause right after plates come off ground." },
            { name: "Barbell Bench Press", sets: 1, reps: "3", percentMin: 85, percentMax: 90, rpe: 9, notes: "Top Set. Aim for near 3 rep PR." },
            { name: "Barbell Bench Press", sets: 2, reps: "4", percentMin: 80, notes: "Explosive force." },
            { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "1 sec hold." },
            { name: "Weighted Pull-Up", sets: 3, reps: "3-5", rpe: 7, notes: "Heavy but clean." },
            { name: "Standing Calf Raise", sets: 3, reps: "8", rpe: 9, notes: "Full ROM." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 7 - Full Body 3 (Squat, Dip)",
          exercises: [
            { name: "Back Squat", sets: 4, reps: "6", percentMin: 77.5, notes: "Maintain tight pressure." },
            { name: "Weighted Dip", sets: 3, reps: "8", rpe: 8, notes: "Or Floor Press." },
            { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 9, notes: "Controlled." },
            { name: "Lat Pull-Over", sets: 3, reps: "12-15", rpe: 9, notes: "Stretch lats." },
            { name: "Incline Dumbbell Curl", sets: 2, reps: "12-15", rpe: 9, notes: "Start with weak arm." },
            { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9, notes: "Retract blades." }
          ]
        },
        {
          dayNum: 4,
          name: "Week 7 - Full Body 4 (Deadlift, Bench)",
          exercises: [
            { name: "Deadlift", sets: 1, reps: "3", percentMin: 85, percentMax: 90, rpe: 8.5, notes: "Work up to heavy triple." },
            { name: "Pause Barbell Bench Press", sets: 4, reps: "6", percentMin: 75, notes: "2-3 sec pause." },
            { name: "Chest-Supported T-Bar Row", sets: 3, reps: "10", rpe: 7, notes: "Or Pendlay." },
            { name: "Nordic Ham Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Or Leg Curl." },
            { name: "Dumbbell Shrug", sets: 3, reps: "20-25", rpe: 9, notes: "Squeeze at top." }
          ]
        },
        {
          dayNum: 5,
          name: "Week 7 - Full Body 5 (Arm & Pump)",
          exercises: [
            { name: "Barbell Curl", sets: 3, reps: "12", rpe: 8, notes: "A1." },
            { name: "Floor Skull Crusher", sets: 3, reps: "12", rpe: 8, notes: "A2." },
            { name: "Incline Dumbbell Curl (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B1." },
            { name: "Triceps Pressdown (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B2." },
            { name: "Dumbbell Lateral Raise", sets: 3, reps: "20", rpe: 9, notes: "C1." },
            { name: "Band Pull-Apart", sets: 3, reps: "20", rpe: 9, notes: "C2." },
            { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 9, notes: "C3." },
            { name: "Bicycle Crunch", sets: 3, reps: "15", rpe: 9, notes: "C4." },
            { name: "Neck Flexion/Extension", sets: 3, reps: "15/15", rpe: 8, notes: "Optional." }
          ]
        }
      ]
    },

    // ==========================================
    // WEEK 8
    // ==========================================
    {
      weekNum: 8,
      days: [
        {
          dayNum: 1,
          name: "Week 8 - Lower #1",
          exercises: [
            { name: "Deadlift", sets: 3, reps: "5", percentMin: 80, notes: "Brace lats." },
            { name: "Sumo Box Squat", sets: 2, reps: "8", rpe: 7, notes: "Or Pause High-Bar." },
            { name: "Cable Pull-Through", sets: 3, reps: "12-15", rpe: 9, notes: "Use glutes." },
            { name: "Leg Curl", sets: 3, reps: "6-8", rpe: 9, notes: "Nordic or Machine." },
            { name: "Standing Calf Raise", sets: 3, reps: "8-10", rpe: 9, notes: "Pause at bottom." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 8 - Upper #1",
          exercises: [
            { name: "Barbell Bench Press", sets: 2, reps: "7", percentMin: 77.5, notes: "Comfortable arch." },
            { name: "Chin-Up", sets: 3, reps: "8-10", rpe: 8, notes: "Add weight if needed." },
            { name: "Standing Arnold Dumbbell Press", sets: 2, reps: "10-12", rpe: 9, notes: "Rotate DBs." },
            { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "12-15", rpe: 9, notes: "Pull with lats." },
            { name: "Face Pull", sets: 2, reps: "15-20", rpe: 10, notes: "Retract blades." },
            { name: "Dumbbell Lateral Raise", sets: 3, reps: "15-20", rpe: 10, notes: "Middle fibers." },
            { name: "Concentration Bicep Curl", sets: 3, reps: "12-15", rpe: 10, notes: "Pin elbow." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 8 - Lower #2",
          exercises: [
            { name: "Back Squat", sets: 3, reps: "7", percentMin: 75, notes: "Low-Bar. Tight back." },
            { name: "Good Morning", sets: 2, reps: "10-12", rpe: 7, notes: "Feel hamstrings." },
            { name: "Leg Extension", sets: 3, reps: "12-15", rpe: 9, notes: "Or bands." },
            { name: "Standing Calf Raise", sets: 3, reps: "15-20", rpe: 10, notes: "Emphasize connection." },
            { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 10, notes: "Banded walk or machine." },
            { name: "V Sit-Up", sets: 3, reps: "12-15", rpe: 10, notes: "Squeeze abs." }
          ]
        },
        {
          dayNum: 4,
          name: "Week 8 - Upper #2",
          exercises: [
            { name: "Overhead Press / Push Press", sets: 3, reps: "3/3", percentMin: 82.5, notes: "3 Strict, 3 Push Press." },
            { name: "Single-Arm Lat Pulldown", sets: 2, reps: "10-12", rpe: 9, notes: "Drive elbows down." },
            { name: "Dumbbell Incline Press", sets: 2, reps: "12", rpe: 8, notes: "45 degree incline." },
            { name: "Pendlay Row", sets: 2, reps: "10", rpe: 7, notes: "Minimize cheating." },
            { name: "Pec Flye", sets: 3, reps: "15-20", rpe: 10, notes: "Full ROM." },
            { name: "Incline Shrug", sets: 2, reps: "15-20", rpe: 10, notes: "A1." },
            { name: "Bent Over Reverse Flye", sets: 2, reps: "15-20", rpe: 10, notes: "A2. Rear delts." },
            { name: "Barbell Skull Crusher", sets: 2, reps: "8-10", rpe: 10, notes: "Constant tension." }
          ]
        },
        {
          dayNum: 5,
          name: "Week 8 - Lower #3",
          exercises: [
            { name: "Block Pull", sets: 2, reps: "4", rpe: 8, notes: "2 inch block." },
            { name: "Bulgarian Split Squat", sets: 2, reps: "12", rpe: 7, notes: "Constant tension." },
            { name: "Barbell Hyperextension", sets: 2, reps: "8-10", rpe: 7, notes: "Or Hip Thrust." },
            { name: "Seated Calf Raise", sets: 3, reps: "15-20", rpe: 9, notes: "Standing if no machine." },
            { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 8, notes: "Controlled." },
            { name: "Neck Flexion/Extension", sets: 3, reps: "12/12", rpe: 8, notes: "Optional." }
          ]
        },
        {
          dayNum: 6,
          name: "Week 8 - Upper #3",
          exercises: [
            { name: "Flat-Back Barbell Bench Press", sets: 3, reps: "10", rpe: 7, notes: "Minimize leg drive." },
            { name: "Eccentric-Accentuated Pull-Up", sets: 2, reps: "AMRAP", rpe: 10, notes: "3 sec negative." },
            { name: "Weighted Dip", sets: 2, reps: "10", rpe: 8, notes: "Or floor press." },
            { name: "Single-Arm Row", sets: 2, reps: "10-12", rpe: 9, notes: "Feel lats." },
            { name: "Barbell Curl", sets: 3, reps: "12-15", rpe: 9, notes: "Mind-muscle." },
            { name: "Lean-Away Lateral Raise", sets: 2, reps: "30", rpe: 10, notes: "Constant tension." },
            { name: "Bicycle Crunch", sets: 2, reps: "10-12", rpe: 9, notes: "Hands behind ears." }
          ]
        }
      ]
    },

    // ==========================================
    // WEEK 9
    // ==========================================
    {
      weekNum: 9,
      days: [
        {
          dayNum: 1,
          name: "Week 9 - Full Body 1 (Squat, OHP)",
          exercises: [
            { name: "Back Squat", sets: 1, reps: "2", percentMin: 87.5, percentMax: 92.5, rpe: 8.5, notes: "Top Set. Aim for near 2 rep PR." },
            { name: "Squat Walk-Out", sets: 1, reps: "10-sec", percentMin: 100, notes: "DO NOT SQUAT. Just hold and walk back in. Feel the heavy weight." },
            { name: "Overhead Press", sets: 3, reps: "6", percentMin: 80, notes: "Reset each rep." },
            { name: "Glute Ham Raise", sets: 2, reps: "8-10", rpe: 7, notes: "Keep hips straight." },
            { name: "Helms Row", sets: 2, reps: "12-15", rpe: 9, notes: "Strict." },
            { name: "Hammer Curl", sets: 3, reps: "20-25", rpe: 10, notes: "Squeeze." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 9 - Full Body 2 (Deadlift, Bench)",
          exercises: [
            { name: "Deadlift", sets: 3, reps: "4", percentMin: 80, notes: "Semi-deload. Focus on speed." },
            { name: "Barbell Bench Press", sets: 1, reps: "2", percentMin: 87.5, percentMax: 92.5, rpe: 9, notes: "Top Set. Aim for near 2 rep PR." },
            { name: "Barbell Bench Press", sets: 2, reps: "2", percentMin: 87.5, notes: "Explosive force." },
            { name: "Hip Abduction", sets: 3, reps: "15-20", rpe: 9, notes: "1 sec hold." },
            { name: "Weighted Pull-Up", sets: 3, reps: "3-5", rpe: 7, notes: "1.5x shoulder width." },
            { name: "Standing Calf Raise", sets: 3, reps: "8", rpe: 9, notes: "Full ROM." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 9 - Full Body 3 (Squat, Dip)",
          exercises: [
            { name: "Back Squat", sets: 3, reps: "4", percentMin: 82.5, notes: "Maintain tight pressure." },
            { name: "Weighted Dip", sets: 3, reps: "8", rpe: 8, notes: "Or Floor Press." },
            { name: "Hanging Leg Raise", sets: 3, reps: "10-12", rpe: 9, notes: "Controlled." },
            { name: "Lat Pull-Over", sets: 3, reps: "12-15", rpe: 9, notes: "Stretch lats." },
            { name: "Incline Dumbbell Curl", sets: 2, reps: "12-15", rpe: 9, notes: "Start with weak arm." },
            { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9, notes: "Retract." }
          ]
        },
        {
          dayNum: 4,
          name: "Week 9 - Full Body 4 (Deadlift, Bench)",
          exercises: [
            { name: "Pause Deadlift", sets: 4, reps: "2", percentMin: 75, notes: "3 sec pause off ground." },
            { name: "Pause Barbell Bench Press", sets: 3, reps: "5", percentMin: 77.5, notes: "2-3 sec pause." },
            { name: "Chest-Supported T-Bar Row", sets: 3, reps: "10", rpe: 7, notes: "Or Pendlay." },
            { name: "Nordic Ham Curl", sets: 3, reps: "6-8", rpe: 8, notes: "Or Leg Curl." },
            { name: "Dumbbell Shrug", sets: 3, reps: "20-25", rpe: 9, notes: "Squeeze." }
          ]
        },
        {
          dayNum: 5,
          name: "Week 9 - Full Body 5 (Arm & Pump)",
          exercises: [
            { name: "Barbell Curl", sets: 3, reps: "12", rpe: 8, notes: "A1." },
            { name: "Floor Skull Crusher", sets: 3, reps: "10", rpe: 8, notes: "A2." },
            { name: "Incline Dumbbell Curl (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B1." },
            { name: "Triceps Pressdown (Reverse 21s)", sets: 3, reps: "21", rpe: 10, notes: "B2." },
            { name: "Dumbbell Lateral Raise", sets: 3, reps: "20", rpe: 9, notes: "C1." },
            { name: "Band Pull-Apart", sets: 3, reps: "20", rpe: 9, notes: "C2." },
            { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 9, notes: "C3." },
            { name: "Bicycle Crunch", sets: 3, reps: "15", rpe: 9, notes: "C4." },
            { name: "Neck Flexion/Extension", sets: 3, reps: "15/15", rpe: 8, notes: "Optional." }
          ]
        }
      ]
    },

    // ==========================================
    // WEEK 10 - OPTION A (AMRAP TESTING)
    // ==========================================
    {
      weekNum: 10,
      days: [
        {
          dayNum: 1,
          name: "Week 10A - Squat Test (AMRAP)",
          exercises: [
            { name: "Back Squat", sets: 1, reps: "AMRAP", percentMin: 90, rpe: 9.5, notes: "As Many Reps As Possible. Aim to hit 3+ reps. Use a spotter!" },
            { name: "Single-Arm Lat Pulldown", sets: 2, reps: "12", rpe: 8, notes: "Drive elbows down." },
            { name: "Incline Dumbbell Curl", sets: 4, reps: "12", rpe: 8, notes: "Mind-muscle connection." },
            { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 8, notes: "Pause at bottom." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 10A - Bench Test (AMRAP)",
          exercises: [
            { name: "Barbell Bench Press", sets: 1, reps: "AMRAP", percentMin: 90, rpe: 9.5, notes: "As Many Reps As Possible. Aim to hit 3+ reps. Use a spotter!" },
            { name: "Leg Curl", sets: 3, reps: "8-10", rpe: 8, notes: "Lying or Nordic." },
            { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 8, notes: "Arc out." },
            { name: "Triceps Pressdown", sets: 3, reps: "12", rpe: 8, notes: "Squeeze." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 10A - Deadlift Test (AMRAP)",
          exercises: [
            { name: "Deadlift", sets: 1, reps: "AMRAP", percentMin: 90, rpe: 9.5, notes: "As Many Reps As Possible. Aim to hit 3+ reps. Use a spotter!" },
            { name: "Overhead Press", sets: 3, reps: "10", rpe: 6, notes: "Reset each rep." },
            { name: "Leg Extension", sets: 3, reps: "12", rpe: 7, notes: "Mind-muscle." },
            { name: "Bicycle Crunch", sets: 4, reps: "15", rpe: 8, notes: "Crunch hard." }
          ]
        },
        // ==========================================
        // WEEK 10 - OPTION B (1RM TESTING)
        // ==========================================
        {
          dayNum: 4,
          name: "Week 10B - Squat Test (1RM)",
          exercises: [
            { name: "Back Squat", sets: 1, reps: "1", percentMin: 100, percentMax: 105, rpe: 9.5, notes: "Aim for new PR! Start with 100%, increase 2.5% if easy." },
            { name: "Single-Arm Lat Pulldown", sets: 2, reps: "12", rpe: 8, notes: "Accessory work." },
            { name: "Incline Dumbbell Curl", sets: 4, reps: "12", rpe: 8, notes: "Accessory work." },
            { name: "Standing Calf Raise", sets: 3, reps: "12", rpe: 8, notes: "Accessory work." }
          ]
        },
        {
          dayNum: 5,
          name: "Week 10B - Bench Test (1RM)",
          exercises: [
            { name: "Barbell Bench Press", sets: 1, reps: "1", percentMin: 100, percentMax: 105, rpe: 9.5, notes: "Aim for new PR! Use a spotter." },
            { name: "Leg Curl", sets: 3, reps: "8-10", rpe: 8, notes: "Accessory work." },
            { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 8, notes: "Accessory work." },
            { name: "Triceps Pressdown", sets: 3, reps: "12", rpe: 8, notes: "Accessory work." }
          ]
        },
        {
          dayNum: 6,
          name: "Week 10B - Deadlift Test (1RM)",
          exercises: [
            { name: "Deadlift", sets: 1, reps: "1", percentMin: 100, percentMax: 105, rpe: 9.5, notes: "Aim for new PR! Form first." },
            { name: "Overhead Press", sets: 3, reps: "10", rpe: 6, notes: "Accessory work." },
            { name: "Leg Extension", sets: 3, reps: "12", rpe: 7, notes: "Accessory work." },
            { name: "Bicycle Crunch", sets: 4, reps: "15", rpe: 8, notes: "Accessory work." }
          ]
        }
      ]
    },

    // ==========================================
    // WEEK 11 (FULL DELOAD)
    // ==========================================
    {
      weekNum: 11,
      days: [
        {
          dayNum: 1,
          name: "Week 11 - Lower #1 (Deload)",
          exercises: [
            { name: "Deadlift", sets: 2, reps: "3", percentMin: 75, notes: "Light work. Recovery focus." },
            { name: "Sumo Box Squat", sets: 2, reps: "6", rpe: 5, notes: "Or Pause High-Bar." },
            { name: "Leg Curl", sets: 2, reps: "6-8", rpe: 6, notes: "Easy volume." },
            { name: "Standing Calf Raise", sets: 2, reps: "8-10", rpe: 6, notes: "Pause at bottom." },
            { name: "Hanging Leg Raise", sets: 2, reps: "10-12", rpe: 6, notes: "Controlled." }
          ]
        },
        {
          dayNum: 2,
          name: "Week 11 - Upper #1 (Deload)",
          exercises: [
            { name: "Barbell Bench Press", sets: 3, reps: "6", percentMin: 72.5, notes: "Comfortable arch." },
            { name: "Assisted Chin-Up", sets: 2, reps: "8-10", rpe: 7, notes: "Or regular chin-up." },
            { name: "Overhead Press", sets: 2, reps: "4", percentMin: 75, notes: "Strict press." },
            { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "12-15", rpe: 7, notes: "Pull with lats." },
            { name: "Face Pull", sets: 2, reps: "15-20", rpe: 8, notes: "Retract." },
            { name: "Dumbbell Lateral Raise", sets: 2, reps: "15-20", rpe: 8, notes: "Arc out." },
            { name: "Concentration Bicep Curl", sets: 2, reps: "12-15", rpe: 8, notes: "Squeeze." },
            { name: "Triceps Pressdown", sets: 2, reps: "12-15", rpe: 8, notes: "Squeeze." }
          ]
        },
        {
          dayNum: 3,
          name: "Week 11 - Lower #2 (Deload)",
          exercises: [
            { name: "Back Squat", sets: 2, reps: "6", percentMin: 70, notes: "Technique work." },
            { name: "Snatch-Grip Romanian Deadlift", sets: 2, reps: "8", rpe: 6, notes: "Wide grip. Feel hamstrings." },
            { name: "Leg Extension", sets: 2, reps: "12-15", rpe: 7, notes: "Light pump." },
            { name: "Standing Calf Raise", sets: 3, reps: "15-20", rpe: 8, notes: "Full ROM." },
            { name: "Banded Lateral Walk", sets: 3, reps: "15-20", rpe: 8, notes: "Glutes." },
            { name: "V Sit-Up", sets: 3, reps: "12-15", rpe: 8, notes: "Abs." },
            { name: "Neck Flexion/Extension", sets: 3, reps: "12/12", rpe: 8, notes: "Optional." }
          ]
        },
        {
          dayNum: 4,
          name: "Week 11 - Upper #2 (Deload)",
          exercises: [
            { name: "Close-Grip Bench Press", sets: 3, reps: "10", rpe: 6, notes: "Triceps focus." },
            { name: "Chest-Supported Dumbbell Row", sets: 2, reps: "10", rpe: 6, notes: "Lats." },
            { name: "Weighted Dip", sets: 3, reps: "6", rpe: 7, notes: "Chest/Triceps." },
            { name: "Single-Arm Lat Pulldown", sets: 2, reps: "10", rpe: 8, notes: "Unilateral work." },
            { name: "Incline Shrug", sets: 2, reps: "15-20", rpe: 8, notes: "Traps." },
            { name: "Upright Row", sets: 2, reps: "15-20", rpe: 8, notes: "Side delts." },
            { name: "Barbell Curl", sets: 3, reps: "12-15", rpe: 8, notes: "Biceps." },
            { name: "Skull Crusher", sets: 3, reps: "8-10", rpe: 8, notes: "Triceps." }
          ]
        }
      ]
    }
  ]
};