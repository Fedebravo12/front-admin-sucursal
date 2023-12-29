import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import 'animate.css'
import Home from './pages/Home'
import AppRouter from './router/AppRouter';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from './components/LoadingModal';
import { useEffect } from 'react';



// import './css/App.css'

function App() {

  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;

  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
  const { showLoadingModal, hideLoadingModal } = LoadingModal();

  useEffect(() => {
    if (isLoading) {
      showLoadingModal();
    } else {
      hideLoadingModal();
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, showLoadingModal, hideLoadingModal]);




  if(isAuthenticated && !isLoading && user.rol_usuario.includes(rol_admin,rol_sucursal)){
    return (
      <AppRouter />
    )
  }
 

}

export default App
