import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
export const LoginPage = () => {
  return <div className="flex min-h-screen bg-black">
      <div className="m-auto w-full max-w-md my-[202px]">
        {/* Logo placeholder replaced with actual image */}
        <div className="flex justify-center mb-6 my-[49px]">
          <img src="/logogrouplogin.png" alt="Group logo" className="w-52 h-auto my-[18px]" />
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
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Image below the login module */}
        <div className="mt-6 flex justify-center px-0">
          <img alt="Partner logos" src="/lovable-uploads/27ac72ce-dc02-4781-b1b6-02d810af0475.png" className="w-[600px] h-auto py-0 my-[18px]" />
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Demo Accounts:</p>
          <p>Supplier: supplier@example.com / password</p>
          <p>Internal: internal@example.com / password</p>
        </div>
      </div>
    </div>;
};