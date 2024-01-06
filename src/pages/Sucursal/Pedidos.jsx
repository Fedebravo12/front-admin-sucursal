import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { Box, TextField, Typography } from "@mui/material";
import CardPedido from "../../components/Sucursal/CardPedido";
const Pedidos = () => {
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

    const descargarFactura = async (idPedido) => {
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
    
            };
    
            const response = await axios.get(`${apiLocalKey}/generarFactura/${idPedido}`, { headers });
    
            // La API envuelve la respuesta en un objeto, así que necesitamos acceder a la propiedad 'result' y luego a 'pdf'
            const pdfBase64 = response.data.result.pdf;
    
            // Convierto la cadena base64 a un Blob, llamo a la función base64ToBlob
            const pdfBlob = base64ToBlob(pdfBase64, 'application/pdf');
    
            // Creo un enlace URL para el archivo
            const url = window.URL.createObjectURL(pdfBlob);
            
            // Creo un enlace nuevo en el DOM para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Factura.pdf'); // Nombre del archivo para descargar
            document.body.appendChild(link);
            link.click();
    
            // Limpiar y remover el enlace del DOM
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
    
            hideLoadingModal();
        } catch (error) {
            console.error("Error al descargar la factura: ", error);
            hideLoadingModal();
        }
    };
    
    const base64ToBlob = (base64, mimeType) => {
        //llamo a la función atob para decodificar la cadena base64, atob es una función nativa de JavaScript
        const byteCharacters = atob(base64);
        //construyo un array de bytes a partir de la cadena decodificada
        const byteNumbers = new Array(byteCharacters.length);
        //recorro el array de bytes y los lleno con los valores de la cadena decodificada
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        //convierto el array de bytes en un int8Array que es una clase nativa de JavaScript para manejar arrays de bytes
        const byteArray = new Uint8Array(byteNumbers);
        //convierto el int8Array en un objeto Blob, que es el tipo de objeto que acepta la propiedad href del enlace
        return new Blob([byteArray], {type: mimeType});
    };    
    

    return (
        <div>
            <Box sx={{ position: 'relative', minHeight: '100vh' }}>
                {pedidos.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han realizado pedidos</Typography>
                    </Box>
                ) : (
                     <CardPedido pedidos={pedidos} descargarFactura={descargarFactura} />
                )}
            </Box>
        </div>
    );
}

export default Pedidos;
