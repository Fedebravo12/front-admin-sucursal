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

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
}
const formatDate = (date) => {
  return date ? format(new Date(date), "dd/MM/yyyy") : "";
};
function Row(pedidos) {
  const { pedido } = pedidos;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <TableCell >{formatDate(pedido.fecha)}</TableCell>
        <TableCell >{pedido.emailUsuario}</TableCell>
        <TableCell >{pedido.estadoEnvio}</TableCell>
        <TableCell >
          {formatPrice(pedido.total)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell >Precio</TableCell>
                    <TableCell >Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.detallePedido.map((detalle) => (
                    <TableRow key={detalle.id}>
                      <TableCell component="th" scope="row">
                        {detalle.nombreProducto}
                      </TableCell>
                      <TableCell>{detalle.cantidad}</TableCell>
                      <TableCell >{formatPrice(detalle.precio)}</TableCell>
                      <TableCell >
                        {formatPrice(detalle.subTotal)}
                      </TableCell>
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



export default function CollapsibleTable(pedidos) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#Pedido</TableCell>
            <TableCell>Fecha Pedido</TableCell>
            <TableCell >Email Usuario</TableCell>
            <TableCell >Estado Envio</TableCell>
            <TableCell >Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.pedidos.map((pedido) => (
            <Row key={pedido.id} pedido={pedido} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}