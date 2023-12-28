import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      
      default: '#EEEEEE',
      paper: '#E2E2E2',
    },
    text: {
      primary: '#1f0f0f',
      secondary: '#696969',
      disabled: '#868686',
      hint: '#BDBDBD',
      
    },

    primary: {
      main: '#6E8EA7',
      light: '#8BA4B8',
      dark: '#4D6374',
      contrastText: '#1f0f0f',

    },
    secondary: {
      main: '#9C67AD',
      light: '#AF85BD',
      dark: '#6D4879',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      light: '#349FDA',
      dark: '#015F92',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    // divider: '#141313',

    
    
    // ... otros colores y opciones
  },
  // ... otras opciones del tema
});



export default theme;