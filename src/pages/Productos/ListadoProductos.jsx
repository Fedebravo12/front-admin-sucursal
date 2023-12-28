import TablaProductos from "../../components/Categorias/Productos/TablaProductos";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingModal from "../../components/Categorias/LoadingModal";
import ModalDetalleProductos from "../../components/Categorias/Productos/ModalDetalleProductos";
import ModalFormProducto from "../../components/Categorias/Productos/ModalFormProducto";
import { Button } from "@mui/material";
import BotonAgregar from "../../components/Categorias/BotonAgregar";
import theme from '../../layout/theme.js';
import Swal from 'sweetalert2';
import { set } from "date-fns";


const ListadoProductos = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm();

    const [isEditMode, setIsEditMode] = useState(false);


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
                showLoadingModal();
                const [productos, categorias] = await Promise.all([
                    axios.get(apiLocalKey + '/productos'),
                    axios.get(apiLocalKey + '/categorias')
                ]);

                setProductos(productos.data.result.data);
                setCategorias(categorias.data.result.data);
            } catch (error) {
                console.log(error);
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

                    const response = await axios.put(apiLocalKey + '/producto/' + id);
                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Producto eliminado correctamente',
                        showConfirmButton: true,
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
            hideLoadingModal();
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al eliminar el producto',
                showConfirmButton: true,
            });
        }
    };
    
    const onSubmit = async (data) => {
        //Oculto el modal
        debugger;
        handleCloseModal();


        // if (!valida) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         allowOutsideClick: false,
        //         title:
        //             "Las fechas son obligatorias y debe ingresar una fecha de inicio menor a la fecha de fin",
        //         showConfirmButton: true,
        //     });
        //     return;
        // } else {
        //     try {
                showLoadingModal();
                //si esta seguro, elimino la categoria
                const response = await axios.post(apiLocalKey + "/producto", data);  //falta el metodo!!!!!!!!!
                // //muestro el msj de exito
                Swal.fire({
                    position: "center",
                    icon: "success",
                    allowOutsideClick: false,
                    title: "Producto agregado correctamente",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //aca deberia recargar el componente para que se vea la nueva categoria
                        //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                        //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                        setReload((prev) => !prev);
                        hideLoadingModal();
                    }
                });
        //     } catch (error) {
        //         hideLoadingModal();
        //         Swal.fire({
        //             position: "center",
        //             icon: "error",
        //             allowOutsideClick: false,
        //             title: "Hubo un error al agregar el PID",
        //             showConfirmButton: true,
        //         });
        //     }
        // }
    };
    
    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const onSubmitEdit = async (data) => {
        debugger;
        //Oculto el modal
        handleCloseModalDetalle();

        // if (!valida) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         allowOutsideClick: false,
        //         title:
        //             "Las fechas son obligatorias y debe ingresar una fecha de inicio menor a la fecha de fin",
        //         showConfirmButton: true,
        //     });
        //     return;
        // } else {
        //     try {
                showLoadingModal();
                const response = await axios.put(apiLocalKey + "/producto", data);
                //muestro el msj de exito
                Swal.fire({
                    position: "center",
                    icon: "success",
                    allowOutsideClick: false,
                    title: "Producto editado correctamente",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //aca deberia recargar el componente para que se vea la nueva categoria
                        //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                        //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                        setReload((prev) => !prev);
                        hideLoadingModal();
                    }
                });
            // } catch (error) {
            //     hideLoadingModal();
            //     Swal.fire({
            //         position: "center",
            //         icon: "error",
            //         allowOutsideClick: false,
            //         title: "Hubo un error al agregar el PID",
            //         showConfirmButton: true,
            //     });
            // }
        // }
    };

    
    //Funciones para el modal de detalle de un PID

    const handleDetalleProducto = async (id) => {
        debugger;
        try {
            showLoadingModal();
            const res = await axios.get(apiLocalKey + '/producto/' + id)
            const producto = res.data.result.data;
            setProducto(res.data.result.data);

            // setProductosValues(producto);
            setValue("idProducto", res.data.result.data.idProducto);
            setValue("nombre", res.data.result.data.nombre);
            setValue("idCategoria", res.data.result.data.idCategoriaNavigation.idCategoria);
            setValue("precio", res.data.result.data.precio);
            setValue("descripcion", res.data.result.data.descripcion);
            setValue("urlImagen", res.data.result.data.urlImagen);


            await hideLoadingModal();
            await setOpenModalDetalle(true);
        } catch (error) {
            console.log(error)
            hideLoadingModal();
        }
    };

    // const setProductosValues = (producto) => {
    //     setValue("nombre", producto.nombre);
    //     setValue("categoria", producto.idCategoria.idCategoria);
    //     setValue("precio", producto.precio);
    // };

    const handleCloseModalDetalle = async (event, reason) => {
        if (reason == 'backdropClick') {
            return;
        }
        setIsEditMode(false);
        reset({
            idProducto: "0",
            nombre: "",
            idCategoria: "",
            precio: "",
            descripcion: "",
            urlImagen: "",
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

        reset({
            idProducto: "0",
            nombre: "",
            idCategoria: "",
            precio: "",
            descripcion: "",
            urlImagen: "",
        });
        await setOpenModal(false);
    };


    // // const handleProductoChange = (event) => {
    // //     setValue(event.target.value);
    // // };

    const handleCategoriaChange = (event) => {
        setValue("idCategoria", event.target.value, { shouldValidate: true });
    }

    










    return (
        <>

            <Box style={{ position: 'relative' }}>

             <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '10px' }}>
                Listado de Productos
            </Typography>


            <BotonAgregar onClick={handleOpenModal}></BotonAgregar>

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
            />


            <ModalDetalleProductos
                open={openModalDetalle}
                handleClose={handleCloseModalDetalle}
                producto={producto}
                categorias={categorias}
                onCategoriaChange={handleCategoriaChange}
                onSubmit={handleSubmit(onSubmitEdit)}
                register={register}
                errors={errors}
                reset={reset}
                watch={watch}
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
            />

            
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}
                >
            <TablaProductos productos={productos} onDelete={handleDeleteProducto} detalleProducto={handleDetalleProducto}/>
        </Grid>
        </Box>
        </>
    );

};
export default ListadoProductos;



