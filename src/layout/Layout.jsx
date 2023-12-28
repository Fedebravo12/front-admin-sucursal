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


const Layout = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Estado inicial en modo claro

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
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
};

export default Layout;
