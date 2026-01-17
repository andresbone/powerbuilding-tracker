'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useClickOutside } from '@/lib/hooks/use-click-outside';

export function RestTimer() {
    const [seconds, setSeconds] = useState(90); // Default 90 seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Click outside to minimize
    const timerRef = useClickOutside<HTMLDivElement>(() => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    });

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Timer logic
    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        playBeep();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, seconds]);

    const playBeep = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContext();
            }
            const ctx = audioContextRef.current;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not available');
        }
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(90);
    };

    const addTime = (amount: number) => {
        setSeconds((prev) => prev + amount);
    };

    const formatTime = (totalSeconds: number): string => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="container mx-auto px-4 pb-4 max-w-3xl">
                <div className="pointer-events-auto">
                    {/* Collapsed view */}
                    {!isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="w-full bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3 hover:bg-accent transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Rest Timer</span>
                                <span className="text-2xl font-bold font-mono tabular-nums">
                                    {formatTime(seconds)}
                                </span>
                            </div>
                        </button>
                    )}

                    {/* Expanded view */}
                    {isExpanded && (
                        <div ref={timerRef} className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-muted-foreground">Rest Timer</h3>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-muted-foreground hover:text-foreground text-xs"
                                    >
                                        Minimize
                                    </button>
                                </div>

                                {/* Time display */}
                                <div className="text-center">
                                    <div className={`text-5xl font-bold font-mono tabular-nums ${seconds === 0 ? 'text-red-500 animate-pulse' : ''
                                        }`}>
                                        {formatTime(seconds)}
                                    </div>
                                    {seconds === 0 && (
                                        <p className="text-sm text-red-500 mt-2 font-medium">Time's up!</p>
                                    )}
                                </div>

                                {/* Controls */}
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        onClick={toggleTimer}
                                        size="lg"
                                        variant={isRunning ? "secondary" : "default"}
                                        className="flex-1 max-w-[120px]"
                                    >
                                        {isRunning ? (
                                            <>
                                                <Pause className="mr-2 h-4 w-4" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-2 h-4 w-4" />
                                                Start
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={resetTimer}
                                        size="lg"
                                        variant="outline"
                                        className="flex-1 max-w-[120px]"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reset
                                    </Button>
                                </div>

                                {/* Preset buttons */}
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        onClick={() => addTime(30)}
                                        size="sm"
                                        variant="ghost"
                                        className="flex-1"
                                    >
                                        +30s
                                    </Button>
                                    <Button
                                        onClick={() => addTime(60)}
                                        size="sm"
                                        variant="ghost"
                                        className="flex-1"
                                    >
                                        +1m
                                    </Button>
                                    <Button
                                        onClick={() => setSeconds(90)}
                                        size="sm"
                                        variant="ghost"
                                        className="flex-1"
                                    >
                                        1:30
                                    </Button>
                                    <Button
                                        onClick={() => setSeconds(180)}
                                        size="sm"
                                        variant="ghost"
                                        className="flex-1"
                                    >
                                        3:00
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
