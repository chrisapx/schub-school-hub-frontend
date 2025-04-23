
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import LoginForm from '@/components/auth/LoginForm';

const StudentLoginPage: React.FC = () => {
  const { user } = useAuth();
  const { portal } = useDomain();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
    
    // If on admin portal, redirect to admin login
    if (portal === 'admin') {
      navigate('/login/admin');
    }
  }, [user, portal, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-schub-light to-background p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center text-schub-primary mb-2">Schub</h1>
        <p className="text-center text-muted-foreground">Student Learning Portal</p>
      </div>
      
      <LoginForm portalType="student" />
      
      <p className="mt-8 text-sm text-center text-muted-foreground">
        <a href="/landing" className="underline hover:text-primary">
          Back to main page
        </a>
      </p>
    </div>
  );
};

export default StudentLoginPage;
