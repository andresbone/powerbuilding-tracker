import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Program {
    id: string;
    name: string;
    author: string;
    created_at: string;
}

export default async function StartWorkoutPage() {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch available programs
    const { data: programs, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching programs:', error);
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            ← Volver al Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Seleccionar Programa
                    </h1>
                    <p className="text-muted-foreground">
                        Elige el programa de entrenamiento que deseas seguir
                    </p>
                </div>

                {!programs || programs.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <p className="text-muted-foreground">
                                    No hay programas disponibles.
                                </p>
                                <p className="text-sm">
                                    Ve al panel de administración para crear un programa.
                                </p>
                                <Button asChild>
                                    <Link href="/dashboard/admin">Ir a Admin</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {programs.map((program: Program) => (
                            <Card key={program.id} className="hover:border-primary transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        {program.name}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        Por {program.author}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full h-12">
                                        <Link href={`/workout/program/${program.id}`}>
                                            Ver Semanas y Rutinas
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
