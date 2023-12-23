import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {

    GridActionsCellItem
  } from '@mui/x-data-grid';

  const TablaProductos = ({ productos, onDelete, detalleProducto }) => {

    const myColumns = [
        //el field debe ser el mismo nombre de la propiedad del objeto, cada campo es una columna
        // { field: 'idCategoria', headerName: 'Id', width: 500 },
        { field: 'nombre', headerName: 'Nombre', width: 400, flex: 2 },
        // { field: 'descripcion', headerName: 'Descripción', width: 400 },
        { field: 'precio', headerName: 'Precio', width: 400 ,flex: 2, valueFormatter: (params) => `$${params.value.toFixed(2)}`, // Formatea el valor con el signo de peso y dos decimales
      },
        { 
          field: 'idCategoriaNavigation', // Cambia el campo a 'idCategoriaNavigation'
          headerName: 'Categoria', 
          width: 400,
          flex: 2,
          valueGetter: (params) => params.row.idCategoriaNavigation.nombre, // Accede a la propiedad 'nombre' de 'idCategoriaNavigation'
      },
      // {field: 'descripcion' , headerName: 'Descripción', width: 400, flex: 2}
      //   ,
      //   {field: 'urlImagen' , headerName: 'Imagen', width: 400, flex: 2},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 50,
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={() => detalleProducto(id)} // Llamar a la función pasando el ID
                  color="inherit"
                />,
                <GridActionsCellItem
                // icon={<DeleteIcon sx={{color:'red'}} />}
                icon={<DeleteIcon />}
                  label="Delete"
                  color="inherit"
                  onClick={() => onDelete(id)} // Llamar a la función pasando el ID

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
                rows={productos}  // Usa tus propios datos aquí
                columns={myColumns}  // Usa tus propias columnas aquí
                getRowId={(row) => row.idProducto}
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
};

export default TablaProductos;
