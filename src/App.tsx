
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { DomainProvider } from '@/contexts/DomainContext';
import { SearchProvider } from '@/contexts/SearchContext';

// Landing page
import LandingPage from '@/pages/LandingPage';

// Auth pages
import StudentLoginPage from '@/pages/student/StudentLoginPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';

// Layout
import AppLayout from '@/components/layout/AppLayout';

// Student pages
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentProfile from '@/pages/student/StudentProfile';
import StudentSubjects from '@/pages/student/StudentSubjects';
import StudentAssignments from '@/pages/student/StudentAssignments';
import StudentMarks from '@/pages/student/StudentMarks';
import StudentBehavior from '@/pages/student/StudentBehavior';
import StudentMessages from '@/pages/student/StudentMessages';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminStudents from '@/pages/admin/AdminStudents';
import AdminSubjects from '@/pages/admin/AdminSubjects';
import AdminTeachers from '@/pages/admin/AdminTeachers';
import AdminAssignments from '@/pages/admin/AdminAssignments';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminBehavior from '@/pages/admin/AdminBehavior';

// 404 page
import NotFound from '@/pages/NotFound';

// Create React Query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DomainProvider>
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                {/* Landing page */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Auth routes */}
                <Route path="/login/student" element={<StudentLoginPage />} />
                <Route path="/login/admin" element={<AdminLoginPage />} />
                
                {/* Protected routes - wrapped in AppLayout */}
                <Route path="/" element={<AppLayout />}>
                  {/* Dynamic routing based on user role */}
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="subjects" element={<StudentSubjects />} />
                  <Route path="assignments" element={<StudentAssignments />} />
                  <Route path="marks" element={<StudentMarks />} />
                  <Route path="behavior" element={<StudentBehavior />} />
                  <Route path="messages" element={<StudentMessages />} />
                  
                  {/* Admin routes */}
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="teachers" element={<AdminTeachers />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>
                
                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
          </SearchProvider>
        </DomainProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
