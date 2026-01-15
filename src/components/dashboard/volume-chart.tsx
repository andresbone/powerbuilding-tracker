'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface VolumeData {
    name: string; // e.g., "Semana 1"
    total: number; // volume in kg
}

interface VolumeChartProps {
    data: VolumeData[];
}

export function VolumeChart({ data }: VolumeChartProps) {
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

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Training Volume</CardTitle>
                    <CardDescription>Carga total por semana</CardDescription>
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
                <CardTitle>Training Volume</CardTitle>
                <CardDescription>Carga total por semana</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
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
