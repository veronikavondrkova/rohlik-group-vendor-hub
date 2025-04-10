
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="m-auto w-full max-w-md my-[49px]">
        {/* Logo placeholder replaced with actual image */}
        <div className="flex justify-center mb-6 my-[49px]">
          <img 
            src="/logogrouplogin.png" 
            alt="Group logo" 
            className="w-20 h-auto my-[18px] drop-shadow-md hover:drop-shadow-xl transition-all duration-300" 
          />
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-white mb-4 text-6xl font-extrabold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Welcome!</h1>
          <p className="text-gray-400">Streamlined vendor asset creation & approval platform</p>
        </div>
        
        <Card className="w-full bg-gradient-to-b from-gray-100 to-white shadow-xl">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-b from-gray-200 to-gray-100">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Image below the login module */}
        <div className="mt-6 flex justify-center px-0">
          <img 
            alt="Partner logos" 
            src="/lovable-uploads/27ac72ce-dc02-4781-b1b6-02d810af0475.png" 
            className="w-[300px] h-auto py-0 my-[18px] drop-shadow-md" 
          />
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Demo Accounts:</p>
          <p>Supplier: supplier@example.com / password</p>
          <p>Internal: internal@example.com / password</p>
        </div>
      </div>
    </div>
  );
};
