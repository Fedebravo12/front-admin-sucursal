import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import darkTheme from './darkTheme';
import NavBar from './NavBar';
import ThemeContext from './ThemeContext';
import Box from '@mui/material/Box';
import Footer from './Footer';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from '../components/LoadingModal';
import { useEffect } from 'react';
import { is } from 'date-fns/locale';


const Layout = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
  const { showLoadingModal, hideLoadingModal } = LoadingModal();
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;


  const [isDarkTheme, setIsDarkTheme] = useState(false); // Estado inicial en modo claro

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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




  if(isAuthenticated && !isLoading && (user.rol_usuario.includes(rol_admin) || user.rol_usuario.includes(rol_sucursal))) {    return (
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
            <NavBar>
              {children}
            </NavBar>
          </Box>
  
          <Box sx={{ flex: '1 0 auto' }} /> {/* Este Box empujará el footer hacia abajo */}
          <Footer />
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  }


};

export default Layout;
