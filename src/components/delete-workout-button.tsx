'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteWorkout } from '@/app/actions/workout';
import { toast } from 'sonner';

interface DeleteWorkoutButtonProps {
    workoutId: string;
    workoutName: string;
}

export function DeleteWorkoutButton({ workoutId, workoutName }: DeleteWorkoutButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        // Simple confirmation dialog
        const confirmed = window.confirm(
            `¿Estás seguro de que quieres eliminar "${workoutName}"?\n\nEsta acción no se puede deshacer.`
        );

        if (!confirmed) {
            return;
        }

        startTransition(async () => {
            const result = await deleteWorkout(workoutId);

            if (result.error) {
                toast.error('Error', {
                    description: result.error,
                });
            } else {
                toast.success('Entrenamiento eliminado', {
                    description: 'El workout ha sido eliminado exitosamente.',
                });
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isPending}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
