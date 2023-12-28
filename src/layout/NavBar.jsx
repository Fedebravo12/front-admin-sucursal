import * as React from 'react';
import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Card, Grid } from '@mui/material';
import ThemeContext from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBasket,
  ShoppingCart,
  Favorite,
  History,
  AccountCircle,
  Help,
  Store,
  BarChart,
  Storefront,
  RateReview,
  Settings,
} from '@mui/icons-material';



const drawerWidth = 260;




const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh', // Alto mínimo para ocupar toda la altura de la pantalla

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




//componente que se encarga de mostrar el menu lateral


const NavBar = ({ children, themeSwitch }) => {


  const navigate = useNavigate();

  const handleNavigation = (route) => {
    debugger;
    navigate(route);
    //este metodo es para cerrar el menu cuando se hace click en un item
    // handleDrawerClose();
  }

  const theme = useTheme();

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = React.useState(true);




  // opciones de menu del proveedor, armo un arreglo con el Nombre que muestra, la url a la que redirecciona y el icono que muestra
  const providerOptions = [
    { name: 'Gestión de Productos', route: '/manage-products', icon: <Store /> },
    { name: 'Estadísticas de Ventas', route: '/sales-analytics', icon: <BarChart /> },
    { name: 'Inventario', route: '/inventory', icon: <Storefront /> },
  ];


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#FACA05' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <ResponsiveAppBar></ResponsiveAppBar>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* el theme direction es para que el icono de la flecha cambie de lado cuando se abre el menu */}
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* El divider me separa las opciones de menu del cliente de las del proveedor */}
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top', // Centra los elementos verticalmente
            mt:5,
            height: '100%', // Ocupa todo el alto disponible
          }}
        >
          <List>
            {/* Recorro el arreglo de opciones de menu del proveedor y por cada una creo un item de la lista */}
            {providerOptions.map((option) => (
              <ListItem key={option.name} disablePadding sx={{ display: 'block', mt:1 }}>
                <ListItemButton onClick={() => handleNavigation(option.route)}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>

              </ListItem>
            ))}
          </List>
        </Box>



      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* {!isLoading && ( */}
        <Card sx={{
          backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5',
          borderRadius: 2,
          padding: '20px 10px',
          display: 'flex',
          flexDirection: 'column', // Asegura que los hijos se apilen verticalmente
          flexGrow: 1, // Permite que la Card se expanda
          minHeight: '80vh', // Evita que la Card se colapse
        }}>
          <Grid spacing={2} justifyContent="center" sx={{ flexGrow: 1, maxWidth: 1, mb: 10 }}>
            {children}
          </Grid>
        </Card>

        {/* )} */}

      </Box>

    </Box>




  );
}

export default NavBar;
