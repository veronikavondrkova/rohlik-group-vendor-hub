
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';

export const LoginForm = () => {
  const { login, isLoading, error } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    try {
      await login(loginData.email, loginData.password);

      // Check if login was successful by waiting for next render
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
          toast({
            title: "Success",
            description: "You have successfully logged in"
          });

          // Redirect based on role
          if (user.role === 'supplier') {
            navigate('/homepage');
          } else {
            navigate('/dashboard');
          }
        }
      }, 100);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            value={loginData.email} 
            onChange={e => setLoginData({
              ...loginData,
              email: e.target.value
            })} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter your password" 
            value={loginData.password} 
            onChange={e => setLoginData({
              ...loginData,
              password: e.target.value
            })} 
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </CardFooter>
    </form>
  );
};
