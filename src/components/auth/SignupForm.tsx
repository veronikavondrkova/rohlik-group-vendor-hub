
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

export const SignupForm = () => {
  const { signup, isLoading, error } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: 'supplier' as UserRole
  });

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    try {
      await signup(signupData.name, signupData.email, signupData.password, signupData.role, signupData.company);
      toast({
        title: "Success",
        description: "Account created successfully"
      });

      // Redirect based on role
      if (signupData.role === 'supplier') {
        navigate('/homepage');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Fill in your details to create a new account
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Enter your full name" 
            value={signupData.name} 
            onChange={e => setSignupData({
              ...signupData,
              name: e.target.value
            })} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input 
            id="signup-email" 
            type="email" 
            placeholder="Enter your email" 
            value={signupData.email} 
            onChange={e => setSignupData({
              ...signupData,
              email: e.target.value
            })} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company Name (for suppliers)</Label>
          <Input 
            id="company" 
            type="text" 
            placeholder="Enter your company name" 
            value={signupData.company} 
            onChange={e => setSignupData({
              ...signupData,
              company: e.target.value
            })} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Account Type</Label>
          <select 
            id="role" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            value={signupData.role} 
            onChange={e => setSignupData({
              ...signupData,
              role: e.target.value as UserRole
            })}
          >
            <option value="supplier">Supplier</option>
            <option value="internal">Internal Team</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input 
            id="signup-password" 
            type="password" 
            placeholder="Create a password" 
            value={signupData.password} 
            onChange={e => setSignupData({
              ...signupData,
              password: e.target.value
            })} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input 
            id="confirm-password" 
            type="password" 
            placeholder="Confirm your password" 
            value={signupData.confirmPassword} 
            onChange={e => setSignupData({
              ...signupData,
              confirmPassword: e.target.value
            })} 
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </CardFooter>
    </form>
  );
};
