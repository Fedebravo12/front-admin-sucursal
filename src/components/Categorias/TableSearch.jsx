import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {

    GridActionsCellItem
  } from '@mui/x-data-grid';

export default function TableSearch() {

 

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

    const myColumns = [
        //el field debe ser el mismo nombre de la propiedad del objeto, cada campo es una columna
        // { field: 'idCategoria', headerName: 'Id', width: 500 },
        { field: 'descripcion', headerName: 'Descripción', width: 700 },
        { field: 'cantidadProductos', headerName: 'Cantidad Productos', width: 700 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                //   onClick={}
                  color="inherit"
                />,
                <GridActionsCellItem
                // icon={<DeleteIcon sx={{color:'red'}} />}
                icon={<DeleteIcon />}
                  label="Delete"
                //   onClick={}
                  color="inherit"
                />,
              ];
            },
          },

        // Define más columnas según sea necesario
    ];


    return (
        <Box sx={{ height: 600, width: 1, display:'grid' }}>
            <DataGrid
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                pageSizeOptions={[10, 20, 30]}
                rows={categorias}  // Usa tus propios datos aquí
                columns={myColumns}  // Usa tus propias columnas aquí
                getRowId={(row) => row.idCategoria}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                components={{ Toolbar: GridToolbar}}
                
                
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,

                    },
                }
                
                
                
            }
            localeText={{
                // Personaliza el mensaje de selección aquí
                noRowsLabel: 'No hay filas',
                footerPaginationRowsPerPage: 'Filas por página:',
                footerPaginationPage: 'Página:',
                footerTotalRows: 'Total de filas:',
                // Cambia el mensaje de selección aquí
                selectionFooter: (count) => `${count} filas seleccionadas`,
            }}
            />
        </Box>
    );
}
