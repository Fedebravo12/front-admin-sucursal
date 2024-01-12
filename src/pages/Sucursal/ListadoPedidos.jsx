import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { Box, TextField, Typography } from "@mui/material";
import TableCollapsibleRow from "../../components/Sucursal/TablaPedido";
import CardPedido from "../../components/Sucursal/CardPedido";
const ListadoPedidos = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [pedidos, setPedidos] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getPedidos();
    }, [reload]);

    const handleTransition = async (idEstadoEnvio, idPedido) => {
        debugger;
        try {

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const body = {
                idEstadoEnvio,
                idPedido
            }
            const response = await axios.put(apiLocalKey + "/CambiarEstadoEnvio", body, { headers });
            setReload(!reload);
            console.log(response.data.result);

        } catch (error) {
            console.error(error);
        }
    }


    const getPedidos = async () => {
        try {
            debugger;
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(apiLocalKey + "/getPedidosSucursal", { headers });
            setPedidos(response.data.result);
            console.log(response.data.result);
            hideLoadingModal();
        } catch (error) {
            console.error(error);
            hideLoadingModal();
        }
    }


    return (
        // <Box sx={{ mr: 2, ml: 2, height: 1, mt: 5, mb: 5 }}>

        <Box style={{ position: 'relative' }} sx={{ mr: 2, ml: 2, height: 1, mb: 2 }}>

            <Typography variant="h5" gutterBottom style={{ marginTop: '30px', marginBottom: '50px' }}>
                Listado de Pedidos
            </Typography>

            <TableCollapsibleRow pedidos={pedidos} onHandleTransition={handleTransition} />
        </Box>

    );
}

export default ListadoPedidos;
