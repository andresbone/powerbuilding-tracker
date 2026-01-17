import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data } = await request.json();

        // Prepare upsert data
        const upsertData = data.map((item: { exercise_id: string; weight_kg: number }) => ({
            user_id: user.id,
            exercise_id: item.exercise_id,
            weight_kg: item.weight_kg,
            date_achieved: new Date().toISOString(),
        }));

        // Upsert 1RMs
        const { error } = await supabase
            .from('user_1rms')
            .upsert(upsertData, {
                onConflict: 'user_id,exercise_id',
            });

        if (error) {
            console.error('Error upserting 1RMs:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in 1RMs setup:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
