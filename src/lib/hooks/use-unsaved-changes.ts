import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook to prevent navigation when there are unsaved changes
 * 
 * @param isDirty - Boolean indicating if there are unsaved changes
 * @param message - Optional custom message to display
 */
export function useUnsavedChanges(
    isDirty: boolean,
    message: string = '¿Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
) {
    const router = useRouter();

    // Handle browser refresh/close
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, message]);

    // Return a function to check before navigation
    const confirmNavigation = useCallback(() => {
        if (isDirty) {
            return window.confirm(message);
        }
        return true;
    }, [isDirty, message]);

    return { confirmNavigation };
}
