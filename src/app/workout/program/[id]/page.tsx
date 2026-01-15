import { createServerClient } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

interface WorkoutTemplate {
    id: string;
    week_num: number;
    day_num: number;
    name: string;
}

interface Program {
    id: string;
    name: string;
    author: string;
}

export default async function ProgramDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch program details
    const { data: program, error: programError } = await supabase
        .from('programs')
        .select('*')
        .eq('id', id)
        .single();

    if (programError || !program) {
        notFound();
    }

    // Fetch all templates for this program
    const { data: templates, error: templatesError } = await supabase
        .from('workout_templates')
        .select('*')
        .eq('program_id', id)
        .order('week_num', { ascending: true })
        .order('day_num', { ascending: true });

    if (templatesError) {
        console.error('Error fetching templates:', templatesError);
    }

    // Group templates by week
    const weekMap = new Map<number, WorkoutTemplate[]>();

    (templates || []).forEach((template: WorkoutTemplate) => {
        const existing = weekMap.get(template.week_num);
        if (existing) {
            existing.push(template);
        } else {
            weekMap.set(template.week_num, [template]);
        }
    });

    const weeks = Array.from(weekMap.entries()).sort((a, b) => a[0] - b[0]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="mb-6">
                    <Link href="/workout/start">
                        <Button variant="ghost" className="mb-4">
                            ← Volver a Programas
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {program.name}
                    </h1>
                    <p className="text-muted-foreground">
                        Por {program.author}
                    </p>
                </div>

                {weeks.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4 py-8">
                                <p className="text-lg text-muted-foreground">
                                    Este programa no tiene rutinas configuradas
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Ve al panel de administración para agregar rutinas.
                                </p>
                                <Button asChild>
                                    <Link href="/dashboard/admin">Ir a Admin</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Accordion type="single" collapsible className="space-y-4" defaultValue="week-1">
                        {weeks.map(([weekNum, weekTemplates]) => (
                            <AccordionItem
                                key={weekNum}
                                value={`week-${weekNum}`}
                                className="border rounded-lg px-6 bg-card"
                            >
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <h2 className="text-xl font-bold">
                                            Semana {weekNum}
                                        </h2>
                                        <span className="text-sm text-muted-foreground">
                                            {weekTemplates.length} {weekTemplates.length === 1 ? 'rutina' : 'rutinas'}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4">
                                    <div className="space-y-3 pt-2">
                                        {weekTemplates.map((template) => (
                                            <Card key={template.id} className="hover:border-primary transition-colors">
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-lg">
                                                        {template.name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Día {template.day_num}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button asChild className="w-full">
                                                        <Link href={`/workout/${template.id}`}>
                                                            Comenzar Entrenamiento
                                                        </Link>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}
