
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserIcon, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showNavigation = true
}) => {
  const {
    user,
    logout
  } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const navigateToAccount = () => {
    navigate('/account');
  };

  return <header className="bg-black text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logogrouplogin.png" alt="Rohlik Group Logo" className="h-12 mr-20" />
          
          {showNavigation && user && <nav className="hidden md:flex space-x-6">
              {user.role === 'supplier' && <>
                  <a href="/homepage" className="hover:text-gray-300">Home</a>
                  <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
                  <a href="/create" className="hover:text-gray-300">Create New</a>
                </>}
              
              {user.role === 'internal' && <>
                  <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
                  <a href="/review" className="hover:text-gray-300">Review</a>
                </>}
            </nav>}
        </div>
        
        <div className="flex items-center space-x-4">
          {user && <div className="flex items-center">
              <span className="mr-4 text-sm">
                {user.name} {user.company && `(${user.company})`} | {user.role === 'supplier' ? 'Supplier' : 'Internal Team'}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-white">
                      <AvatarFallback className="bg-black text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={navigateToAccount} className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={navigateToAccount} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" onClick={handleLogout} className="border-white text-white hover:text-black bg-black ml-2">
                Logout
              </Button>
            </div>}
        </div>
      </div>
    </header>;
};

export default Header;
