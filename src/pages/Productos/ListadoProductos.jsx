import TablaProductos from "../../components/Productos/TablaProductos.jsx";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingModal from "../../components/LoadingModal";
import ModalDetalleProductos from "../../components/Productos/ModalDetalleProductos.jsx";
import ModalFormProducto from "../../components/Productos/ModalFormProducto.jsx";
import BotonAgregar from "../../components/BotonAgregar.jsx";
import theme from '../../layout/theme.js';
import Swal from 'sweetalert2';



const ListadoProductos = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        clearErrors,
        setError,
    } = useForm();

    const [isEditMode, setIsEditMode] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null); // Nuevo estado para el archivo

    // useEffect(() => {
    //     register('archivo', { required: 'Se requiere una imagen' }); // Registra el campo de archivo
    // }, [register]);

    const handleFileChange = (event) => {
        debugger;
        const file = event.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                setError('archivo', { type: 'manual', message: 'Solo se permiten imágenes (jpeg, png, jpg)' });
                setSelectedFile(null);
            } else {
                clearErrors('archivo');
                setSelectedFile(file);
                setValue('archivo', file.name); // Actualiza el valor en React Hook Form
            }
        } else {
            setSelectedFile(null);
            setValue('archivo', null);
            setError('archivo', { type: 'manual', message: 'Se requiere una imagen' });
        }
    };



    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [reload, setReload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDetalle, setOpenModalDetalle] = useState(false);



    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                showLoadingModal();
                const [productos, categorias] = await Promise.all([
                    axios.get(apiLocalKey + '/productos', { headers: headers }),
                    axios.get(apiLocalKey + '/categorias')
                ]);

                await setProductos(productos.data.result.data);

                debugger;
                await setCategorias(categorias.data.result.data.filter(categoria => categoria.agrupador == false));

            } catch (error) {
                debugger;
                console.log(error);
                hideLoadingModal();

            } finally {
                hideLoadingModal();
            }
        };

        loadData();
    }, [reload]);

    const handleDeleteProducto = async (id) => {
        debugger;
        try {
            //pregunto si esta seguro de eliminar la categoria
            Swal.fire({
                title: "¿Estás seguro de eliminar el producto?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                confirmButtonColor: theme.palette.error.main,
                cancelButtonColor: theme.palette.primary.main,

                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                debugger;
                if (result.isConfirmed) {
                    showLoadingModal();
                    //si esta seguro, elimino la categoria
                    const token = localStorage.getItem('token');
                    const headers = {
                        Authorization: `Bearer ${token}`
                    };
                    const response = await axios.put(apiLocalKey + '/producto/' + id, {
                        headers: headers,
                    });
                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Producto eliminado correctamente',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //aca deberia recargar el componente para que se vea la nueva categoria
                            //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                            //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                            setReload(prev => !prev);
                            hideLoadingModal();

                        }
                    })
                }
            })
        } catch (error) {
            {
                debugger;
                hideLoadingModal();
                console.log(import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN);

                if (error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN || error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_UNAUTHORIZED) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        allowOutsideClick: false,
                        title: "Hubo un error al eliminar el Producto",
                        text: "No tienes permiso para realizar esta acción",
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        allowOutsideClick: false,
                        title: "Hubo un error al eliminar el Producto",
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',

                    });
                }
            }
        };
    };

    const onSubmit = async (data) => {


        // //manejo del archivo
        // debugger;
        // if (selectedFile) {
        //     data.archivo = selectedFile;
        // }
        // else {
        //     setError('archivo', { type: 'manual', message: 'Se requiere una imagen' });
        //     return;
        // }

        debugger;


        handleCloseModal();

        try {


            showLoadingModal();
            const formData = new FormData();

            // Agregar datos del formulario
            formData.append('nombre', data.nombre);
            formData.append('precio', data.precio);
            formData.append('idCategoria', data.idCategoria);
            formData.append('descripcion', data.descripcion);

            // Agregar el archivo si está seleccionado
            if (selectedFile) {
                formData.append('archivo', selectedFile);
            } else {
                setError('archivo', { type: 'manual', message: 'Se requiere una imagen' });
                return;
            }



            const token = localStorage.getItem('token');
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Asegúrate de incluir el token aquí
                }
            };
            //si esta seguro, elimino la categoria
            const response = await axios.post(apiLocalKey + "/producto", formData, options);
            debugger;
            Swal.fire({
                position: "center",
                icon: "success",
                allowOutsideClick: false,
                title: "Producto agregado correctamente",
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    //aca deberia recargar el componente para que se vea la nueva categoria
                    //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                    //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                    setReload((prev) => !prev);
                    hideLoadingModal();
                }
            });
        } catch (error) {
            debugger;
            hideLoadingModal();
            console.log(import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN);

            if (error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN || error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_UNAUTHORIZED) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al cargar el Producto",
                    text: "No tienes permiso para realizar esta acción",
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al agregar el PID",
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',

                });
            }
        }

    };

    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const onSubmitEdit = async (data) => {
        debugger;
        //Oculto el modal
        handleCloseModalDetalle();

        try {
            showLoadingModal();
            debugger;
            const formData = new FormData();

            // Agregar datos del formulario
            formData.append('idProducto', data.idProducto);
            formData.append('nombre', data.nombre);
            formData.append('precio', data.precio);
            formData.append('idCategoria', data.idCategoria);
            formData.append('descripcion', data.descripcion);


            // Agregar el archivo si está seleccionado
            if (selectedFile) {
                formData.append('archivo', selectedFile);
            }

            const token = localStorage.getItem('token');
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Asegúrate de incluir el token aquí
                }
            };

            const response = await axios.put(apiLocalKey + "/producto", formData, options);
            //muestro el msj de exito
            Swal.fire({
                position: "center",
                icon: "success",
                allowOutsideClick: false,
                title: "Producto editado correctamente",
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',

            }).then((result) => {
                if (result.isConfirmed) {
                    //aca deberia recargar el componente para que se vea la nueva categoria
                    //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                    //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                    setReload((prev) => !prev);
                    hideLoadingModal();
                }
            });
        } catch (error) {
            debugger;
            hideLoadingModal();
            console.log(import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN);

            if (error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_FORBIDDEN || error.response.status == import.meta.env.VITE_APP_API_ERROR_CODE_UNAUTHORIZED) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al editar el Producto",
                    text: "No tienes permiso para realizar esta acción",
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al agregar el Producto",
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',

                });
            }
        }

    };


    //Funciones para el modal de detalle de un PID

    const handleDetalleProducto = async (id) => {
        debugger;
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.get(apiLocalKey + '/producto/' + id, {
                headers: headers,
            })
            const producto = res.data.result.data;
            setProducto(res.data.result.data);

            // setProductosValues(producto);
            setValue("idProducto", res.data.result.data.idProducto);
            setValue("nombre", res.data.result.data.nombre);
            setValue("idCategoria", res.data.result.data.idCategoriaNavigation.idCategoria);
            setValue("precio", res.data.result.data.precio);
            setValue("descripcion", res.data.result.data.descripcion);
            // setValue("urlImagen", res.data.result.data.urlImagen);
            setValue("archivo", res.data.result.data.urlImagen);


            await hideLoadingModal();
            await setOpenModalDetalle(true);
        } catch (error) {
            console.log(error)
            hideLoadingModal();
        }
    };



    const handleCloseModalDetalle = async (event, reason) => {
        if (reason == 'backdropClick') {
            return;
        }
        setSelectedFile(null);
        setValue('archivo', null);
        clearErrors('archivo');

        setIsEditMode(false);
        reset({
            idProducto: "0",
            nombre: "",
            idCategoria: "",
            precio: "",
            descripcion: "",
            archivo: "",
            // urlImagen: "",
        });
        setOpenModalDetalle(false);
    };

    //funciones para el modal, abrir y cerrar

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async (event, reason) => {
        // Si se hace click en el backdrop, no se cierra el modal
        if (reason == 'backdropClick') {
            return;
        }

        // Si se hace click en el botón de cancelar o en la X, se cierra el modal y se resetea el formulario
        setSelectedFile(null);
        setValue('archivo', null);
        clearErrors('archivo');

        reset({
            idProducto: "0",
            nombre: "",
            idCategoria: "",
            precio: "",
            descripcion: "",
            // urlImagen: "",
        });
        await setOpenModal(false);
    };

    const handleCategoriaChange = (event) => {
        setValue("idCategoria", event.target.value, { shouldValidate: true });
    }




    return (
        <>

            <Box style={{ position: 'relative' }}>

                <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '10px' }}>
                    Listado de Productos
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <BotonAgregar onClick={handleOpenModal}></BotonAgregar>
                </Box>
                {/* Hago un componente para el modal, para que sea mas facil de leer */}
                {/* Hago un componente para el modal, para que sea mas facil de leer */}
                <ModalFormProducto
                    open={openModal}
                    handleClose={handleCloseModal}
                    categorias={categorias}
                    onCategoriaChange={handleCategoriaChange}
                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                    selectedFile={selectedFile}
                    handleFileChange={handleFileChange}
                />


                <ModalDetalleProductos
                    open={openModalDetalle}
                    handleClose={handleCloseModalDetalle}
                    producto={producto}
                    categorias={categorias}
                    handleFileChange={handleFileChange}
                    onCategoriaChange={handleCategoriaChange}
                    onSubmit={handleSubmit(onSubmitEdit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                    watch={watch}
                    isEditMode={isEditMode}
                    selectedFile={selectedFile}
                    toggleEditMode={toggleEditMode}
                />

                {productos.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se encontraron productos</Typography>
                    </Box>
                ) : (

                    <>

                        <TablaProductos productos={productos} onDelete={handleDeleteProducto} detalleProducto={handleDetalleProducto} />
                    </>
                )}

            </Box>
        </>
    );
};
export default ListadoProductos;
