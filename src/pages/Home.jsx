import { useContext } from "react";
import { AuthContext } from "../components/User/AuthContext";
import { Navigate } from "react-router-dom";


const Home = () => {
  const { role } = useContext(AuthContext);
    return (
        role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/sucursal" />
        
    )
}
export default Home;