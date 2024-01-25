import { useEffect, useState } from "react";
import LoadingModal from "../LoadingModal";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { ca } from "date-fns/locale";
import { Box, Typography } from "@mui/material";

function GraficoVentasSucursal() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const { showLoadingModal, hideLoadingModal, isLoading } = LoadingModal();
  const [months, setMonths] = useState([]);
  const [cantidadVentas, setCantidadVentas] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [year, setYear] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    showLoadingModal();
    const last6Months = Array.from({ length: 6 }, (_, index) => {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - index);
      const year = month.getFullYear();
      return month.getMonth() + 1 + '/' + month.getFullYear();
    });

    const reversedMonths = [...last6Months].reverse();
    setMonths(reversedMonths);
    hideLoadingModal();
    
  }, []); // Empty dependency array

  

useEffect(() => {
  if (!isLoading && months.length > 0) {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        // Use map to create an array of promises for each API call
        const promises = months.map(async (date) => {
          const dateParts = date.split('/');
          const month = dateParts[0];
          const year = dateParts[1];
          const body = { mes: month, anio: year, estado: 0 };
          const response = await axios.post(apiLocalKey + '/filtrarPedidosSucursal', body, options);
          const cantidadVentasData = response.data.result.length;
          return { [`${month}`]: cantidadVentasData };
        });
    
        // Wait for all promises to resolve with Promise.all
        const ventasPerMonth = await Promise.all(promises);
    
        // Update state with the result of all promises
        setCantidadVentas(transformDataForBarChart(ventasPerMonth));
      } catch (error) {
        console.log(error);
      } finally {
        hideLoadingModal();
        
      }
    };
    
    loadData();
  }
  }, [isLoading , months]);
  

  const transformDataForBarChart = (ventasPerMonth) => {
    return ventasPerMonth.map((venta) => Object.entries(venta)[0]).map(([month, cantidadVentas]) => ({
      x: `${getMonthName(parseInt(month))} ${year}`,
      y: cantidadVentas,
    }));
  };
  
  const getMonthName = (monthNumber) => {
    const monthsArray = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return monthsArray[monthNumber - 1];
  };
  return (
    
    cantidadVentas.length > 0 ? (
      <>  
      <Box style={{ position: 'relative' }} sx={{ ml:2}}>
      <Typography variant="h5" component="h2" gutterBottom style={{marginTop: '30px', marginBottom: '30px' }}>
      Ventas por mes
  </Typography>
      <BarChart
      xAxis={[{ scaleType: "band", dataKey: "x", tickFormatter: getMonthName }]}
        series={[{ type: 'bar', dataKey: 'y' }]}
        dataset={cantidadVentas}
        width={1500}
        height={600}
        style={{ marginTop: '100px' , marginLeft: '100px', flex: '1', alignItems: 'center'}}
      />
      </Box>
      </>
    

    ) : (
      <div>Loading data...</div>
    )
  );
  
}

export default GraficoVentasSucursal;