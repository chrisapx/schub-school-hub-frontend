
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import LoginForm from '@/components/auth/LoginForm';

const AdminLoginPage: React.FC = () => {
  const { user } = useAuth();
  const { portal } = useDomain();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
    
    // If on student portal, redirect to student login
    if (portal === 'student') {
      navigate('/login/student');
    }
  }, [user, portal, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-schub-light to-background p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center text-schub-primary mb-2">Schub</h1>
        <p className="text-center text-muted-foreground">Administration Portal</p>
      </div>
      
      <LoginForm portalType="admin" />
      
      <p className="mt-8 text-sm text-center text-muted-foreground">
        <a href="/" className="underline hover:text-primary">
          Back to main page
        </a>
      </p>
    </div>
  );
};

export default AdminLoginPage;
