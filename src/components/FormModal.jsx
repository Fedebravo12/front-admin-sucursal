// GenericFormModal.jsx
import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FormModal = ({ open, handleClose, onSubmit, register, errors, reset, fields }) => {


  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={handleClose}
      disableEscapeKeyDown={true}
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
        onSubmit={onSubmit}
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
          { 'Nueva Sucursal'}
        </Typography>
        <Box mt={3} mb={3}>
          {fields.map((field) => (
            <Box key={field.name} mt={3} mb={3}>
              <TextField
                fullWidth
                label={field.label}
                placeholder={`Ingrese ${field.label}`}
                InputLabelProps={{ shrink: true }}
                // value={formData && formData[field.name]}
                {...register(field.name, field.validation)}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name] && errors[field.name].message}
              />
            </Box>
          ))}
          {(
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                sx={{ mt: 1, mr: 2, width: '120px', textTransform: 'none' }}
                size="large"
                variant="outlined"
                color="primary"
                onClick={handleClose}
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

export default FormModal;
