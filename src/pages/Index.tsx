
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
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
      return;
    }
    
    // Determine the portal from URL path if available
    const path = window.location.pathname;
    if (path.includes('/login/student')) {
      setPortal('student');
    } else if (path.includes('/login/admin')) {
      setPortal('admin');
    }
    
    // Redirect based on subdomain/portal if not on landing page
    if (portal === 'student' && !path.includes('/login/student')) {
      navigate('/login/student');
    } else if (portal === 'admin' && !path.includes('/login/admin')) {
      navigate('/login/admin');
    }
  }, [portal, user, navigate, setPortal]);
  
  return <LandingPage />;
};

export default Index;
