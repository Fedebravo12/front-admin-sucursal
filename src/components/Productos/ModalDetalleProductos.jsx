// ModalFormCategoria.jsx
import React, { useEffect } from 'react';

import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import EditIcon from '@mui/icons-material/Edit';



const ModalDetalleProductos = ({ open, handleClose, productos, categorias, onSubmit, register, errors, reset, watch, onCategoriaChange, isEditMode, toggleEditMode }) => {

    useEffect(() => {
        if (productos && open) {
            reset({
                idProducto: productos.idProducto,
                nombre: productos.nombre,
                precio: productos.precio,
                idCategoria: productos.idCategoriaNavigation.idCategoria,
                descripcion: productos.descripcion,
                urlImagen: productos.urlImagen,
            });
        }
    }, [productos, open, reset]);


    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClose={handleClose}
            disableEscapeKeyDown={true} // Impide el cierre del modal al presionar la tecla Escape
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
                    Detalle Producto
                    <IconButton onClick={toggleEditMode}>
                        <EditIcon />
                    </IconButton>
                </Typography>
                <Box mt={3} mb={3}>

                    <TextField
                        type="hidden"
                        style={{ display: 'none' }} // Asegúrate de que esté oculto
                        {...register("idProducto")}
                        defaultValue={productos?.idProducto}
                    />

                    <Box mt={2}>
                        <TextField fullWidth
                            label="Nombre del Producto"
                            placeholder="Ingrese el nombre del Producto"
                            // value={pid?.denominacion} 
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}
                            value={productos?.nombre}

                            {...register("nombre",
                                {
                                    required: "El nombre del Producto es obligatorio",
                                    // pattern: {
                                    //     value: /^.*\S.*$/, // Verificar que no esté vacío
                                    //     message: "El nombre debe contener solo letras"
                                    // }

                                })
                            }
                            error={Boolean(errors.nombre)}
                            helperText={errors.nombre && errors.nombre.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Precio"
                            placeholder="Ingrese el precio del producto"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}
                            value={productos?.precio}

                            // value={pid?.director} 

                            {...register("precio",
                                {
                                    required: "El precio del producto es obligatorio",
                                    pattern: {
                                        value: /^[0-9.]+$/, // Expresión regular que permite solo números y puntos
                                        message: "Ingrese un valor válido para el precio",
                                    }

                                })
                            }
                            error={Boolean(errors.precio)}
                            helperText={errors.precio && errors.precio.message}

                        />


                    </Box>

                    <Box mt={3} mb={3}>

                        <FormControl fullWidth error={Boolean(errors.idCategoria)}>
                            <InputLabel id="categoria-label">Categoria</InputLabel>
                            <Select
                                value={watch("idCategoria")}
                                labelId="categoria-label"
                                placeholder="Seleccione una categoria"
                                id="categoria-select"
                                label="Categoria"
                                {...register("idCategoria", { required: "Este campo es obligatorio" })}
                                onChange={onCategoriaChange}
                                disabled={!isEditMode}

                            >
                                <MenuItem value="" disabled>Seleccione una categoria</MenuItem>

                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.idCategoria && errors.idCategoria.message}
                            </Typography>
                        </FormControl>
                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="descripcion"
                            placeholder="Ingrese la descripcion del producto"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}
                            value={productos?.descripcion}

                            // value={pid?.director} 

                            {...register("descripcion",
                                {
                                    required: "la descripcion del producto es obligatorio",
                                })
                            }
                            error={Boolean(errors.descripcion)}
                            helperText={errors.descripcion && errors.descripcion.message}

                        />


                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="urlImagen"
                            placeholder="Ingrese la URL del producto"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}
                            value={productos?.urlImagen}

                            // value={pid?.director} 

                            {...register("urlImagen",
                                {
                                    required: "la URL del producto es obligatoria",
                                })
                            }
                            error={Boolean(errors.urlImagen)}
                            helperText={errors.urlImagen && errors.urlImagen.message}

                        />


                    </Box>
                    {
                        isEditMode && (
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Button
                                    sx={{
                                        mt: 1, mr: 2, width: '120px', textTransform: 'none',
                                    }}
                                    size="large"
                                    variant="outlined"
                                    color="primary"

                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="large"
                                    sx={{
                                        mt: 1, width: '120px', color: 'white', textTransform: 'none',
                                    }}
                                    variant="contained"
                                    color="primary"

                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            </Box>
                        )

                    }


                </Box>
            </Box>
        </Modal>
    );
}

export default ModalDetalleProductos;
