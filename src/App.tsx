
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { DomainProvider } from './contexts/DomainContext';
import { SearchProvider } from './contexts/SearchContext';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import StudentLoginPage from './pages/student/StudentLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminAssignments from './pages/admin/AdminAssignments';
import AdminBehavior from './pages/admin/AdminBehavior';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentSubjects from './pages/student/StudentSubjects';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentMarks from './pages/student/StudentMarks';
import StudentBehavior from './pages/student/StudentBehavior';
import StudentInvoices from './pages/student/StudentInvoices';
import StudentMessages from './pages/student/StudentMessages';
import StudentProfile from './pages/student/StudentProfile';
import ThemeToggleHeader from './components/layout/ThemeToggleHeader';
import { Toaster } from './components/ui/sonner';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DomainProvider>
        <AuthProvider>
          <SearchProvider>
            <Router>
              <ThemeToggleHeader />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login/admin" element={<AdminLoginPage />} />
                <Route path="/login/student" element={<StudentLoginPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AppLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="teachers" element={<AdminTeachers />} />
                  <Route path="subjects" element={<AdminSubjects />} />
                  <Route path="assignments" element={<AdminAssignments />} />
                  <Route path="behavior" element={<AdminBehavior />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>
                
                {/* Student Routes */}
                <Route path="/student" element={<AppLayout />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="subjects" element={<StudentSubjects />} />
                  <Route path="assignments" element={<StudentAssignments />} />
                  <Route path="marks" element={<StudentMarks />} />
                  <Route path="behavior" element={<StudentBehavior />} />
                  <Route path="invoices" element={<StudentInvoices />} />
                  <Route path="messages" element={<StudentMessages />} />
                  <Route path="profile" element={<StudentProfile />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </SearchProvider>
        </AuthProvider>
      </DomainProvider>
    </QueryClientProvider>
  );
}

export default App;
