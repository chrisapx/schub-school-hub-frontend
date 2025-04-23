
import React from 'react';
import { Bell, Menu, MenuIcon, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  toggleSidebar: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { portal } = useDomain();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className=" flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2 md:mr-0">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <img src="/favicon.ico" alt="" className='h-7 px-2 hidden md:block' />
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl hidden sm:inline-block">
              Schub
              <span className="text-primary"> {portal === 'student' ? 'Student' : 'Admin'}</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center w-full max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:max-w-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {portal === 'student' ? (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">New Assignment Added</span>
                      <span className="text-sm text-muted-foreground">Math - Algebra II - Due in 3 days</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">Assignment Graded</span>
                      <span className="text-sm text-muted-foreground">Science - Biology Lab Report</span>
                    </div>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">New Enrollment Request</span>
                      <span className="text-sm text-muted-foreground">3 new students pending approval</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">Grade Report Ready</span>
                      <span className="text-sm text-muted-foreground">Term 2 grade reports ready for review</span>
                    </div>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar>
                  {/* <AvatarImage src={user?.profileImage} alt={user?.name} /> */}
                  <AvatarFallback>{user?.name ? getInitials(user.name) : <User />}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
