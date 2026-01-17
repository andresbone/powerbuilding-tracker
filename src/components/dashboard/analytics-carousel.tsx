'use client';

import { VolumeChart } from './volume-chart';
import { StrengthChart } from './strength-chart';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface VolumeData {
    date: string;
    total: number;
}

interface StrengthDataPoint {
    date: string;
    historical: number | null;
    daily: number | null;
}

interface AnalyticsCarouselProps {
    volumeData: VolumeData[];
    strengthData: StrengthDataPoint[];
}

export function AnalyticsCarousel({ volumeData, strengthData }: AnalyticsCarouselProps) {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                <CarouselItem>
                    <VolumeChart data={volumeData} />
                </CarouselItem>
                <CarouselItem>
                    <StrengthChart data={strengthData} />
                </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0" />
                <CarouselNext className="relative right-0 top-0 translate-x-0 translate-y-0" />
            </div>
        </Carousel>
    );
}
