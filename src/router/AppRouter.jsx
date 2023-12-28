import { Routes,Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';
import ListadoProductos from '../pages/Productos/ListadoProductos';
import ListadoPublicaciones from '../pages/Publicaciones/ListadoPublicaciones';


const AppRouter = () => {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productosadmin" element={<ListadoProductos/>} />
                <Route path="/categorias" element={<ListadoCategoria />} />
                <Route path="/publicacionessucursal" element={<ListadoPublicaciones/>}/>
                {/* <Route path="*" element={ <Navigate to={"/home"}/> } /> */}
            </Routes>
           
        </div>
    )
}

export default AppRouter;