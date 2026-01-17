'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Info } from 'lucide-react';
import { format } from 'date-fns';

interface VolumeDataPoint {
    date: string; // ISO date string
    total: number; // volume in kg
}

interface VolumeChartProps {
    data: VolumeDataPoint[];
}

type ViewMode = 'daily' | 'weekly';

export function VolumeChart({ data }: VolumeChartProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('weekly');

    // Custom tooltip component
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const tons = (value / 1000).toFixed(2);
            return (
                <div className="bg-background border border-border rounded-lg shadow-lg p-3">
                    <p className="font-semibold">{payload[0].payload.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {value.toLocaleString()} kg ({tons} ton)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Aggregate data based on view mode
    const aggregatedData = React.useMemo(() => {
        if (!data || data.length === 0) return [];

        if (viewMode === 'daily') {
            // Group by day
            return data.map(point => ({
                name: format(new Date(point.date), 'MMM dd'),
                total: point.total
            }));
        } else {
            // Group by week
            const weeklyMap = new Map<string, number>();

            data.forEach(point => {
                const date = new Date(point.date);
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
                const weekKey = format(weekStart, 'MMM dd');

                const current = weeklyMap.get(weekKey) || 0;
                weeklyMap.set(weekKey, current + point.total);
            });

            return Array.from(weeklyMap.entries()).map(([week, total]) => ({
                name: week,
                total: Math.round(total)
            }));
        }
    }, [data, viewMode]);

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Training Volume</CardTitle>
                            <CardDescription>Carga total levantada</CardDescription>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="text-muted-foreground hover:text-foreground">
                                    <Info className="h-4 w-4" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <p className="text-sm">
                                    <strong>Tonelaje total levantado</strong> (Series × Reps × Peso). Útil para medir tu capacidad de trabajo.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                            No hay datos de entrenamiento aún. ¡Completa tu primer workout para ver tu progreso!
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Training Volume</CardTitle>
                        <CardDescription>Carga total levantada</CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground">
                                <Info className="h-4 w-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <p className="text-sm">
                                <strong>Tonelaje total levantado</strong> (Series × Reps × Peso). Útil para medir tu capacidad de trabajo.
                            </p>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* View Mode Tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="mt-4">
                    <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                        <TabsTrigger value="daily">Diario</TabsTrigger>
                        <TabsTrigger value="weekly">Semanal</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aggregatedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="name"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(1)}t`}
                        />
                        <ChartTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
                        <Bar
                            dataKey="total"
                            fill="hsl(var(--foreground))"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
