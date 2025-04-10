import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
const Login = () => {
  const {
    login,
    signup,
    isLoading,
    error
  } = useUser();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: 'supplier' as UserRole
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
  return <div className="flex min-h-screen bg-black">
      <div className="m-auto w-full max-w-md">
        {/* Logo placeholder above the main headline */}
        <div className="flex justify-center mb-6">
          <div className="w-52 h-32 rounded-md bg-gray-800 flex items-center justify-center my-[18px]">
            <span className="text-gray-400 text-xs">Logo Placeholder</span>
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Welcome!</h1>
          <p className="text-gray-400">Streamlined vendor asset creation & approval platform</p>
        </div>
        
        <Card className="w-full">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={loginData.email} onChange={e => setLoginData({
                    ...loginData,
                    email: e.target.value
                  })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={loginData.password} onChange={e => setLoginData({
                    ...loginData,
                    password: e.target.value
                  })} />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
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
                    <Input id="name" type="text" placeholder="Enter your full name" value={signupData.name} onChange={e => setSignupData({
                    ...signupData,
                    name: e.target.value
                  })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" value={signupData.email} onChange={e => setSignupData({
                    ...signupData,
                    email: e.target.value
                  })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (for suppliers)</Label>
                    <Input id="company" type="text" placeholder="Enter your company name" value={signupData.company} onChange={e => setSignupData({
                    ...signupData,
                    company: e.target.value
                  })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <select id="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={signupData.role} onChange={e => setSignupData({
                    ...signupData,
                    role: e.target.value as UserRole
                  })}>
                      <option value="supplier">Supplier</option>
                      <option value="internal">Internal Team</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" value={signupData.password} onChange={e => setSignupData({
                    ...signupData,
                    password: e.target.value
                  })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" value={signupData.confirmPassword} onChange={e => setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value
                  })} />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Image placeholder below the login module */}
        <div className="mt-6 flex justify-center">
          <div className="w-[300px] h-[120px] rounded bg-gray-800 flex items-center justify-center py-0 my-[18px]">
            <span className="text-gray-400 text-xs">Image Placeholder</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Demo Accounts:</p>
          <p>Supplier: supplier@example.com / password</p>
          <p>Internal: internal@example.com / password</p>
        </div>
      </div>
    </div>;
};
export default Login;