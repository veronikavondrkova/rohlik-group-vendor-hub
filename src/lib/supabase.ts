
import { createClient } from '@supabase/supabase-js';

// These environment variables are automatically populated by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure your Supabase integration is properly set up.');
}

// Create the Supabase client with default values if env vars are missing
export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co', 
  supabaseAnonKey || 'your-anon-key'
);
