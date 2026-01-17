'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { login, signup } from '@/app/actions/auth';

export default function LoginPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    async function handleLogin(formData: FormData) {
        startTransition(async () => {
            const result = await login(formData);

            if (result?.error) {
                toast.error('Login Failed', {
                    description: result.error,
                });
            } else {
                toast.success('Welcome back!', {
                    description: 'You have successfully logged in.',
                });
            }
        });
    }

    async function handleSignup(formData: FormData) {
        startTransition(async () => {
            const result = await signup(formData);

            if (result?.error) {
                toast.error('Signup Failed', {
                    description: result.error,
                });
            } else {
                toast.success('Account Created!', {
                    description: 'You have successfully signed up.',
                });
            }
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Martes</CardTitle>
                    <CardDescription>
                        Your intelligent training companion
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form action={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input
                                        id="login-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        disabled={isPending}
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        disabled={isPending}
                                        autoComplete="current-password"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    {isPending ? 'Logging in...' : 'Login'}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form action={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        disabled={isPending}
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        disabled={isPending}
                                        autoComplete="new-password"
                                        minLength={6}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Password must be at least 6 characters
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    {isPending ? 'Creating account...' : 'Sign Up'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
