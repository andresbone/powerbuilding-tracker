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
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Setup1RMDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    exercises: Array<{ id: string; name: string }>;
    onComplete: () => void;
}

export function Setup1RMDialog({ open, onOpenChange, exercises, onComplete }: Setup1RMDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const supabase = createClient();
    const router = useRouter();

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
                // Get user ID
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError || !user) {
                    throw new Error('No user found');
                }

                // Prepare upsert data with validation
                const upsertData = exercises.map(ex => {
                    const weight = parseFloat(formData[ex.id]);
                    if (isNaN(weight) || weight <= 0) {
                        throw new Error(`Invalid weight for ${ex.name}`);
                    }
                    return {
                        user_id: user.id,
                        exercise_id: ex.id,
                        weight_kg: weight,
                    };
                });

                console.log('Upserting data:', upsertData);

                // Upsert 1RMs directly
                const { data, error } = await supabase
                    .from('user_1rms')
                    .upsert(upsertData, {
                        onConflict: 'user_id,exercise_id',
                    })
                    .select();

                if (error) {
                    console.error('Supabase error:', error);
                    throw error;
                }

                console.log('Successfully saved:', data);

                toast.success('¡1RMs Guardados!', {
                    description: 'Ahora puedes comenzar tu entrenamiento',
                });

                // Refresh the page to update data
                router.refresh();

                // Call onComplete callback
                onComplete();
            } catch (error: any) {
                console.error('Error saving 1RMs:', error);
                toast.error('Error al guardar', {
                    description: error.message || 'Intenta nuevamente',
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
