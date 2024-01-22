import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

const DetailModal = ({
  open,
  handleClose,
  item,
  onSubmit,
  register,
  errors,
  reset,
  isEditMode,
  toggleEditMode,
}) => {
  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    if (item && open) {
      reset({
        idSucursal: item.idSucursal,
        nombre: item.nombre,
        direccion: item.direccion,
        emailSucursal: item.emailSucursal,
      });
    }
  }, [item, open, reset]);

  const handleCancel = () => {
    handleClose();
    reset({
      idSucursal: item?.idSucursal || '',
      nombre: item?.nombre || '',
      direccion: item?.direccion || '',
      emailSucursal: item?.emailSucursal || '',
    });
  };

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown={true} 
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '75%', md: '600px' },
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IconButton
                    aria-label="cerrar"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
        <Typography id="modal-title" variant="h5" component="h2">
          Detalle de la Sucursal
          <IconButton onClick={toggleEditMode}>
            <EditIcon />
          </IconButton>
        </Typography>

        <Box mt={3} mb={3}>
          <TextField
            type="hidden"
            style={{ display: 'none' }}
            {...register('idSucursal')}
            defaultValue={item?.idSucursal}
          />

          <Box mt={2}>
            <Box mb={2}>
          <TextField
  fullWidth
  label="Nombre"
  placeholder="Ingrese el nombre de la Sucursal"
  InputLabelProps={{ shrink: true }}
  disabled={!isEditMode}
  value={watch('nombre')}  
  onChange={(e) => setValue('nombre', e.target.value)}  
  {...register('nombre', {
    required: 'El nombre de la Sucursal es obligatorio',
  })}
  error={Boolean(errors.nombre)}
  helperText={errors.nombre && errors.nombre.message}
/>
</Box>  
<Box mb={2}>
<TextField
  fullWidth
  label="Dirección"
  placeholder="Ingrese la dirección de la Sucursal"
  InputLabelProps={{ shrink: true }}
  disabled={!isEditMode}
  value={watch('dirección')}  
  onChange={(e) => setValue('direccion', e.target.value)}  
  {...register('direccion', {
    required: 'La dirección de la Sucursal es obligatoria',
  })}
  error={Boolean(errors.nombre)}
  helperText={errors.nombre && errors.nombre.message}
/>
</Box>
<Box mb={2}>
<TextField
  fullWidth
  label="Email"
  placeholder="Ingrese el email de la Sucursal"
  InputLabelProps={{ shrink: true }}
  disabled={!isEditMode}
  value={watch('emailSucursal')}  
  onChange={(e) => setValue('emailSucursal', e.target.value)}  
  {...register('emailSucursal', {
    required: 'El email de la Sucursal es obligatoria',
  })}
  error={Boolean(errors.nombre)}
  helperText={errors.nombre && errors.nombre.message}
/>
</Box>

          </Box>

          {isEditMode && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                sx={{ mt: 1, mr: 2, width: '120px', textTransform: 'none' }}
                size="large"
                variant="outlined"
                color="primary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                size="large"
                sx={{ mt: 1, width: '120px', color: 'white', textTransform: 'none' }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Guardar
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
