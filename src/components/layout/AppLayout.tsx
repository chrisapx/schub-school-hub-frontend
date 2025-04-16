
import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import AppHeader from './AppHeader';
import StudentSidebar from './StudentSidebar';
import AdminSidebar from './AdminSidebar';

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const { portal } = useDomain();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // If there's no user, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // Ensure user role matches portal type
  if ((portal === 'student' && user.role !== 'student') || 
      (portal === 'admin' && user.role !== 'admin')) {
    return <Navigate to="/" />;
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
        <main className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="container mx-auto py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
