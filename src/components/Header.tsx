import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  return <header className="backdrop-blur-sm text-white py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/30 border-b border-white/10 bg-[#061a02]/60">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/rohlikgroupbar.png" alt="Rohlik Group Logo" className="h-12 mr-20 drop-shadow-md hover:drop-shadow-xl transition-all duration-300" />
          
          {showNavigation && user && <nav className="hidden md:flex space-x-6">
              {user.role === 'supplier' && <>
                  <a href="/homepage" className="hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Home</a>
                  <a href="/dashboard" className="hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Dashboard</a>
                  <a href="/create" className="hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Create New</a>
                </>}
              
              {user.role === 'internal' && <>
                  <a href="/dashboard" className="hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Dashboard</a>
                  <a href="/review" className="hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Review</a>
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
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10 transition-colors">
                    <Avatar className="h-10 w-10 border border-white/50 shadow-inner">
                      <AvatarFallback className="bg-gradient-to-br from-gray-800 to-black text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-md border border-gray-700 shadow-xl" align="end">
                  <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={navigateToAccount} className="cursor-pointer hover:bg-white/10 text-gray-200">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={navigateToAccount} className="cursor-pointer hover:bg-white/10 text-gray-200">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-white/10 text-gray-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" onClick={handleLogout} className="border-white/50 ml-2 bg-gradient-to-b from-white to-gray-100 hover:from-gray-100 hover:to-white shadow-md hover:shadow-lg transition-all duration-300 bg-slate-50 text-[#061700]">
                Logout
              </Button>
            </div>}
        </div>
      </div>
    </header>;
};
export default Header;