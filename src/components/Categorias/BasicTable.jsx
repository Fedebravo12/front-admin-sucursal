import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function BasicTable() {
  const [categorias, setCategorias] = useState([]);
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY

  useEffect(() => {
    GetCategorias()
  }
    , [])


  const GetCategorias = async () => {
    debugger;
    try {
      const res = await axios.get(apiLocalKey + '/categorias')
      setCategorias(res.data.result.data)
      console.log(res.data.result.data)
    } catch (error) {
      console.log(error)
    }
  }



  if (categorias.length > 0) {
    return (
      <div>

        <h2>Categorias</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Descripcion</TableCell>
                <TableCell align="right">Cant. Productos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow
                  key={categoria.idCategoria}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {categoria.idCategoria}
                  </TableCell>
                  <TableCell align="right">{categoria.descripcion}</TableCell>
                  <TableCell align="right">{categoria.cantidadProductos}</TableCell>

                </TableRow>
              )
              )}
            </TableBody>
          </Table>

        </TableContainer>
      </div>
    );
  } else {
    return (
      <div>

        <h1>No hay categorias...</h1>
      </div>
    )
  }

}
