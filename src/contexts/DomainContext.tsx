
import React, { createContext, useContext, useState, useEffect } from 'react';
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
      if (path.includes('/login/student') || path.includes('/student')) {
        return 'student';
      } else if (path.includes('/login/admin') || path.includes('/admin')) {
        return 'admin';
      }
      
      // Check localStorage for a previously set portal type
      const storedPortal = localStorage.getItem('schub_portal');
      if (storedPortal === 'student' || storedPortal === 'admin') {
        return storedPortal;
      }
      
      // Get user from localStorage if available
      const userStr = localStorage.getItem('schub_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.role;
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
    }
    
    return null;
  };

  // Initialize the portal state when component mounts
  useEffect(() => {
    const detectedPortal = detectPortalFromSubdomain();
    setPortalState(detectedPortal);
  }, []);

  // Function to set the portal
  const setPortal = (newPortal: 'student' | 'admin') => {
    setPortalState(newPortal);
    localStorage.setItem('schub_portal', newPortal);
    
    // Let the user know that we're switching portals
    toast.info(`Switched to ${newPortal} portal`);
    
    // Check if user is logged in by directly accessing localStorage
    const userStr = localStorage.getItem('schub_user');
    const isLoggedIn = userStr !== null;
    
    // Optional: Redirect to the appropriate login page if not logged in
    if (!isLoggedIn) {
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
