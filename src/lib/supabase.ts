
import { createClient } from '@supabase/supabase-js';

// These environment variables are automatically populated by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure your Supabase integration is properly set up in Lovable.');
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
    return false;
  }
};

// Function to initialize necessary tables in Supabase
export const initializeSupabaseTables = async () => {
  try {
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
      await supabase.query(`
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
      await supabase.query(`
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
