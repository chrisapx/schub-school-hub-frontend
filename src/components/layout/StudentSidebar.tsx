
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  LayoutDashboard, 
  User, 
  BookText, 
  MessageSquare, 
  Award, 
  CreditCard, 
  GraduationCap, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface StudentSidebarProps {
  open: boolean;
}

// Define sidebar sections and items
const navSections = [
  {
    title: "Main",
    items: [
      { path: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { path: '/student/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    ]
  },
  {
    title: "Academics",
    items: [
      { path: '/student/subjects', label: 'Subjects', icon: <BookOpen className="h-5 w-5" /> },
      { path: '/student/assignments', label: 'Assignments', icon: <FileText className="h-5 w-5" /> },
      { path: '/student/marks', label: 'Marks & Grades', icon: <BookText className="h-5 w-5" /> },
    ]
  },
  {
    title: "Performance",
    items: [
      { path: '/student/behavior', label: 'Behavior Profile', icon: <Award className="h-5 w-5" /> },
    ]
  },
  {
    title: "Finance",
    items: [
      { path: '/student/invoices', label: 'Invoices', icon: <CreditCard className="h-5 w-5" /> },
    ]
  },
  {
    title: "Communication",
    items: [
      { path: '/student/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    ]
  }
];

const StudentSidebar: React.FC<StudentSidebarProps> = ({ open }) => {
  const { user } = useAuth();

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-sidebar pt-16 transition-transform duration-300 md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col overflow-y-auto">
        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name?.charAt(0) || 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{user?.name || 'Student Name'}</span>
              <span className="text-xs text-muted-foreground">Form 3A | SN { user?.id}</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Sections */}
        <nav className="flex-1 px-2 py-4">
          {navSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )
                      }
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="mt-auto p-4 border-t">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="font-medium">Student Portal</h3>
            </div>
            <div className="text-xs text-muted-foreground space-y-2">
              <p>Academic year: 2024-2025</p>
              <p>Last login: April 15, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;
