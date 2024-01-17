import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
    const { isAuthenticated, user} = useAuth0();
    const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
    const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;

    console.log(user)

    if (isAuthenticated && user.rol_usuario[0] == rol_admin) {
        return (
            <div>
                <h1>Home Admin</h1>
            </div>

        )
    }
    if (isAuthenticated && user.rol_usuario[0] == rol_sucursal) {
        return (
            <div>
                <h1>Home Sucursal</h1>
            </div>

        )
    }

}
export default Home;