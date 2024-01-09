import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { esES } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import app from '../../css/app.css';

import {

  GridActionsCellItem
} from '@mui/x-data-grid';

const TablaPublicaciones = ({ publicaciones, detallePublicacion }) => {

  const myColumns = [

    {
      field: 'urlImagen',
      headerName: '',
      width: 100,
      flex: 0.5,
      renderCell: (params) => (
        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
          <img
            src={params.row.idProductoNavigation.urlImagen}
            alt={`Imagen de ${params.row.idProductoNavigation.nombre}`}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </Box>
      ),
    },

    { field: 'nombre', headerName: 'Nombre', width: 400, flex: 2, valueGetter: (params) => params.row.idProductoNavigation.nombre },
    // { field: 'descripcion', headerName: 'Descripción', width: 400 },
    {
      field: 'precio', headerName: 'Precio', width: 400, flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}`, valueGetter: (params) => params.row.idProductoNavigation.precio, // Formatea el valor con el signo de peso y dos decimales
    },
    { field: 'idCategoria', headerName: 'Categoria', width: 400, flex: 1, valueGetter: (params) => params.row.idProductoNavigation.idCategoriaNavigation.nombre },

    {
      field: 'stock',
      headerName: 'Stock',
      width: 400,
      flex: 1,
      valueFormatter: (params) => `${params.value} unidades`,
      valueGetter: (params) => params.row.stock,
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Accion',
      width: 50,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => detallePublicacion(id)} // Llamar a la función pasando el ID
            color="inherit"
          />,


        ];
      },
    },

  ];
  // Define más columnas según sea necesario

  return (
    <Box sx={{ height: 1, width: 1, display: 'grid' }}>

      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}

        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 30]}
        rows={publicaciones}  // Usa tus propios datos aquí
        columns={myColumns}  // Usa tus propias columnas aquí
        getRowId={(row) => row.idPublicacion}
        rowHeight={100}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        getRowClassName={(params) =>
          params.row.stock === 0
            ? 'cero-stock-row'
            : params.row.stock <= 5
              ? 'low-stock-row'
              : ''
        }
        sortModel={[
          {
            field: 'stock',
            sort: 'desc',
          },
        ]}


        componentsProps={{
          toolbar: {
            showQuickFilter: true,

          },
        }

        }

      />
    </Box>
  );
};

export default TablaPublicaciones;
