import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Home from '../pages/Home';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';
import ListadoProductos from '../pages/Productos/ListadoProductos';
import ListadoPublicaciones from '../pages/Publicaciones/ListadoPublicaciones';
import AccesoDenegado from './AccesoDenegado';
import ProtectedRoute from './ProtectedRoute';
import Logout from '../components/User/Logout';
import ListadoSucursales from '../pages/Sucursales/ListadoSucursales';

const ProtectedHome = withAuthenticationRequired(Home);

const AppRouter = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;

  return (
    <Routes>
      {/* Protect all routes */}
      {/* <Route
        path="/*"
        element={
          isAuthenticated ? (
            // Render the protected route
            <Navigate to="/" />
          ) : (
            // Redirect to Auth0 login if not authenticated
            <Navigate to="/login" replace={true} />
          )
        }
      /> */}

      {/* Use loginWithRedirect as a function to avoid multiple redirects */}
      {/* <Route path="/login" element={loginWithRedirect} /> */}

      {/* <Route path="/" element={<ProtectedHome />} /> */}
      
      <Route path="/" element={<ProtectedRoute rolesRequired={[rol_admin,rol_sucursal]}><Home /></ProtectedRoute>} />
      <Route path="/productosadmin" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoProductos /></ProtectedRoute>} />
      <Route path="/categorias" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoCategoria /></ProtectedRoute>} />
      <Route path="/publicaciones" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoPublicaciones /></ProtectedRoute>} />
      <Route path="/publicacionessucursal" element={<ProtectedRoute rolesRequired={[rol_sucursal,rol_admin]}><ListadoPublicaciones/></ProtectedRoute>}/>
      {/* <Route path="/sucursales" element={<ProtectedRoute rolesRequired={[rol_sucursal]}><ListadoCategoria /></ProtectedRoute>} /> */}


      <Route path="/logout" element={<Logout />} />

      {/* <Route path="/about" element={<ProtectedRoute rolesRequired={[rol_admin]}><About /></ProtectedRoute>} /> */}
      <Route path="/sucursales" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoSucursales /></ProtectedRoute>} />
      <Route path="/acceso_denegado" element={<AccesoDenegado />} />
    </Routes>
  );
};

export default AppRouter;
