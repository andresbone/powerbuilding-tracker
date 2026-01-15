'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { finishWorkout } from '@/app/actions/workout';
import type { TemplateExerciseWithExercise, User1RM } from '@/lib/supabase/types';

interface WorkoutSessionProps {
    templateExercises: TemplateExerciseWithExercise[];
    user1RMs: User1RM[];
    templateName: string;
    templateId: string;
}

interface SetData {
    setNum: number;
    weight: string;
    reps: string;
    rpe: string;
    completed: boolean;
}

export function WorkoutSession({ templateExercises, user1RMs, templateName, templateId }: WorkoutSessionProps) {
    const [isPending, startTransition] = useTransition();
    const [startedAt] = useState(new Date().toISOString());

    // Create a map of exercise_id -> 1RM for quick lookup
    const oneRMMap = new Map<string, number>();
    user1RMs.forEach((rm) => {
        oneRMMap.set(rm.exercise_id, rm.weight_kg);
    });

    // Initialize sets state for all exercises
    const [exerciseSets, setExerciseSets] = useState<Map<string, SetData[]>>(() => {
        const initialSets = new Map<string, SetData[]>();

        templateExercises.forEach((te) => {
            const sets: SetData[] = [];
            const user1RM = oneRMMap.get(te.exercise_id);

            // Calculate suggested weight if % 1RM is defined
            let suggestedWeight = '';
            if (te.percent_1rm_min && user1RM) {
                const minWeight = (user1RM * te.percent_1rm_min) / 100;
                suggestedWeight = minWeight.toFixed(1);
            }

            for (let i = 1; i <= te.sets_planned; i++) {
                sets.push({
                    setNum: i,
                    weight: suggestedWeight,
                    reps: '',
                    rpe: te.rpe_target?.toString() || '',
                    completed: false,
                });
            }

            initialSets.set(te.id, sets);
        });

        return initialSets;
    });

    const updateSet = (exerciseId: string, setIndex: number, field: keyof SetData, value: string | boolean) => {
        setExerciseSets((prev) => {
            const newMap = new Map(prev);
            const sets = [...(newMap.get(exerciseId) || [])];
            sets[setIndex] = { ...sets[setIndex], [field]: value };
            newMap.set(exerciseId, sets);
            return newMap;
        });
    };

    const calculateWeightRange = (te: TemplateExerciseWithExercise) => {
        const user1RM = oneRMMap.get(te.exercise_id);

        if (!user1RM || !te.percent_1rm_min) {
            return null;
        }

        const minWeight = (user1RM * te.percent_1rm_min) / 100;
        const maxWeight = te.percent_1rm_max
            ? (user1RM * te.percent_1rm_max) / 100
            : minWeight;

        return {
            min: minWeight.toFixed(1),
            max: maxWeight.toFixed(1),
            percentMin: te.percent_1rm_min,
            percentMax: te.percent_1rm_max || te.percent_1rm_min,
        };
    };

    const handleFinishWorkout = async () => {
        startTransition(async () => {
            // Prepare data for server action
            const exercises = templateExercises.map((te) => {
                const sets = exerciseSets.get(te.id) || [];
                return {
                    exerciseId: te.exercise_id,
                    sets: sets.map((set) => ({
                        exerciseId: te.exercise_id,
                        setNum: set.setNum,
                        weight: set.weight,
                        reps: set.reps,
                        rpe: set.rpe,
                        completed: set.completed,
                    })),
                };
            });

            const result = await finishWorkout(templateId, startedAt, exercises);

            if (result?.error) {
                toast.error('Error al Guardar', {
                    description: result.error,
                });
            } else {
                toast.success('¡Entrenamiento Completado!', {
                    description: 'Tu progreso ha sido guardado exitosamente.',
                });
                // Redirect will happen from server action
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4 border-b">
                <h2 className="text-2xl font-bold">{templateName}</h2>
                <p className="text-sm text-muted-foreground">
                    {templateExercises.length} ejercicios
                </p>
            </div>

            {templateExercises.map((te, exerciseIndex) => {
                const sets = exerciseSets.get(te.id) || [];
                const weightRange = calculateWeightRange(te);

                return (
                    <Card key={te.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-xl">
                                        {exerciseIndex + 1}. {te.exercise.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1 space-y-1">
                                        <div>
                                            {te.sets_planned} series × {te.reps_target} reps
                                            {te.rpe_target && ` @ RPE ${te.rpe_target}`}
                                        </div>
                                        {weightRange && (
                                            <div className="font-medium text-foreground">
                                                Meta: {weightRange.percentMin}
                                                {weightRange.percentMax !== weightRange.percentMin && `-${weightRange.percentMax}`}
                                                % ({weightRange.min}
                                                {weightRange.min !== weightRange.max && `-${weightRange.max}`} kg)
                                            </div>
                                        )}
                                        {te.notes && (
                                            <div className="text-xs italic">
                                                {te.notes}
                                            </div>
                                        )}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {sets.map((set, setIndex) => (
                                    <div
                                        key={setIndex}
                                        className={`grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 items-center p-3 rounded-lg border ${set.completed ? 'bg-muted/50 border-primary' : 'bg-background'
                                            }`}
                                    >
                                        <div className="text-sm font-medium text-muted-foreground w-8">
                                            {set.setNum}
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor={`weight-${te.id}-${setIndex}`} className="text-xs">
                                                Kg
                                            </Label>
                                            <Input
                                                id={`weight-${te.id}-${setIndex}`}
                                                type="number"
                                                inputMode="decimal"
                                                step="0.5"
                                                value={set.weight}
                                                onChange={(e) => updateSet(te.id, setIndex, 'weight', e.target.value)}
                                                className="h-10 text-center font-bold"
                                                disabled={set.completed}
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor={`reps-${te.id}-${setIndex}`} className="text-xs">
                                                Reps
                                            </Label>
                                            <Input
                                                id={`reps-${te.id}-${setIndex}`}
                                                type="number"
                                                inputMode="numeric"
                                                value={set.reps}
                                                onChange={(e) => updateSet(te.id, setIndex, 'reps', e.target.value)}
                                                className="h-10 text-center font-bold"
                                                disabled={set.completed}
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor={`rpe-${te.id}-${setIndex}`} className="text-xs">
                                                RPE
                                            </Label>
                                            <Input
                                                id={`rpe-${te.id}-${setIndex}`}
                                                type="number"
                                                inputMode="decimal"
                                                step="0.5"
                                                min="0"
                                                max="10"
                                                value={set.rpe}
                                                onChange={(e) => updateSet(te.id, setIndex, 'rpe', e.target.value)}
                                                className="h-10 text-center font-bold"
                                                disabled={set.completed}
                                            />
                                        </div>

                                        <Checkbox
                                            checked={set.completed}
                                            onCheckedChange={(checked) =>
                                                updateSet(te.id, setIndex, 'completed', checked as boolean)
                                            }
                                            className="h-6 w-6"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

            <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-6 border-t">
                <Button
                    className="w-full h-14 text-lg"
                    size="lg"
                    onClick={handleFinishWorkout}
                    disabled={isPending}
                >
                    {isPending ? 'Guardando...' : 'Finalizar Entrenamiento'}
                </Button>
            </div>
        </div>
    );
}
