import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import format from 'date-fns/format';
import TablePagination from '@mui/material/TablePagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TableFooter } from '@mui/material';
import { useState } from 'react';

// Estilos personalizados
const headerCellStyle = {
  fontWeight: 'bold',
};

const tableContainerStyle = {
  border: '1px solid rgba(224, 224, 224, 1)', // Borde fino y gris
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // Sombra sutil
  borderRadius: '4px', // Bordes redondeados
};

// Estilos para las celdas de la tabla
const cellStyle = {
  borderBottom: '1px solid rgba(224, 224, 224, 1)', // Borde fino en la parte inferior de cada celda
};


const numericCellStyle = {
  textAlign: 'right',
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
}

const formatDate = (date) => {
  return date ? format(new Date(date), "dd/MM/yyyy") : "";
};


// const handleTransition = async (idEstadoEnvio, idPedido) => {
//   debugger;
//   try {
//     const apiLocalKey = import.meta.env.VITE_APP_API_KEY;

//       const token = localStorage.getItem('token');
//       const headers = {
//           Authorization: `Bearer ${token}`
//       };
//       const body = {
//           idEstadoEnvio,
//           idPedido
//       }
//       const response = await axios.put(apiLocalKey + "/CambiarEstadoEnvio", body, { headers });
//       setReload(!reload);
//       console.log(response.data.result);

//   } catch (error) {
//       console.error(error);
//   }
// }



function Row(pedidos , onHandleTransition) {
  console.log(import.meta.env.VITE_APP_ESTADO_PEDIDO_INGRESADO)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const openOptions = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setSelectedId(idPedido);
  };
  const handleMenuClick = (idEstadoEnvio, idPedido) => {
    debugger;
    onHandleTransition(idEstadoEnvio, idPedido);
    handleClose();
};

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };
  const { pedido } = pedidos;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ backgroundColor: '#EEEEEE' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {pedido.orden_MercadoPago}
        </TableCell>
        <TableCell>{formatDate(pedido.fecha)}</TableCell>
        <TableCell>{pedido.emailUsuario}</TableCell>
        <TableCell>
          <div>
            {pedido.estadoEnvio}
            {pedido.idEstadoEnvio != null && pedido.idEstadoEnvio != import.meta.env.VITE_APP_ESTADO_PEDIDO_ENTREGADO && (
              <IconButton
                sx={{ ml: 0.5 }}
                aria-label="more"
                onClick={(event) => handleClick(event)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={openOptions}
            onClose={handleClose}
          >
            {pedido.idEstadoEnvio == import.meta.env.VITE_APP_ESTADO_PEDIDO_INGRESADO && (
              <MenuItem onClick={() => handleMenuClick(parseInt(import.meta.env.VITE_APP_ESTADO_PEDIDO_ENVIADO), pedido.id)}>
                Marcar como Enviado
              </MenuItem>
            )}
            {pedido.idEstadoEnvio == import.meta.env.VITE_APP_ESTADO_PEDIDO_ENVIADO && (
              <MenuItem onClick={() => handleMenuClick(parseInt(import.meta.env.VITE_APP_ESTADO_PEDIDO_ENTREGADO), pedido.id)}>
                Marcar como Entregado
              </MenuItem>
            )}          </Menu>
        </TableCell>

        <TableCell style={numericCellStyle} sx={{ fontWeight: 'bold' }}>
          {formatPrice(pedido.total)}

        </TableCell>



      </TableRow>
      <TableRow sx={{ backgroundColor: 'white' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {/* <TableCell colSpan={6}> */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle del pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Producto</TableCell>
                    <TableCell style={headerCellStyle}>Cantidad</TableCell>
                    <TableCell align='center' style={headerCellStyle}>Precio</TableCell>
                    <TableCell align='center' style={headerCellStyle}>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.detallePedido.map((detalle) => (
                    <TableRow key={detalle.id}>
                      <TableCell component="th" scope="row">
                        {detalle.nombreProducto}
                      </TableCell>
                      <TableCell>{detalle.cantidad}</TableCell>
                      <TableCell style={numericCellStyle}>{formatPrice(detalle.precio)}</TableCell>
                      <TableCell style={numericCellStyle}>{formatPrice(detalle.subTotal)}</TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = ({pedidos, onHandleTransition}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Cambiar página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={headerCellStyle} />
            <TableCell style={headerCellStyle}>#Pedido</TableCell>
            <TableCell style={headerCellStyle}>Fecha Pedido</TableCell>
            <TableCell style={headerCellStyle}>Email Usuario</TableCell>
            <TableCell style={headerCellStyle}>Estado Envio</TableCell>
            <TableCell style={headerCellStyle}>Total</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.pedidos
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((pedido) => (
              <Row key={pedido.id} pedido={pedido} onHandleTransition={onHandleTransition}/> // Pasando handleTransition como prop />
            ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow backgroundColor={'white'}>
            <TableCell colSpan={6} >
              <Typography variant="body2" color="text.secondary" align='right' nav>
                Total: {formatPrice(pedidos.pedidos.reduce((total, pedido) => total + pedido.total, 0))}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      <TablePagination
        sx={{ backgroundColor: '#white' }}
        rowsPerPageOptions={[10, 20, 25, 50]}
        component="div"
        count={pedidos.pedidos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
        labelRowsPerPage="Filas por página:"
      />
    </TableContainer>
  );
}
export default CollapsibleTable;
