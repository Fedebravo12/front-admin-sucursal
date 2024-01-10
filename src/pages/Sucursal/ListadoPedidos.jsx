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

    useEffect(() => {
        getPedidos();
    }, []);

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
        <Box sx={{ ml: 1, height:1 }}>
            <TableCollapsibleRow pedidos={pedidos} />
        </Box>

    );
}

export default ListadoPedidos;
