import { createServerClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/logout-button';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Martes
          </h1>
          <p className="text-muted-foreground text-lg">
            Tu compañero de entrenamiento inteligente. Registra, analiza y mejora tu fuerza con sobrecarga progresiva automatizada.
          </p>

          {user ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Logged in as: <span className="font-medium text-foreground">{user.email}</span>
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
