// GenericModal.jsx
import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DetailModal = ({ open, handleClose, item, onSubmit, register, errors, reset, watch, onInputChange, isEditMode, toggleEditMode, fields }) => {
    useEffect(() => {
        if (item && open) {
            const initialValues = {};
            fields.forEach(field => {
                initialValues[field.name] = item[field.name];
            });
            reset(initialValues);
        }
    }, [item, open, reset, fields]);

    return (
        <Modal
            open={open}
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
                {/* ... Modal content */}
                <Typography id="modal-title" variant="h5" component="h2">
                    Detalle {item ? item.nombre : ''}
                </Typography>
                {fields.map(field => (
                    <Box key={field.name} mt={3} mb={3}>
                        <TextField
                            fullWidth
                            label={field.label}
                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}
                            value={item ? item[field.name] : ''}
                            {...register(field.name, field.validation)}
                            error={Boolean(errors[field.name])}
                            helperText={errors[field.name] && errors[field.name].message}
                            onChange={onInputChange}
                        />
                    </Box>
                ))}
                {isEditMode && (
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
        </Modal>
    );
}

export default DetailModal;
