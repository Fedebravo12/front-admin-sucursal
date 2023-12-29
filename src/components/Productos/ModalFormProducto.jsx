// ModalFormCategoria.jsx

import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import 'dayjs/locale/en-gb';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const ModalFormProducto = ({ open, handleClose, categorias, onSubmit, register, errors, onCategoriaChange, selectedFile, handleFileChange }) => {




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
                    Nuevo Producto
                </Typography>
                <Box mt={3} mb={3}>

                    <Box mt={2}>
                        <TextField fullWidth
                            label="Nombre Producto"
                            placeholder="Ingrese el nombre del Producto"
                            InputLabelProps={{ shrink: true }}

                            {...register("nombre",
                                {
                                    required: "El nombre del Producto es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/, // Permitir letras y tildes
                                        message: "El nombre debe contener solo letras"
                                    }

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
                                labelId="categoria-label"
                                placeholder="Seleccione una categoria"
                                id="categoria-select"
                                label="Categoria"
                                {...register("idCategoria", { required: "Este campo es obligatorio" })}
                                onChange={onCategoriaChange}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
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

                            {...register("descripcion",
                                {
                                    required: "la descripcion del producto es obligatoria",


                                })
                            }
                            error={Boolean(errors.descripcion)}
                            helperText={errors.descripcion && errors.descripcion.message}

                        />
                    </Box>


                    {/* <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="urlImagen"
                            placeholder="Ingrese la URL del producto"
                            InputLabelProps={{ shrink: true }}

                            {...register("urlImagen",
                                {
                                    required: "la URL del producto es obligatoria",
                        

                                })
                            }
                            error={Boolean(errors.urlImagen)}
                            helperText={errors.urlImagen && errors.urlImagen.message}

                        />
                    </Box> */}

                    <Box display="flex" alignItems="center" mt={3} mb={3}>
                        <Box flex="1">
                            <TextField
                                fullWidth
                                label="Imagen"
                                placeholder="Seleccione una imagen"
                                value={selectedFile ? selectedFile.name : ''}
                                InputLabelProps={{ shrink: true }}
                                {...register("archivo",
                                {
                                    required: "La imagen es obligatoria",


                                })
                            }
                                error={Boolean(errors.archivo)}
                                helperText={errors.archivo ? errors.archivo.message : ''}
                            />
                        </Box>
                        <Box ml={1}>
                            <label htmlFor="upload-button">
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} type="button" size="small">
                                    Imagen
                                    <input
                                        type="file"
                                        id="upload-button"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"                                      

                                    />
                                </Button>
                            </label>
                        </Box>

                    </Box>


                    {/* 
                    <Box mt={3} mb={3}>
                        <FormControl fullWidth error={Boolean(errors.tipoPid)}>
                            <InputLabel id="tipo-pid-label">Tipo PID</InputLabel>
                            <Select
                                labelId="tipo-pid-label"
                                placeholder="Seleccione un tipo PID"
                                id="tipo-pid-select"
                                label="Tipo PID"
                                {...register("tipoPid", { required: "Este campo es obligatorio" })}
                                onChange={onTipoPidChange}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                            >
                                <MenuItem value="" disabled>Seleccione un tipo PID</MenuItem>
                                {tipoPids.map((tipoPid) => (
                                    <MenuItem key={tipoPid.idTipoPid} value={tipoPid.idTipoPid}>{tipoPid.descripcion}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.tipoPid && errors.tipoPid.message}
                            </Typography>
                        </FormControl>
                    </Box> */}




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
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalFormProducto;
