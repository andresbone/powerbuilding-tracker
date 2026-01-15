import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeedControls } from '@/components/seed-controls';
import Link from 'next/link';

export default async function AdminPage() {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Get current database stats
    const { count: programCount } = await supabase
        .from('programs')
        .select('*', { count: 'exact', head: true });

    const { count: templateCount } = await supabase
        .from('workout_templates')
        .select('*', { count: 'exact', head: true });

    const { count: exerciseCount } = await supabase
        .from('exercises')
        .select('*', { count: 'exact', head: true });

    const { count: user1RMCount } = await supabase
        .from('user_1rms')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            ← Volver al Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-muted-foreground">
                        Database management and seeding tools
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Database Stats</CardTitle>
                            <CardDescription>Current data in the system</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Programs:</span>
                                <span className="font-bold">{programCount || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Templates:</span>
                                <span className="font-bold">{templateCount || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Exercises:</span>
                                <span className="font-bold">{exerciseCount || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Your 1RMs:</span>
                                <span className="font-bold">{user1RMCount || 0}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                            <CardDescription>Navigate to key features</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/dashboard/1rms">Manage 1RMs</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/workout/start">Start Workout</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/history">View History</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <SeedControls />
            </div>
        </div>
    );
}
