
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold mr-8">Rohlik Brand Hub</h1>
          
          {showNavigation && user && (
            <nav className="hidden md:flex space-x-6">
              {user.role === 'supplier' && (
                <>
                  <a href="/homepage" className="hover:text-gray-300">Home</a>
                  <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
                  <a href="/create" className="hover:text-gray-300">Create New</a>
                </>
              )}
              
              {user.role === 'internal' && (
                <>
                  <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
                  <a href="/review" className="hover:text-gray-300">Review</a>
                </>
              )}
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center">
              <span className="mr-4 text-sm">
                {user.name} {user.company && `(${user.company})`} | {user.role === 'supplier' ? 'Supplier' : 'Internal Team'}
              </span>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
