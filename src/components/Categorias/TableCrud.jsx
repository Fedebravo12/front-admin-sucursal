import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';







function EditToolbar(props) {
  const { setCategorias, setRowModesModel } = props;


  const handleClick = () => {
    debugger;

    var id = Math.floor(Math.random() * 1000) + 1;
    setCategorias((oldCategorias) => [
      ...oldCategorias,
      {
        idCategoria: id,
        descripcion: '',
        cantidadProductos: 0,
        isNew: true
      }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'descripcion' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function TableCrud() {
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










  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = categorias.find((categoria) => categoria.idCategoria === id);
    if (editedRow.isNew) {
      setCategorias(categorias.filter((categoria) => categoria.idCategoria !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setCategorias(categorias.map((categoria) => (categoria.idCategoria === newRow.idCategoria ? updatedRow : categoria)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'descripcion', headerName: 'Descripción', width: 700 },
    { field: 'cantidadProductos', headerName: 'Cantidad Productos', width: 700 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ idCategoria }) => {
        const isInEditMode = rowModesModel[idCategoria]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(idCategoria)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(idCategoria)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(idCategoria)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(idCategoria)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={categorias}
        columns={columns}
        getRowId={(row) => row.idCategoria}

        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setCategorias, setRowModesModel },
        }}
      />
    </Box>
  );
}
