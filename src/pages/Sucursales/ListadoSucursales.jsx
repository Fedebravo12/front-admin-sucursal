import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BotonAgregar from '../../components/BotonAgregar.jsx';
import theme from '../../layout/theme.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import LoadingModal from '../../components/LoadingModal.jsx';
import FormModal from '../../components/FormModal.jsx';
import DetailModal from '../../components/DetailModal.jsx';
import GenericTable from '../../components/GenericTable.jsx';
import {GridActionsCellItem
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';



const ListadoSucursales = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const [isEditMode, setIsEditMode] = useState(false);

  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const [sucursales, setSucursales] = useState([]);
  const [sucursal, setSucursal] = useState([]);
  const { showLoadingModal, hideLoadingModal } = LoadingModal();
  const [reload, setReload] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetalle, setOpenModalDetalle] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    emailSucursal: '',
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    const loadData = async () => {
      debugger;
      try {
        showLoadingModal();
        const [sucursales] = await Promise.all([
          axios.get(apiLocalKey + '/sucursales'),
        ]);

        // console.log('Sucursales Data:', sucursales);
        // const sucursalesArray = sucursalesResponse.data.result;

        setSucursales(sucursales.data.result);
        console.log(sucursales.data.result);

      } catch (error) {
        console.log(error);
      } finally {
        hideLoadingModal();
      }
    };

    loadData();
  }, [reload]);


  console.log('Sucursales Data:', sucursales);


  const handleDeleteSucursal = async (id) => {
    debugger;
    try {
      Swal.fire({
        title: '¿Estás seguro de eliminar la sucursal?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        reverseButtons: true,
        confirmButtonColor: theme.palette.error.main,
        cancelButtonColor: theme.palette.primary.main,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          showLoadingModal();

          const token = localStorage.getItem('token');
    
    debugger;

    const response = await axios.put(
      apiLocalKey + '/sucursales/' + id,
      null,  // No request body, as it is a DELETE request
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    

          Swal.fire({
            position: 'center',
            icon: 'success',
            allowOutsideClick: false,
            title: 'Sucursal eliminada correctamente',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              setReload((prev) => !prev);
              hideLoadingModal();
            }
          });
        }
      });
    } catch (error) {
      hideLoadingModal();
      Swal.fire({
        position: 'center',
        icon: 'error',
        allowOutsideClick: false,
        title: 'Hubo un error al eliminar la sucursal',
        showConfirmButton: true,
      });
    }
  };

  const onSubmit = async (data) => {
    handleCloseModal();

    showLoadingModal();
    
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(apiLocalKey + '/sucursal', data, { headers: headers });

    Swal.fire({
      position: 'center',
      icon: 'success',
      allowOutsideClick: false,
      title: 'Sucursal agregada correctamente',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setReload((prev) => !prev);
        hideLoadingModal();
      }
    });
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const onSubmitEdit = async (data) => {

    handleCloseModalDetalle();

    showLoadingModal();
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(apiLocalKey + '/sucursal', data, { headers: headers });

    Swal.fire({
      position: 'center',
      icon: 'success',
      allowOutsideClick: false,
      title: 'Sucursal editada correctamente',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setReload((prev) => !prev);
        hideLoadingModal();
      }
    });
  };

  const handleDetalleSucursal = async (id) => {
    debugger;
    try {
      const token = localStorage.getItem('token');
      const headers = {
          Authorization: `Bearer ${token}`,
      };
      showLoadingModal();
      const res = await axios.get(apiLocalKey + '/sucursal/' + id,  { headers: headers });
      setSucursal(res.data.result.data);

      setValue('idSucursal', res.data.result.data.idSucursal);
      setValue('nombre', res.data.result.data.nombre);
      setValue('direccion', res.data.result.data.direccion);
      setValue('emailSucursal', res.data.result.data.emailSucursal);

       hideLoadingModal();
       setOpenModalDetalle(true);
    } catch (error) {
      console.log(error);
      hideLoadingModal();
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModalDetalle = async (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }

    setIsEditMode(false);
    reset({
      idSucursal: '0',
      nombre: '',
      direccion: '',
      emailSucursal: '',
    });
    await setOpenModalDetalle(false);
  };

  const handleCloseModal = async (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }

    setIsEditMode(false);
    reset({
      idSucursal: '0',
      nombre: '',
      direccion: '',
      emailSucursal: '',
    });
    await setOpenModal(false);
  };

  // const handleSucursalChange = (event) => {
  //   setValue('idSucursal', event.target.value, { shouldValidate: true });
  // };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 400, flex: 2, valueGetter: (params) => params.row.nombre },
    { field: 'direccion', headerName: 'Dirección', width: 400, flex: 2},
    { field: 'emailSucursal', headerName: 'Email', width: 400, flex: 2},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 50,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleDetalleSucursal(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          onClick={() => handleDeleteSucursal(id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box style={{ position: 'relative' }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '10px' }}>
          Listado de Sucursales
        </Typography>

        <BotonAgregar onClick={handleOpenModal}></BotonAgregar>

        <FormModal
          open={openModal}
          handleClose={handleCloseModal}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          register={register}
          reset={reset}
          fields={[
            { name: 'nombre', label: 'Nombre Sucursal', validation: { required: 'El nombre es obligatorio' } },
            { name: 'direccion', label: 'Dirección', validation: { required: 'La dirección es obligatoria' } },
            { name: 'emailSucursal', label: 'Email', validation: { required: 'El email es obligatorio', pattern: { value: /^\S+@\S+$/, message: 'Ingrese un email válido' } } },
          ]}
        />

        <DetailModal
          open={openModalDetalle}
          handleClose={handleCloseModalDetalle}
          item={sucursal}
          onSubmit={handleSubmit(onSubmitEdit)}
          register={register}
          errors={errors}
          reset={reset}
          watch={watch}
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          fields={[
            { name: 'nombre', label: 'Nombre', validation: { required: 'El nombre es obligatorio' } },
            { name: 'direccion', label: 'Dirección', validation: { required: 'La dirección es obligatoria' } },
            { name: 'emailSucursal', label: 'Email', validation: { required: 'El email es obligatorio' } },
          ]}
        />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}
        >
          <GenericTable
            rows={sucursales}
            columns={columns}
            getRowId={(row) => row.idSucursal}
            onDelete={handleDeleteSucursal}
            onDetail={handleDetalleSucursal}
          />
        </Grid>
      </Box>
    </>
  );
};

export default ListadoSucursales;
