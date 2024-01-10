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


// Estilos personalizados
const headerCellStyle = {
  fontWeight: 'bold',
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

function Row(pedidos) {
  const { pedido } = pedidos;
  const [open, setOpen] = React.useState(false);

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
        <TableCell>{pedido.estadoEnvio}</TableCell>
        <TableCell style={numericCellStyle} sx={{ fontWeight: 'bold' }}>
          {formatPrice(pedido.total)}

        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: 'white' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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

export default function CollapsibleTable(pedidos) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    <TableContainer component={Paper}>
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
              <Row key={pedido.id} pedido={pedido} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
