
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomain } from '@/contexts/DomainContext';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from './LandingPage';

const Index = () => {
  const { portal } = useDomain();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
      return;
    }
    
    // Redirect based on subdomain if not on landing page
    if (portal === 'student') {
      navigate('/login/student');
    } else if (portal === 'admin') {
      navigate('/login/admin');
    }
  }, [portal, user, navigate]);
  
  return <LandingPage />;
};

export default Index;
