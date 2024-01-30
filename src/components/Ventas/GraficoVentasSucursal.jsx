import { useEffect, useState } from "react";
import LoadingModal from "../LoadingModal";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function GraficoVentasSucursal() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const { showLoadingModal, hideLoadingModal, isLoading } = LoadingModal();
  const [cantidadVentas, setCantidadVentas] = useState([]);

  useEffect(() => {
    showLoadingModal();
    const loadData = async () => {
      showLoadingModal();
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${apiLocalKey}/getPedidosSucursalUltimosMeses`, options);
        const ventasPerMonth = response.data.result; // Ajusta esta línea según la estructura de tu respuesta
        const ventasPerMonthTransformed = transformDataForBarChart(ventasPerMonth);
        setCantidadVentas(ventasPerMonthTransformed);

      } catch (error) {
        console.error(error);
      } finally {
        hideLoadingModal();
      }
    };

    loadData();
  }, []); // Dependencia vacía para que se ejecute una vez

  const transformDataForBarChart = (ventasPerMonth) => {
    return Object.entries(ventasPerMonth).map(([month, sales]) => ({
      x: month,
      y: sales,
    }));
  };

  return (
    <Box style={{ position: 'relative' }} sx={{ ml: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center' }}>
        Ventas de los últimos 6 meses
      </Typography>
      {cantidadVentas.length > 0 ? (
        <BarChart
          xAxis={[{ scaleType: "band", dataKey: "x" }]}
          series={[{ type: 'bar', dataKey: 'y', color: '#c4c6f5' }]}
          dataset={cantidadVentas}
          width={1300}
          height={600}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default GraficoVentasSucursal;
