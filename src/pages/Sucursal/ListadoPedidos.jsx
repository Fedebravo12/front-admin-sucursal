import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { Box, TextField, Typography } from "@mui/material";
import TablaPedidos from "../../components/Sucursal/TablaPedido";
import Filter from "../../components/Sucursal/Filter"
import dayjs from 'dayjs';
import BotonReporte from "../../components/BotonReporte";


const ListadoPedidos = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [pedidos, setPedidos] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs());
    const [estadoEnvio, setEstadoEnvio] = useState(0);

    //defino las fechas minimas y maximas para mostrar en el calendario
    const minDate = dayjs(new Date(2022, 0, 1));
    const maxDate = dayjs();

    const estadosEnvio = [
        { id: import.meta.env.VITE_APP_ESTADO_PEDIDO_TODOS, descripcion: 'Todos' },
        { id: import.meta.env.VITE_APP_ESTADO_PEDIDO_INGRESADO, descripcion: 'Ingresado' },
        { id: import.meta.env.VITE_APP_ESTADO_PEDIDO_ENVIADO, descripcion: 'Enviado' },
        { id: import.meta.env.VITE_APP_ESTADO_PEDIDO_ENTREGADO, descripcion: 'Entregado' },
        { id: import.meta.env.VITE_APP_ESTADO_PEDIDO_SIN_ENVIO, descripcion: 'Retira en sucursal' },
    ];


    useEffect(() => {
        limpiarFiltros();
        getPedidos();
    }, []);

    const onChangeFechaSeleccionada = (fecha) => {
        setFechaSeleccionada(fecha);
    }

    const onChangeEstadoEnvio = (event) => {
        debugger;
        setEstadoEnvio(event.target.value);
    }

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

        } catch (error) {
            hideLoadingModal();
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
            hideLoadingModal();
        } catch (error) {
            hideLoadingModal();
        }
    }

    const buscarPedidos = async () => {
        const mes = parseInt(fechaSeleccionada.format('MM'));
        const anio = parseInt(fechaSeleccionada.format('YYYY'));
        const estado = parseInt(estadoEnvio);
        const body = {
            mes,
            anio,
            estado
        }
        try {
            debugger;
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await axios.post(apiLocalKey + "/filtrarPedidosSucursal", body, { headers });
            setPedidos(response.data.result);
            hideLoadingModal();
        }
        catch (error) {
            hideLoadingModal();

        }
    }

    const limpiarFiltros = async () => {
        setFechaSeleccionada(dayjs());
        setEstadoEnvio(0);
        getPedidos();
    }

    const generarReporte = async () => {
        // const mes = parseInt(fechaSeleccionada.format('MM'));
        // const anio = parseInt(fechaSeleccionada.format('YYYY'));
        // const estado = parseInt(estadoEnvio);
        // const body = {
        //     mes,
        //     anio,
        //     estado
        // }
        // try {
        //     debugger;
        //     showLoadingModal();
        //     const token = localStorage.getItem('token');
        //     const headers = {
        //         Authorization: `Bearer ${token}`
        //     };
        //     const response = await axios.post(apiLocalKey + "/generarReportePedidosSucursal", body, { headers });
        //     hideLoadingModal();
        // }
        // catch (error) {
        //     hideLoadingModal();

        // }
    }




    return (
        <Box style={{ position: 'relative' }} sx={{ mr: 2, ml: 2, height: 1, mb: 2 }}>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '30px' }}>
                Listado de Pedidos
            </Typography>

            <Filter fechaSeleccionada={fechaSeleccionada} changeFecha={onChangeFechaSeleccionada} minDate={minDate} maxDate={maxDate} buscar={buscarPedidos} limpiar={limpiarFiltros} estadosEnvio={estadosEnvio} changeEstadoEnvioFilter={onChangeEstadoEnvio} estadoEnvio={estadoEnvio} />


            {pedidos.length === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se encontraron pedidos</Typography>
                </Box>
            ) : (
                <>
                    <BotonReporte onClick={generarReporte} />

                    <TablaPedidos pedidos={pedidos} onHandleTransition={handleTransition} />
                </>
            )}
        </Box>
    );
};
export default ListadoPedidos;
