'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { seedFullProgram, clearProgramData } from '@/app/actions/seed-program';

export function SeedControls() {
    const [isPending, startTransition] = useTransition();
    const [lastResult, setLastResult] = useState<string>('');

    async function handleSeed() {
        startTransition(async () => {
            const result = await seedFullProgram();

            if (result?.error) {
                toast.error('Seeding Failed', {
                    description: result.error,
                });
                setLastResult(`Error: ${result.error}`);
            } else if (result?.details) {
                const details = result.details;
                const message = `Created ${details.templatesCreated} templates, skipped ${details.templatesSkipped}`;

                toast.success('Seeding Complete!', {
                    description: message,
                });
                setLastResult(JSON.stringify(details, null, 2));
            } else {
                toast.success('Program Seeded!', {
                    description: result?.message,
                });
                setLastResult(result?.message || '');
            }
        });
    }

    async function handleClear() {
        if (!confirm('¿Estás seguro? Esto eliminará TODOS los programas y templates.')) {
            return;
        }

        startTransition(async () => {
            const result = await clearProgramData();

            if (result?.error) {
                toast.error('Clear Failed', {
                    description: result.error,
                });
            } else {
                toast.success('Data Cleared', {
                    description: result?.message,
                });
                setLastResult('');
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Database Seeding</CardTitle>
                <CardDescription>
                    Populate the database with the complete Powerbuilding Program
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-3">
                    <Button
                        onClick={handleSeed}
                        disabled={isPending}
                        className="flex-1"
                    >
                        {isPending ? 'Seeding...' : 'Seed Full Program'}
                    </Button>
                    <Button
                        onClick={handleClear}
                        disabled={isPending}
                        variant="destructive"
                        className="flex-1"
                    >
                        Clear All Programs
                    </Button>
                </div>

                {lastResult && (
                    <div className="mt-4 p-4 bg-muted rounded-md">
                        <p className="text-sm font-mono whitespace-pre-wrap">
                            {lastResult}
                        </p>
                    </div>
                )}

                <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>What this creates:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Program: "Powerbuilding System 1.0"</li>
                        <li>All weeks and workout templates</li>
                        <li>All exercises with sets, reps, and % 1RM</li>
                    </ul>
                    <p className="mt-3">
                        <strong>Note:</strong> This is idempotent - safe to run multiple times.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
