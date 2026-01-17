/**
 * Smart Coach - Intelligent Training Logic
 * 
 * Pure functions for autoregulation, performance tracking, and weight suggestions
 * based on RPE (Rate of Perceived Exertion) and training data.
 */

/**
 * Calculate estimated 1RM using the Epley formula
 * 
 * @param weight - Weight lifted in kg
 * @param reps - Number of repetitions performed
 * @returns Estimated 1RM in kg
 * 
 * @example
 * calculateE1RM(100, 5) // Returns ~115 kg
 */
export function calculateE1RM(weight: number, reps: number): number {
    if (reps === 1) return weight;
    if (weight <= 0 || reps <= 0) return 0;

    // Epley formula: 1RM = weight × (1 + reps / 30)
    const e1rm = weight * (1 + reps / 30);

    return Math.round(e1rm * 10) / 10; // Round to 1 decimal place
}

/**
 * Suggest next weight based on RPE feedback
 * 
 * Logic:
 * - If RPE was 2+ points below target: increase weight by 5%
 * - If RPE was 1+ points above target: decrease weight by 5%
 * - Otherwise: maintain current weight
 * 
 * @param lastWeight - Weight used in previous session (kg)
 * @param lastRpe - RPE from previous session (0-10 scale)
 * @param targetRpe - Target RPE for the exercise (typically 7-9)
 * @returns Suggested weight for next session in kg
 * 
 * @example
 * suggestNextWeight(100, 6, 8) // Returns 105 (RPE was too low, increase)
 * suggestNextWeight(100, 9.5, 8) // Returns 95 (RPE was too high, decrease)
 * suggestNextWeight(100, 8, 8) // Returns 100 (RPE on target, maintain)
 */
export function suggestNextWeight(
    lastWeight: number,
    lastRpe: number,
    targetRpe: number
): number {
    if (lastWeight <= 0) return lastWeight;

    const rpeDifference = lastRpe - targetRpe;

    // RPE was significantly below target - increase weight
    if (rpeDifference <= -2) {
        return Math.round(lastWeight * 1.05 * 10) / 10; // +5%
    }

    // RPE was above target - decrease weight
    if (rpeDifference >= 1) {
        return Math.round(lastWeight * 0.95 * 10) / 10; // -5%
    }

    // RPE was close to target - maintain weight
    return lastWeight;
}

/**
 * Calculate daily performance (RPE-adjusted estimated 1RM)
 * 
 * This estimates your "1RM for the day" by adjusting the calculated E1RM
 * based on how hard the set felt (RPE). A lower RPE means you had more
 * in the tank, suggesting a higher potential 1RM.
 * 
 * @param weight - Weight lifted in kg
 * @param reps - Number of repetitions performed
 * @param rpe - Rate of Perceived Exertion (0-10 scale)
 * @returns Estimated daily 1RM in kg
 * 
 * @example
 * getDailyPerformance(100, 5, 8) // Returns ~117 kg (felt moderate)
 * getDailyPerformance(100, 5, 9.5) // Returns ~115 kg (felt very hard)
 * getDailyPerformance(100, 5, 6) // Returns ~120 kg (felt easy)
 */
export function getDailyPerformance(
    weight: number,
    reps: number,
    rpe: number
): number {
    if (weight <= 0 || reps <= 0) return 0;

    // First calculate base E1RM
    const baseE1RM = calculateE1RM(weight, reps);

    // Adjust based on RPE
    // Lower RPE = more in the tank = higher potential 1RM
    // RPE 10 = 0% adjustment, RPE 0 = +10% adjustment
    const rpeAdjustment = (10 - rpe) / 100;
    const dailyE1RM = baseE1RM * (1 + rpeAdjustment);

    return Math.round(dailyE1RM * 10) / 10; // Round to 1 decimal place
}

/**
 * Get RPE-based feedback message
 * 
 * @param rpe - Rate of Perceived Exertion (0-10 scale)
 * @returns Human-readable feedback string
 */
export function getRpeFeedback(rpe: number): string {
    if (rpe >= 9.5) return "Maximum effort - consider deload";
    if (rpe >= 9) return "Very hard - near failure";
    if (rpe >= 8) return "Hard - good training stimulus";
    if (rpe >= 7) return "Moderate - sustainable effort";
    if (rpe >= 6) return "Light - room for more";
    return "Very light - increase intensity";
}

/**
 * Calculate volume load for a set
 * 
 * @param weight - Weight lifted in kg
 * @param reps - Number of repetitions performed
 * @returns Volume load (weight × reps)
 */
export function calculateVolumeLoad(weight: number, reps: number): number {
    return weight * reps;
}
