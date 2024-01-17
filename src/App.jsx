
import Button from "@mui/material/Button";
import 'animate.css'
import AppRouter from './router/AppRouter';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from './components/LoadingModal';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import es from 'dayjs/locale/es';



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




  if (isAuthenticated && !isLoading && (user.rol_usuario.includes(rol_admin) || user.rol_usuario.includes(rol_sucursal))) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>

        <AppRouter />
      </LocalizationProvider>

    )
  }


}

export default App
