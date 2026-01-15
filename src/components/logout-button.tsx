'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/auth';
import { toast } from 'sonner';

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    async function handleLogout() {
        startTransition(async () => {
            const result = await logout();

            if (result?.error) {
                toast.error('Logout Failed', {
                    description: result.error,
                });
            }
        });
    }

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            disabled={isPending}
        >
            {isPending ? 'Logging out...' : 'Logout'}
        </Button>
    );
}
