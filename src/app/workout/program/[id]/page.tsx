import { createServerClient } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { Check, Lock, Home } from 'lucide-react';
import { WorkoutStartButton } from '@/components/workout/workout-start-button';

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

interface WorkoutLog {
    id: string;
    template_id: string;
}

type TemplateStatus = 'completed' | 'active' | 'locked';

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

    // Fetch all workout logs for this user and program
    const { data: workoutLogs, error: logsError } = await supabase
        .from('workout_logs')
        .select('id, template_id')
        .eq('user_id', user.id)
        .in('template_id', (templates || []).map(t => t.id));

    if (logsError) {
        console.error('Error fetching workout logs:', logsError);
    }

    // Fetch main lifts exercises for 1RM check
    const mainLiftsNames = ["Back Squat", "Barbell Bench Press", "Deadlift", "Overhead Press"];
    const { data: mainLiftsExercises } = await supabase
        .from('exercises')
        .select('id, name')
        .in('name', mainLiftsNames);

    // Fetch user's 1RMs for main lifts
    const { data: user1RMs } = await supabase
        .from('user_1rms')
        .select('exercise_id')
        .eq('user_id', user.id)
        .in('exercise_id', (mainLiftsExercises || []).map(e => e.id));

    // Determine which main lifts are missing 1RMs
    const user1RMSet = new Set((user1RMs || []).map(rm => rm.exercise_id));
    const missingExercises = (mainLiftsExercises || [])
        .filter(ex => !user1RMSet.has(ex.id))
        .map(ex => ({ id: ex.id, name: ex.name }));

    // Create a set of completed template IDs
    const completedTemplateIds = new Set<string>(
        (workoutLogs || []).map((log: WorkoutLog) => log.template_id)
    );

    // Determine status for each template
    const templatesWithStatus = (templates || []).map((template: WorkoutTemplate, index: number) => {
        const isCompleted = completedTemplateIds.has(template.id);

        // Check if previous template is completed (for sequential unlock)
        const previousTemplate = index > 0 && templates ? templates[index - 1] : null;
        const isPreviousCompleted = previousTemplate
            ? completedTemplateIds.has(previousTemplate.id)
            : true; // First template is always unlocked

        let status: TemplateStatus;
        if (isCompleted) {
            status = 'completed';
        } else if (isPreviousCompleted) {
            status = 'active';
        } else {
            status = 'locked';
        }

        return {
            ...template,
            status,
        };
    });

    // Group templates by week
    const weekMap = new Map<number, Array<WorkoutTemplate & { status: TemplateStatus }>>();

    templatesWithStatus.forEach((template) => {
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
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/workout/start">
                            <Button variant="ghost">
                                ← Volver a Programas
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon">
                                <Home className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
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
                                            {weekTemplates.filter(t => t.status === 'completed').length}/{weekTemplates.length} completados
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4">
                                    <div className="space-y-3 pt-2">
                                        {weekTemplates.map((template) => (
                                            <Card
                                                key={template.id}
                                                className={`transition-all ${template.status === 'active'
                                                    ? 'border-primary shadow-sm'
                                                    : template.status === 'locked'
                                                        ? 'opacity-50'
                                                        : 'opacity-75'
                                                    }`}
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <CardTitle className="text-lg flex items-center gap-2">
                                                                {template.name}
                                                                {template.status === 'completed' && (
                                                                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                                                        <Check className="h-3 w-3 mr-1" />
                                                                        Completado
                                                                    </Badge>
                                                                )}
                                                                {template.status === 'locked' && (
                                                                    <Badge variant="secondary">
                                                                        <Lock className="h-3 w-3 mr-1" />
                                                                        Bloqueado
                                                                    </Badge>
                                                                )}
                                                            </CardTitle>
                                                            <CardDescription>
                                                                Día {template.day_num}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <WorkoutStartButton
                                                        templateId={template.id}
                                                        status={template.status}
                                                        missingExercises={missingExercises}
                                                    />
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
