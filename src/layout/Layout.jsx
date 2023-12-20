import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import darkTheme from './darkTheme';
import NavBar from './NavBar';
import ThemeContext from './ThemeContext';
import ResponsiveAppBar from './ResponsiveAppBar';



const Layout = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Estado inicial en modo claro

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
        <CssBaseline />
        <NavBar>
          {children}
        </NavBar>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;
