
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

// Context type
interface DomainContextType {
  portal: 'student' | 'admin' | null;
  setPortal: (portal: 'student' | 'admin') => void;
}

// Create context
const DomainContext = createContext<DomainContextType | undefined>(undefined);

// Provider component
export const DomainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [portal, setPortalState] = useState<'student' | 'admin' | null>(null);

  // Helper function to detect the portal from the subdomain
  const detectPortalFromSubdomain = (): 'student' | 'admin' | null => {
    const hostname = window.location.hostname;
    
    if (hostname.startsWith('student.')) {
      return 'student';
    } else if (hostname.startsWith('admin.')) {
      return 'admin';
    }
    
    // For local development or testing
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('lovableproject.com')) {
      // Check URL path for portal type indication
      const path = window.location.pathname;
      if (path.includes('/login/student')) {
        return 'student';
      } else if (path.includes('/login/admin')) {
        return 'admin';
      }
      
      // Check localStorage for a previously set portal type
      const storedPortal = localStorage.getItem('schub_portal');
      if (storedPortal === 'student' || storedPortal === 'admin') {
        return storedPortal;
      }
      
      // Default to user's role if available
      if (user) {
        return user.role;
      }
    }
    
    return null;
  };

  // Initialize the portal state when component mounts
  useEffect(() => {
    const detectedPortal = detectPortalFromSubdomain();
    setPortalState(detectedPortal);
  }, []);

  // If the user changes, we might need to update the portal
  useEffect(() => {
    if (user && !portal) {
      setPortalState(user.role);
    }
  }, [user, portal]);

  // Function to set the portal
  const setPortal = (newPortal: 'student' | 'admin') => {
    setPortalState(newPortal);
    localStorage.setItem('schub_portal', newPortal);
    
    // Let the user know that we're switching portals
    toast.info(`Switched to ${newPortal} portal`);
    
    // Optional: Redirect to the appropriate login page if not logged in
    if (!user) {
      window.location.href = `/login/${newPortal}`;
    }
  };

  return (
    <DomainContext.Provider value={{ portal, setPortal }}>
      {children}
    </DomainContext.Provider>
  );
};

// Custom hook to use domain context
export const useDomain = () => {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
};
