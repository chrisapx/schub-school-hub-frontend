
import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortalType = 'student' | 'admin' | 'landing';

interface DomainContextType {
  portal: PortalType;
  subdomain: string | null;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const DomainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portalState, setPortalState] = useState<DomainContextType>({
    portal: 'landing',
    subdomain: null
  });
  
  useEffect(() => {
    // Get current hostname
    const hostname = window.location.hostname;
    
    // Check for localhost or IP for development
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
    
    // If in development, use URL parameters to simulate subdomains
    if (isLocalhost) {
      const params = new URLSearchParams(window.location.search);
      const portalParam = params.get('portal');
      
      if (portalParam === 'student') {
        setPortalState({ portal: 'student', subdomain: 'student' });
      } else if (portalParam === 'admin') {
        setPortalState({ portal: 'admin', subdomain: 'admin' });
      } else {
        setPortalState({ portal: 'landing', subdomain: null });
      }
    } else {
      // Production environment - extract subdomain
      const parts = hostname.split('.');
      
      if (parts.length > 2) {
        const sub = parts[0].toLowerCase();
        
        if (sub === 'student') {
          setPortalState({ portal: 'student', subdomain: 'student' });
        } else if (sub === 'admin') {
          setPortalState({ portal: 'admin', subdomain: 'admin' });
        } else {
          setPortalState({ portal: 'landing', subdomain: null });
        }
      } else {
        // Main domain without subdomain
        setPortalState({ portal: 'landing', subdomain: null });
      }
    }
  }, []);
  
  return (
    <DomainContext.Provider value={portalState}>
      {children}
    </DomainContext.Provider>
  );
};

export const useDomain = () => {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
};
