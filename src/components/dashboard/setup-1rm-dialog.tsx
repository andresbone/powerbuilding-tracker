'use client';

import { useState, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

interface Setup1RMDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    exercises: Array<{ id: string; name: string }>;
    onComplete: () => void;
}

export function Setup1RMDialog({ open, onOpenChange, exercises, onComplete }: Setup1RMDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields are filled
        const missingFields = exercises.filter(ex => !formData[ex.id] || formData[ex.id] === '');
        if (missingFields.length > 0) {
            toast.error('Campos incompletos', {
                description: 'Por favor ingresa todos los pesos',
            });
            return;
        }

        startTransition(async () => {
            try {
                const response = await fetch('/api/1rms/setup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: exercises.map(ex => ({
                            exercise_id: ex.id,
                            weight_kg: parseFloat(formData[ex.id]),
                        })),
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save 1RMs');
                }

                toast.success('¡1RMs Guardados!', {
                    description: 'Ahora puedes comenzar tu entrenamiento',
                });

                onComplete();
            } catch (error) {
                toast.error('Error al guardar', {
                    description: 'Intenta nuevamente',
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Configura tus 1RMs</DialogTitle>
                    <DialogDescription>
                        Antes de comenzar, necesitamos saber tus máximos de una repetición para los ejercicios principales.
                    </DialogDescription>
                </DialogHeader>

                {/* Educational Callout */}
                <div className="bg-muted/50 border border-border rounded-lg p-4 flex gap-3">
                    <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="font-semibold text-sm">¿Por qué necesitamos esto?</p>
                        <p className="text-sm text-muted-foreground">
                            Martes utiliza estos números para calcular automáticamente tus cargas de trabajo (ej: el 80% de tu máximo).
                            Si no conoces tu 1RM exacto, ingresa un peso que puedas levantar para 3-5 repeticiones y nosotros haremos el resto.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={exercise.id} className="text-right col-span-2">
                                    {exercise.name}
                                </Label>
                                <div className="col-span-2 flex items-center gap-2">
                                    <Input
                                        id={exercise.id}
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        placeholder="0"
                                        value={formData[exercise.id] || ''}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            [exercise.id]: e.target.value
                                        }))}
                                        className="text-center font-bold"
                                        required
                                    />
                                    <span className="text-sm text-muted-foreground">kg</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? 'Guardando...' : 'Guardar y Comenzar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
