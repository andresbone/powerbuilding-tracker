import { useEffect, useRef } from 'react';

/**
 * Hook to detect clicks outside of a referenced element
 * 
 * @param handler - Callback function to execute when click outside is detected
 * @returns ref - Ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [handler]);

    return ref;
}
