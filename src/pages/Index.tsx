import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomain } from '@/contexts/DomainContext';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from './LandingPage';

const Index = () => {
  const { portal, setPortal } = useDomain();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle routing based on user authentication and portal type
    const handleRouting = () => {
      // Determine the portal from URL path if available
      const path = window.location.pathname;
      if (path.includes('/login/student')) {
        setPortal('student');
      } else if (path.includes('/login/admin')) {
        setPortal('admin');
      }
      
      // If user is already logged in, redirect to appropriate dashboard
      if (user) {
        const targetPortal = user.role || portal;
        
        // Ensure portal matches user role
        if (targetPortal !== portal) {
          setPortal(targetPortal as 'student' | 'admin');
        }
        
        // Redirect to appropriate dashboard
        navigate(`/${targetPortal}/dashboard`);
        return;
      }
      
      // If not logged in but portal is set, redirect to appropriate login page
      if (portal) {
        navigate(`/login/${portal}`);
        return;
      }
      
      // Otherwise, stay on landing page
    };
    
    handleRouting();
  }, [portal, user, navigate, setPortal]);
  
  return <LandingPage />;
};

export default Index;
