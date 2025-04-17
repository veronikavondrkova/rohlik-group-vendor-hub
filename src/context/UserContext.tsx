import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, initializeSupabaseTables } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'supplier' | 'internal';

interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole, company?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Supabase tables when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeSupabaseTables();
        console.log('Supabase tables initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Supabase tables:', error);
      }
    };
    
    initialize();
  }, []);

  // Check and migrate local storage user data
  const migrateLocalStorageUser = async () => {
    try {
      console.log('Checking for local user data to migrate...');
      // Check if there's user data in localStorage
      const localUserData = localStorage.getItem('user');
      
      if (localUserData) {
        console.log('Found local user data:', localUserData);
        const localUser = JSON.parse(localUserData);
        
        // If we already have a session, try to match it with local data
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          // If no active session, create one with local data
          // Note: This requires knowledge of the password which we don't have in localStorage
          // We'll notify the user they need to login again
          toast({
            title: "Migration Required",
            description: "Please log in with your credentials to migrate your data to our new system."
          });
          
          // Remove local storage data after migration notification
          localStorage.removeItem('user');
        } else {
          // Check if user exists in database
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();
            
          if (!existingUser) {
            // Create user record in Supabase with local data
            const { error: insertError } = await supabase.from('users').insert({
              id: authUser.id,
              name: localUser.name || authUser.user_metadata?.name || '',
              email: authUser.email,
              company: localUser.company,
              role: localUser.role
            });
            
            if (insertError) {
              console.error('Error inserting user during migration:', insertError);
            } else {
              console.log('User migrated successfully');
              toast({
                title: "Success",
                description: "Your account has been migrated to our new system."
              });
            }
          }
          
          // Remove local storage data after migration
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Error migrating user data:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      // Get the current user from Supabase auth
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Get the user's data from the users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
          return;
        }

        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            company: userData.company,
            role: userData.role
          });
        }
      }
      setIsLoading(false);
      
      // Attempt to migrate any local storage data
      migrateLocalStorageUser();
    };

    fetchUser();

    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Get the user data from the users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            company: userData.company,
            role: userData.role
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure tables exist before logging in
      await initializeSupabaseTables();
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have successfully logged in"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole, company?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure tables exist before signup
      await initializeSupabaseTables();
      
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      // If signup is successful, add the user to the users table
      if (authData.user) {
        const { error: insertError } = await supabase.from('users').insert({
          id: authData.user.id,
          name,
          email,
          role,
          company
        });

        if (insertError) throw insertError;

        toast({
          title: "Success",
          description: "Account created successfully"
        });
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
