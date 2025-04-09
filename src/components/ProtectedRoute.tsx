
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'supplier') {
      return <Navigate to="/homepage" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
