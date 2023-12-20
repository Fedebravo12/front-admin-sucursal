import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#333131',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#696969',
      disabled: '#C7D2D2',
      hint: '#22194D',
    },

    primary: {
      main: '#5A93C9',
      light: '#7BA8D3',
      dark: '#3E668C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9C67AD',
      light: '#AF85BD',
      dark: '#6D4879',
      contrastText: '#FFFFFF',

    },
    error: {
      main: '#D32F2F',
      light: '#DB5858',
      dark: '#932020',
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

  },
});



export default darkTheme;