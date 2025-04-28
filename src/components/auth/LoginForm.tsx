import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface LoginFormProps {
  portalType: 'student' | 'admin';
}

const LoginForm: React.FC<LoginFormProps> = ({ portalType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await login(email, password);
      
      if (success) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('Could not retrieve user information');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role, school_id')
          .eq('id', user.id)
          .single();

        if (!profile) {
          toast.error('Could not retrieve profile information');
          return;
        }

        toast.success('Login successful');
        
        // Redirect based on role and portal type
        if (portalType === 'student' && profile.role === 'student') {
          navigate('/student/dashboard');
        } else if (portalType === 'admin' && 
          (profile.role === 'super_admin' || profile.role === 'school_admin' || profile.role === 'teacher')) {
          navigate('/admin/dashboard');
        } else {
          toast.error('Access denied. Please use the correct portal.');
        }
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {portalType === 'student' ? 'Student Login' : 'Admin Login'}
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your {portalType} portal
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <MailIcon className="h-5 w-5" />
              </span>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {portalType === 'student' ? 'Use S202500290001@smark.schub.com' : 'Use mcaplexya@gmail.com'}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <LockIcon className="h-5 w-5" />
              </span>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Use "password123" for demo</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
