import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from '../../components/LoadingModal';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [initializationDone, setInitializationDone] = useState(false);
  const { isAuthenticated, getIdTokenClaims, isLoading, user } = useAuth0();
  const { showLoadingModal, hideLoadingModal } = LoadingModal();

  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;
  const rol_client = import.meta.env.VITE_APP_ROLE_CLIENT;
  const url_app_cliente = import.meta.env.VITE_APP_URL_APP_CLIENTE;

  const fetchTokenAndRole = async () => {
    try {
      showLoadingModal();
      

      if (!isLoading && isAuthenticated) {
        const tokenClaims = await getIdTokenClaims();
        debugger;

        if (tokenClaims.rol_usuario.length === 0 || tokenClaims.rol_usuario.includes(rol_client)) {
          window.location.href = url_app_cliente;

        }



        setUserToken(tokenClaims.__raw);
        localStorage.setItem('token', tokenClaims.__raw);
        setUserRole(tokenClaims.rol_usuario);
        setUserImage(tokenClaims.picture);

        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // const response = await axios.post(
        //   apiLocalKey + '/cargarUsuario',
        //   { nombreUsuario: user.name, email: user.email, imagenUsuario: user.picture },
        //   {
        //     headers: headers,
        //   }
        // );

        setInitializationDone(true);
      } else if (!isLoading && !isAuthenticated) {
        localStorage.removeItem('token');
        localStorage.setItem('sucursalSeleccionada', 1);
        localStorage.removeItem('carrito');
        hideLoadingModal();
        setInitializationDone(true);
      }
    } catch (error) {
      console.error('Error al obtener el token y el rol:', error);
    } finally {
      hideLoadingModal();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (isLoading) {
        showLoadingModal();
      } else {
        await fetchTokenAndRole();
      }
    };

    initializeAuth();
  }, [isAuthenticated, getIdTokenClaims, isLoading]);

  return (
    <AuthContext.Provider value={{ token: userToken, role: userRole, loading: isLoading, initializationDone }}>
      {children}
    </AuthContext.Provider>
  );
};
