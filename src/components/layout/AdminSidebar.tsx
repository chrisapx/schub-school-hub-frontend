
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, BookOpen, FileText, GraduationCap, Home, LayoutDashboard, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  open: boolean;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { path: '/students', label: 'Student Management', icon: <Users className="h-5 w-5" /> },
  { path: '/subjects', label: 'Subject Management', icon: <BookOpen className="h-5 w-5" /> },
  { path: '/teachers', label: 'Teacher Management', icon: <GraduationCap className="h-5 w-5" /> },
  { path: '/assignments', label: 'Assignments Manager', icon: <FileText className="h-5 w-5" /> },
  { path: '/analytics', label: 'Performance Analytics', icon: <BarChart2 className="h-5 w-5" /> },
  { path: '/behavior', label: 'Behavior Reports', icon: <GraduationCap className="h-5 w-5" /> },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open }) => {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-sidebar pt-16 transition-transform duration-300 md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col overflow-y-auto p-4">
        <div className="mb-6 px-2">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Admin Portal</h2>
          <p className="text-sm text-sidebar-foreground/80">School management system</p>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pt-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium">System Information</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Schub Admin Portal v1.0
            </p>
            <div className="text-xs text-muted-foreground">
              Last updated: April 2025
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
