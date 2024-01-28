
import axios from 'axios';
import  { useEffect, useState } from 'react'
import LoadingModal from '../LoadingModal';
import { BarChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

function GraficoVentasAdministrador() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const { showLoadingModal, hideLoadingModal, isLoading } = LoadingModal();
  const [cantidadVentas, setCantidadVentas] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(apiLocalKey + '/cantidadPedidosPorSucursal', options);
        const cantidadVentasData = response.data.result;
        setCantidadVentas(transformDataForBarChart(cantidadVentasData));
      }

      catch (error) {
        console.log(error);
      } finally {
        hideLoadingModal();
      }
    }
    loadData();
  }
    , []); // Empty dependency array


    const transformDataForBarChart = (data) => {
      return Object.entries(data).map(([sucursal, y]) => ({
        x: sucursal,
        y: y,
      }));
    };
    

 console.log(cantidadVentas)
  return (
    cantidadVentas.length >0 & cantidadVentas != undefined ? (
      <>
      <Box style={{ position: 'relative' }} sx={{ ml:2}}>
      <Typography variant="h5" component="h2" gutterBottom style={{marginTop: '30px', marginBottom: '30px' }}>
      Cantidad de ventas por sucursal durante el mes actual
  </Typography>
    <BarChart
    xAxis={[{scaleType: "band", dataKey: 'x' }]}
    series={[{ type: 'bar', dataKey: 'y' }]}
    dataset={cantidadVentas}
    width={1500}
    height={600}
      
    />
    </Box>
    </>) : (<div>Cargando</div>)
    
  )
}

export default GraficoVentasAdministrador