
import { createClient } from '@supabase/supabase-js';

// These environment variables are automatically populated by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using development mode with localStorage fallbacks.');
}

// Create the Supabase client with default values if env vars are missing
export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co', 
  supabaseAnonKey || 'your-anon-key'
);

// Check if the Supabase connection is valid
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    console.warn('Supabase connection check failed:', e);
    return false;
  }
};

// Function to initialize necessary tables in Supabase
export const initializeSupabaseTables = async () => {
  try {
    const connectionCheck = await checkSupabaseConnection();
    if (!connectionCheck) {
      console.warn('Using localStorage fallback due to Supabase connection issues');
      return false;
    }

    // Check if the users table exists, if not create it
    const { error: userTableError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'users',
      columns: `
        id uuid primary key,
        name text not null,
        email text unique not null,
        company text,
        role text not null check (role in ('supplier', 'internal'))
      `
    });

    if (userTableError) {
      console.error('Error creating users table:', userTableError);
      
      // If RPC fails, try directly with SQL (fallback)
      // Note: Using from().select() instead of query()
      await supabase.from('_exec_sql').select('*', {
        head: true,
        count: "exact"
      }).eq('query', `
        CREATE TABLE IF NOT EXISTS users (
          id uuid primary key,
          name text not null,
          email text unique not null,
          company text,
          role text not null check (role in ('supplier', 'internal'))
        );
      `);
    }

    // Check if the assets table exists, if not create it
    const { error: assetTableError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'assets',
      columns: `
        id uuid primary key,
        name text not null,
        supplier text,
        format text,
        status text default 'pending',
        dateSubmitted date not null,
        description text,
        background text,
        backgroundImage text,
        textContent text,
        textColor text,
        textPosition text,
        ctaText text,
        ctaColor text,
        ctaTextColor text,
        priceTag text,
        priceTagPosition text,
        gradient boolean,
        gradientColor text,
        gradientDirection text,
        feedback text
      `
    });

    if (assetTableError) {
      console.error('Error creating assets table:', assetTableError);
      
      // If RPC fails, try directly with SQL (fallback)
      // Note: Using from().select() instead of query()
      await supabase.from('_exec_sql').select('*', {
        head: true,
        count: "exact"
      }).eq('query', `
        CREATE TABLE IF NOT EXISTS assets (
          id uuid primary key,
          name text not null,
          supplier text,
          format text,
          status text default 'pending',
          dateSubmitted date not null,
          description text,
          background text,
          backgroundImage text,
          textContent text,
          textColor text,
          textPosition text,
          ctaText text,
          ctaColor text,
          ctaTextColor text,
          priceTag text,
          priceTagPosition text,
          gradient boolean,
          gradientColor text,
          gradientDirection text,
          feedback text
        );
      `);
    }

    return true;
  } catch (error) {
    console.error('Error initializing tables:', error);
    return false;
  }
};

// Local storage fallback functions for development when Supabase is not available
export const useLocalStorageFallback = () => {
  const checkConnection = async () => {
    try {
      const isConnected = await checkSupabaseConnection();
      return isConnected;
    } catch (error) {
      return false;
    }
  };

  // User operations with localStorage fallback
  const getUser = async (email: string) => {
    try {
      const isConnected = await checkConnection();
      if (isConnected) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();
        if (error) throw error;
        return data;
      } else {
        // Fallback to localStorage
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = localUsers.find((u: any) => u.email === email);
        return user || null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const isConnected = await checkConnection();
      if (isConnected) {
        // Try to use Supabase Auth
        return await supabase.auth.signInWithPassword({
          email,
          password
        });
      } else {
        // Fallback to localStorage
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        // In a real app, passwords would be hashed, but for development:
        const user = localUsers.find((u: any) => u.email === email);
        
        if (user) {
          // Store current user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          return { data: { user }, error: null };
        } else {
          return { data: null, error: { message: 'Invalid login credentials' } };
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { data: null, error: { message: error.message || 'Login failed' } };
    }
  };

  return {
    getUser,
    loginUser
  };
};
