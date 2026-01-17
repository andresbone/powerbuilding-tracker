'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface WorkoutHeaderProps {
    hasUnsavedChanges: boolean;
}

export function WorkoutHeader({ hasUnsavedChanges }: WorkoutHeaderProps) {
    const router = useRouter();
    const [showExitDialog, setShowExitDialog] = useState(false);

    const handleExit = () => {
        if (hasUnsavedChanges) {
            setShowExitDialog(true);
        } else {
            router.push('/dashboard');
        }
    };

    const confirmExit = () => {
        router.push('/dashboard');
    };

    return (
        <>
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
                <div className="container mx-auto px-4 py-3 max-w-3xl">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleExit}
                            className="shrink-0"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Entrenamiento Activo</h2>
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Salir del entrenamiento?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tienes cambios sin guardar. Si sales ahora, perderás todo el progreso de este entrenamiento.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Continuar Entrenando</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Salir sin Guardar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
