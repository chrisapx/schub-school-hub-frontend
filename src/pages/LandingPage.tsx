
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDomain } from '@/contexts/DomainContext';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, ShieldCheck } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { portal } = useDomain();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect based on subdomain if user is not logged in
  useEffect(() => {
    if (portal === 'student') {
      navigate('/login/student');
    } else if (portal === 'admin') {
      navigate('/login/admin');
    }
    
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [portal, user, navigate]);
  
  // This page will only show if we're on the main domain without a subdomain
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-schub-primary">Schub</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Schub School Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  A modern platform for schools to manage students, teachers, and academic activities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => navigate('/login/student')}
                >
                  <GraduationCap className="h-5 w-5" />
                  Student Portal
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate('/login/admin')}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Admin Portal
                </Button>
              </div>
              
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                  <div className="rounded-full bg-primary p-3">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">Student Management</h2>
                  <p className="text-center text-gray-500">
                    Comprehensive student profiles, academic records, and behavior tracking.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                  <div className="rounded-full bg-primary p-3">
                    <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">Administrative Tools</h2>
                  <p className="text-center text-gray-500">
                    Powerful tools for administrators to manage school operations efficiently.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                  <div className="rounded-full bg-primary p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary-foreground"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">Communication</h2>
                  <p className="text-center text-gray-500">
                    Seamless communication between teachers, students, and parents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container px-4 md:flex md:h-16 md:items-center md:justify-between md:px-6">
          <div className="text-center text-sm text-gray-500 md:text-left">
            © 2025 Schub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
