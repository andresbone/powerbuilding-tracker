'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { update1RM } from '@/app/actions/1rms';
import type { Exercise, User1RM } from '@/lib/supabase/types';

interface ExerciseCardProps {
    exercise: Exercise;
    current1RM?: User1RM;
}

export function ExerciseCard({ exercise, current1RM }: ExerciseCardProps) {
    const [isPending, startTransition] = useTransition();
    const [weight, setWeight] = useState(current1RM?.weight_kg?.toString() || '');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const weightNum = parseFloat(weight);

        if (!weightNum || weightNum <= 0) {
            toast.error('Invalid Weight', {
                description: 'Please enter a positive number',
            });
            return;
        }

        startTransition(async () => {
            const result = await update1RM(exercise.id, weightNum);

            if (result?.error) {
                toast.error('Failed to Update', {
                    description: result.error,
                });
            } else {
                toast.success(`${exercise.name} Updated`, {
                    description: `1RM set to ${weightNum} kg`,
                });
            }
        });
    }

    const lastUpdated = current1RM?.updated_at
        ? new Date(current1RM.updated_at).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        })
        : null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
                {lastUpdated && (
                    <CardDescription>
                        Último registro: {lastUpdated}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`weight-${exercise.id}`} className="text-base">
                            1RM (kg)
                        </Label>
                        <Input
                            id={`weight-${exercise.id}`}
                            type="number"
                            inputMode="decimal"
                            step="0.5"
                            min="0"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="0.0"
                            disabled={isPending}
                            className="text-2xl h-14 text-center font-bold"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-base"
                        disabled={isPending || !weight}
                    >
                        {isPending ? 'Guardando...' : 'Guardar'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
