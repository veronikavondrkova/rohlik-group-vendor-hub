
import { createClient } from '@supabase/supabase-js';

// These environment variables should be provided by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if Supabase credentials are not available
const createMockClient = () => {
  console.warn('⚠️ Using mock Supabase client. Please connect to Supabase for production use.');
  
  // Return an object with the same interface as the Supabase client
  // but with methods that use localStorage instead
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async ({ email, password }) => {
        // Check if credentials match any user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return { data: { user }, error: null };
        }
        
        return { data: { user: null }, error: { message: 'Invalid login credentials' } };
      },
      signUp: async ({ email, password }) => {
        const userId = `local-${Date.now()}`;
        return { data: { user: { id: userId, email } }, error: null };
      },
      onAuthStateChange: () => {
        return { 
          subscription: { unsubscribe: () => {} },
          data: {} 
        };
      },
      signOut: async () => {
        localStorage.removeItem('user');
        return { error: null };
      }
    },
    from: (table) => {
      return {
        select: (columns) => {
          return {
            eq: (field, value) => {
              return {
                single: async () => {
                  const items = JSON.parse(localStorage.getItem(table) || '[]');
                  const item = items.find(item => item[field] === value);
                  return { data: item || null, error: null };
                },
                order: () => {
                  return {
                    // Return all items from localStorage for the given table
                    async get() {
                      const items = JSON.parse(localStorage.getItem(table) || '[]');
                      const filtered = items.filter(item => item[field] === value);
                      return { data: filtered, error: null };
                    }
                  };
                }
              };
            },
            order: () => {
              return {
                // Return all items from localStorage for the given table
                async get() {
                  const items = JSON.parse(localStorage.getItem(table) || '[]');
                  return { data: items, error: null };
                }
              };
            }
          };
        },
        insert: async (data) => {
          const items = JSON.parse(localStorage.getItem(table) || '[]');
          items.push(data);
          localStorage.setItem(table, JSON.stringify(items));
          return { data, error: null };
        },
        update: async (updates) => {
          return {
            eq: async (field, value) => {
              const items = JSON.parse(localStorage.getItem(table) || '[]');
              const updatedItems = items.map(item => 
                item[field] === value ? { ...item, ...updates } : item
              );
              localStorage.setItem(table, JSON.stringify(updatedItems));
              return { data: updates, error: null };
            }
          };
        },
        delete: () => {
          return {
            eq: async (field, value) => {
              const items = JSON.parse(localStorage.getItem(table) || '[]');
              const filteredItems = items.filter(item => item[field] !== value);
              localStorage.setItem(table, JSON.stringify(filteredItems));
              return { error: null };
            }
          };
        }
      };
    },
    channel: () => {
      return {
        on: () => {
          return {
            subscribe: () => {}
          };
        }
      };
    },
    removeChannel: () => {}
  };
};

// Check if Supabase credentials are available
const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;

// Create real Supabase client if credentials are available, otherwise use mock client
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Function to check if we're using the real Supabase client
export const isRealSupabaseClient = () => hasSupabaseCredentials;
