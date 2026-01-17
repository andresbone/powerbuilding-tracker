'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
            });

            if (error) {
                throw error;
            }

            setEmailSent(true);
            toast.success('Correo enviado', {
                description: 'Revisa tu bandeja de entrada para restablecer tu contraseña',
            });
        } catch (error: any) {
            console.error('Error sending reset email:', error);
            toast.error('Error al enviar correo', {
                description: error.message || 'Intenta nuevamente',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Recuperar Contraseña</CardTitle>
                    <CardDescription>
                        {emailSent
                            ? 'Te hemos enviado un correo con instrucciones'
                            : 'Ingresa tu email para recibir un enlace de recuperación'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {emailSent ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Revisa tu bandeja de entrada y haz clic en el enlace para restablecer tu contraseña.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="w-full">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                            </Button>
                            <Link href="/login">
                                <Button variant="ghost" className="w-full">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Login
                                </Button>
                            </Link>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
