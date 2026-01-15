/**
 * Example usage patterns for Supabase clients
 * This file demonstrates how to use the Supabase clients in different contexts
 */

// ============================================
// CLIENT COMPONENT EXAMPLE
// ============================================
/*
'use client';

import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import type { Exercise } from '@/lib/supabase/types';

export function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching exercises:', error);
        return;
      }
      
      setExercises(data || []);
    }

    fetchExercises();
  }, [supabase]);

  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.id}>{exercise.name}</li>
      ))}
    </ul>
  );
}
*/

// ============================================
// SERVER COMPONENT EXAMPLE
// ============================================
/*
import { createServerClient } from '@/lib/supabase';
import type { WorkoutTemplate } from '@/lib/supabase/types';

export default async function WorkoutTemplatesPage() {
  const supabase = await createServerClient();
  
  const { data: templates, error } = await supabase
    .from('workout_templates')
    .select('*')
    .order('week_num', { ascending: true });

  if (error) {
    return <div>Error loading templates: {error.message}</div>;
  }

  return (
    <div>
      <h1>Workout Templates</h1>
      <ul>
        {templates?.map((template: WorkoutTemplate) => (
          <li key={template.id}>
            Week {template.week_num}, Day {template.day_num}: {template.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
*/

// ============================================
// SERVER ACTION EXAMPLE
// ============================================
/*
'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateUser1RM(
  exerciseId: string,
  weightKg: number
) {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('user_1rms')
    .upsert({
      user_id: user.id,
      exercise_id: exerciseId,
      weight_kg: weightKg,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,exercise_id'
    });

  if (error) {
    throw new Error(`Failed to update 1RM: ${error.message}`);
  }

  revalidatePath('/dashboard');
  return { success: true };
}
*/

// ============================================
// AUTHENTICATION EXAMPLE
// ============================================
/*
'use client';

import { createClient } from '@/lib/supabase';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return;
    }

    console.log('Logged in:', data.user);
    // Redirect to dashboard
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
*/

export { };
