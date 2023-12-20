import { Routes,Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';


const AppRouter = () => {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<div>
                <h1>Productos</h1>
                <p>Esto es la pagina de productos</p>
            </div>} />
                <Route path="/categorias" element={<ListadoCategoria />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="*" element={ <Navigate to={"/home"}/> } /> */}
            </Routes>
        </div>
    )
}

export default AppRouter;