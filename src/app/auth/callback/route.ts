import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/dashboard';

    console.log('Auth callback - code:', code ? 'present' : 'missing');
    console.log('Auth callback - next:', next);

    if (code) {
        const cookieStore = await cookies();
        const supabase = await createServerClient();

        // Exchange code for session
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            console.log('Auth callback - success, redirecting to:', next);
            // Redirect to the next URL or dashboard
            return NextResponse.redirect(new URL(next, requestUrl.origin));
        } else {
            console.error('Auth callback - error:', error);
        }
    }

    // If there's an error or no code, redirect to login
    console.log('Auth callback - failed, redirecting to login');
    return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
