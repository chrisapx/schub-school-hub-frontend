
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock login function that simulates API call
const mockLogin = async (email: string, password: string, role: UserRole): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // Mock users
  const mockUsers = {
    student: {
      id: 'student-123',
      name: 'John Doe',
      email: 'student@example.com',
      role: 'student' as UserRole,
      profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
      token: 'mock-jwt-token-student',
    },
    admin: {
      id: 'admin-456',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as UserRole,
      profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
      token: 'mock-jwt-token-admin',
    }
  };
  
  // Simple authentication logic
  if (email === 'student@example.com' && password === 'password' && role === 'student') {
    return mockUsers.student;
  } else if (email === 'admin@example.com' && password === 'password' && role === 'admin') {
    return mockUsers.admin;
  }
  
  throw new Error('Invalid credentials');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('schubUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('schubUser');
      }
    }
  }, []);
  
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loggedInUser = await mockLogin(email, password, role);
      setUser(loggedInUser);
      localStorage.setItem('schubUser', JSON.stringify(loggedInUser));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred');
      }
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('schubUser');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
