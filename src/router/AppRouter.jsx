import React, { useContext, useEffect } from 'react';
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
import GraficoVentasAdministrador from '../components/Ventas/GraficoVentasAdministrador';
import ListadoPedidos from '../pages/Sucursal/ListadoPedidos';
import GraficoVentasSucursal from '../components/Ventas/GraficoVentasSucursal';
import { AuthContext } from '../components/User/AuthContext';
import { redirect } from 'react-router-dom';

const AppRouter = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;
  const { role } = useContext(AuthContext);


  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute rolesRequired={[rol_admin, rol_sucursal]}><Home/></ProtectedRoute> }/>
      <Route path="/productosadmin" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoProductos /></ProtectedRoute>} />
      <Route path="/categorias" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoCategoria /></ProtectedRoute>} />
      <Route path="/publicaciones" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoPublicaciones /></ProtectedRoute>} />
      <Route path="/publicacionessucursal" element={<ProtectedRoute rolesRequired={[rol_sucursal]}><ListadoPublicaciones/></ProtectedRoute>}/>
      {/* <Route path='/ventas' element={<ProtectedRoute rolesRequired={[rol_admin]}><GraficoVentas/></ProtectedRoute>} /> */}
      {/* <Route path="/sucursales" element={<ProtectedRoute rolesRequired={[rol_sucursal]}><ListadoCategoria /></ProtectedRoute>} /> */}
      <Route path="/pedidosSucursal" element={<ProtectedRoute rolesRequired={[rol_sucursal]}>< ListadoPedidos/></ProtectedRoute>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/sucursales" element={<ProtectedRoute rolesRequired={[rol_admin]}><ListadoSucursales /></ProtectedRoute>} />
      <Route path="/sucursal" element={<ProtectedRoute rolesRequired={[rol_sucursal]}><GraficoVentasSucursal/></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute rolesRequired={[rol_admin]}><GraficoVentasAdministrador /></ProtectedRoute>} />
      <Route path="/acceso_denegado" element={<AccesoDenegado />} />
    </Routes>
  );
};

export default AppRouter;
