
import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'Supplier Demo',
    email: 'supplier@example.com',
    password: 'password',
    company: 'Demo Supplier Co.',
    role: 'supplier' as UserRole,
  },
  {
    id: '2',
    name: 'Internal Team',
    email: 'internal@example.com',
    password: 'password',
    role: 'internal' as UserRole,
  },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login process
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        } else {
          setError('Invalid email or password');
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole, company?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock signup process
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          setError('Email already exists');
        } else {
          const newUser = {
            id: `${mockUsers.length + 1}`,
            name,
            email,
            company,
            role,
          };
          
          // In a real app, we would save this to a database
          mockUsers.push({ ...newUser, password });
          
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred during signup');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
