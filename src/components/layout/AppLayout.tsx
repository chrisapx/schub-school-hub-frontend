
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { toast } from 'sonner';
import AppHeader from './AppHeader';
import StudentSidebar from './StudentSidebar';
import AdminSidebar from './AdminSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { initializeDummyData } from '@/utils/localStorage';

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const { portal, setPortal } = useDomain();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();
  
  // Initialize dummy data on mount
  useEffect(() => {
    initializeDummyData();
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // If there's no user, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // Ensure user role matches portal type or prompt to switch
  if ((portal === 'student' && user.role !== 'student') || (portal === 'admin' && user.role !== 'admin')) {
    // Instead of redirecting, let's offer to switch to the correct portal
    if (user.role === 'student') {
      toast.info('Switching to student portal for proper access', {
        action: {
          label: 'Switch Now',
          onClick: () => setPortal('student')
        }
      });
      setPortal('student');
    } else if (user.role === 'admin') {
      toast.info('Switching to admin portal for proper access', {
        action: {
          label: 'Switch Now',
          onClick: () => setPortal('admin')
        }
      });
      setPortal('admin');
    }
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {portal === 'student' ? (
          <StudentSidebar open={sidebarOpen} />
        ) : (
          <AdminSidebar open={sidebarOpen} />
        )}
        <main 
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 bg-gradient-to-br from-background to-background/80
            ${sidebarOpen ? 'md:ml-64' : ''}`}
        >
          <div className="container mx-auto py-4">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AppLayout;
