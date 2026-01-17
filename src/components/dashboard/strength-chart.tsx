'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Info } from 'lucide-react';

interface StrengthDataPoint {
    date: string;
    historical: number | null;
    daily: number | null;
}

interface StrengthChartProps {
    data: StrengthDataPoint[];
}

export function StrengthChart({ data }: StrengthChartProps) {
    // Custom tooltip component
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-border rounded-lg shadow-lg p-3">
                    <p className="font-semibold text-sm mb-1">{payload[0].payload.date}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value ? `${entry.value} kg` : 'N/A'}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Strength Progression</CardTitle>
                            <CardDescription>1RM histórico vs estimado diario</CardDescription>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="text-muted-foreground hover:text-foreground">
                                    <Info className="h-4 w-4" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <p className="text-sm">
                                    Tu <strong className="text-primary">1RM Estimado</strong> (Línea Azul) vs Tu <strong className="text-muted-foreground">Récord Histórico</strong> (Línea Gris). Si la azul sube, te estás volviendo más fuerte.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                            No hay datos de fuerza aún. ¡Completa entrenamientos y registra tus 1RMs para ver tu progreso!
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
                        <CardTitle>Strength Progression</CardTitle>
                        <CardDescription>1RM histórico vs estimado diario</CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground">
                                <Info className="h-4 w-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <p className="text-sm">
                                Tu <strong className="text-primary">1RM Estimado</strong> (Línea Azul) vs Tu <strong className="text-muted-foreground">Récord Histórico</strong> (Línea Gris). Si la azul sube, te estás volviendo más fuerte.
                            </p>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            label={{ value: 'kg', angle: -90, position: 'insideLeft' }}
                        />
                        <ChartTooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="historical"
                            stroke="hsl(var(--muted-foreground))"
                            strokeWidth={2}
                            name="Récord Histórico (1RM)"
                            dot={{ fill: 'hsl(var(--muted-foreground))', r: 4 }}
                            connectNulls
                        />
                        <Line
                            type="monotone"
                            dataKey="daily"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            name="Fuerza Diaria (Estimada)"
                            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                            connectNulls
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Custom Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Fuerza Diaria (Estimada)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                        <span className="text-muted-foreground">Récord Histórico (1RM)</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
