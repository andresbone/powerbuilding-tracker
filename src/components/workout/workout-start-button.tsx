'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Setup1RMDialog } from '@/components/dashboard/setup-1rm-dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

interface WorkoutStartButtonProps {
    templateId: string;
    status: 'completed' | 'active' | 'locked';
    missingExercises: Array<{ id: string; name: string }>;
}

export function WorkoutStartButton({ templateId, status, missingExercises }: WorkoutStartButtonProps) {
    const router = useRouter();
    const [showSetupDialog, setShowSetupDialog] = useState(false);

    const handleSetupComplete = () => {
        setShowSetupDialog(false);
        // Navigate to workout after setup
        router.push(`/workout/${templateId}`);
        router.refresh(); // Refresh to get updated data
    };

    if (status === 'completed') {
        return (
            <>
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/workout/${templateId}`}>
                        Repetir Entrenamiento
                    </Link>
                </Button>
            </>
        );
    }

    if (status === 'active') {
        const handleClick = () => {
            // Check if user has missing 1RMs
            if (missingExercises.length > 0) {
                setShowSetupDialog(true);
            } else {
                // Navigate to workout if all 1RMs are set
                router.push(`/workout/${templateId}`);
            }
        };

        return (
            <>
                <Button
                    className="w-full"
                    onClick={handleClick}
                >
                    Comenzar Entrenamiento
                </Button>

                <Setup1RMDialog
                    open={showSetupDialog}
                    onOpenChange={setShowSetupDialog}
                    exercises={missingExercises}
                    onComplete={handleSetupComplete}
                />
            </>
        );
    }

    // Locked
    return (
        <Button className="w-full" disabled>
            <Lock className="h-4 w-4 mr-2" />
            Bloqueado
        </Button>
    );
}
