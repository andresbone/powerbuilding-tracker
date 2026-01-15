/**
 * Centralized exports for Supabase client utilities
 * 
 * Usage examples:
 * 
 * // In Client Components:
 * import { createClient } from '@/lib/supabase';
 * const supabase = createClient();
 * 
 * // In Server Components/Actions:
 * import { createServerClient } from '@/lib/supabase';
 * const supabase = await createServerClient();
 */

export { createClient } from './client';
export { createClient as createServerClient } from './server';
export * from './types';
