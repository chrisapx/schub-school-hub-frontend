
import React, { createContext, useContext, useState } from 'react';

// User types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

// Context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean; // Added this property
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users
const SAMPLE_USERS = {
  student: {
    id: 'S-2025-00290-001',
    name: 'Kamugisha Isaac',
    email: 'S202500290001@smark.schub.com',
    role: 'student' as UserRole,
    profileImage: '/placeholder.svg'
  },
  admin: {
    id: 'A-2025-00290-001',
    name: 'Christopher M.',
    email: 'chris.m@smack.schub.com',
    role: 'admin' as UserRole,
    profileImage: '/placeholder.svg'
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored user from localStorage
  const storedUser = localStorage.getItem('schub_user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Set loading state
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simplified login for this demo
      if ((role === 'student' && email === 'S202500290001@smark.schub.com' && password === 'password') ||
          (role === 'admin' && email === 'chris.m@smack.schub.com' && password === 'password')) {
        
        const newUser = role === 'student' ? SAMPLE_USERS.student : SAMPLE_USERS.admin;
        setUser(newUser);
        localStorage.setItem('schub_user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('schub_user');
  };

  // Switch between student and admin roles (for demo purposes)
  const switchRole = (role: UserRole) => {
    const newUser = role === 'student' ? SAMPLE_USERS.student : SAMPLE_USERS.admin;
    setUser(newUser);
    localStorage.setItem('schub_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};