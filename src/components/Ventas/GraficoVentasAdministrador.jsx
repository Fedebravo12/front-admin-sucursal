
import axios from 'axios';
import { useEffect, useState } from 'react'
import LoadingModal from '../LoadingModal';
import { BarChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

function GraficoVentasAdministrador() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const { showLoadingModal, hideLoadingModal } = LoadingModal();
  const [cantidadVentas, setCantidadVentas] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        showLoadingModal();
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
    , []);


  const transformDataForBarChart = (data) => {
    return Object.entries(data).map(([sucursal, y]) => ({
      x: sucursal,
      y: y,
    }));
  };


  return (
    cantidadVentas.length > 0 & cantidadVentas != undefined ? (
      <>


        <Box style={{ position: 'relative' }} sx={{ ml: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center' }}>
            Cantidad de ventas por sucursal durante el mes actual
          </Typography>
          <BarChart
            xAxis={[{ scaleType: "band", dataKey: 'x' }]}
            series={[{ type: 'bar', dataKey: 'y', color: '#c4c6f5' }]}
            dataset={cantidadVentas}
            width={1300}
            height={600}

          />
        </Box>
      </>) : (<div></div>)

  )
}

export default GraficoVentasAdministrador