import { useContext } from "react";
import { AuthContext } from "../components/User/AuthContext";
import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
  
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;
  const { role } = useContext(AuthContext);

  console.log(role);
    return (
        role.includes(rol_admin)? <Navigate to="/admin" /> : <Navigate to="/sucursal" />
        
    )
}
export default Home;