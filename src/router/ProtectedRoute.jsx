import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/User/AuthContext';

const ProtectedRoute = ({ rolesRequired, children }) => {
  const { role, loading, initializationDone } = useContext(AuthContext);
  if (!initializationDone) return null;
  if (loading) return null;

  if (role && Array.isArray(rolesRequired) && rolesRequired.some(requiredRole => role.includes(requiredRole))) {
    return children;
  } else {
    return <Navigate to="/acceso_denegado" />;
  }
}

export default ProtectedRoute;