'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success('Sesión cerrada');
            router.push('/login');
            router.refresh();
        } catch (error) {
            toast.error('Error al cerrar sesión');
            console.error('Logout error:', error);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
        >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Salir</span>
        </Button>
    );
}
