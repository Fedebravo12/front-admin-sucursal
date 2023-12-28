import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';




const settings = [
  { id: 1, name: 'Cuenta', route: '/cuenta' },
  { id: 2, name: 'Dashboard', route: '/dashboard' },
  { id: 3, name: 'Cerrar sesión', route: '/logout' }
]



// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container sx={{backgroundColor:'#FACA05'}} maxWidth="xl">
      <Toolbar disableGutters>

        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: '55px',
              width: 'auto',
              display: 'block' // <-- Establece tamaños máximos para garantizar uniformidad
            }}
          />
        </Link>















        <Box sx={{ flexGrow: 0, position:'absolute', right:0 }}>

          <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 3 }}>
                  {/* en el src del avatar va la imagen del usuario, por ahora es una imagen de prueba, despues va a ser la imagen del usuario logueado */}
                  <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link to={setting.route.toLowerCase()} style={{ color: 'inherit', textDecoration: 'none' }}>

                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>

                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              </Link>

            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container >
  );
}
export default ResponsiveAppBar;
