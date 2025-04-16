
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => {
              if (user) {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
            }}
            className="w-full sm:w-auto"
          >
            {user ? 'Back to Dashboard' : 'Back to Home'}
          </Button>
          
          {!user && (
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
