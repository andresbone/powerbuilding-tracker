'use client';

import { useState, useEffect } from 'react';
import { Setup1RMDialog } from './setup-1rm-dialog';
import { useRouter } from 'next/navigation';

interface DashboardOnboardingProps {
    shouldShowOnboarding: boolean;
    missingExercises: Array<{ id: string; name: string }>;
}

export function DashboardOnboarding({ shouldShowOnboarding, missingExercises }: DashboardOnboardingProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(shouldShowOnboarding);

    const handleComplete = () => {
        setIsOpen(false);
        router.refresh(); // Refresh to update the data
    };

    // Prevent closing if it's part of onboarding
    const handleOpenChange = (open: boolean) => {
        // Only allow closing if user has completed setup
        if (!shouldShowOnboarding || !open) {
            setIsOpen(open);
        }
    };

    if (!shouldShowOnboarding) {
        return null;
    }

    return (
        <Setup1RMDialog
            open={isOpen}
            onOpenChange={handleOpenChange}
            exercises={missingExercises}
            onComplete={handleComplete}
        />
    );
}
