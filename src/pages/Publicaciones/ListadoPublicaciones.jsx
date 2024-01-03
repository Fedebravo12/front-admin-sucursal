import TablaProductos from "../../components/Productos/TablaProductos.jsx";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingModal from "../../components/LoadingModal.jsx";
import ModalDetalleProductos from "../../components/Productos/ModalDetalleProductos.jsx";
import ModalFormProducto from "../../components/Productos/ModalFormProducto.jsx";
import { Button } from "@mui/material";
import BotonAgregar from "../../components/BotonAgregar.jsx";
import theme from '../../layout/theme.js';
import Swal from 'sweetalert2';
import { set } from "date-fns";
import TablaPublicaciones from "../../components/Publicaciones/TablaPublicaciones.jsx";
import ModalDetallePublicaciones from "../../components/Publicaciones/ModalDetallePublicaciones.jsx";
import ModalFormPublicaciones from "../../components/Publicaciones/ModalFormPublicaciones.jsx";



const ListadoPublicaciones = () => {
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
    const [publicaciones, setPublicaciones] = useState([]);
    const [publicacion, setPublicacion] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [reload, setReload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDetalle, setOpenModalDetalle] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            debugger;
            try {
                showLoadingModal();
                const token = localStorage.getItem('token');
                const options = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Asegúrate de incluir el token aquí
                    }
                };
                const [publicaciones] = await Promise.all([
                    axios.get(apiLocalKey + '/publicacionesRolSucursal', options   )
                ]);

                setPublicaciones(publicaciones.data.result.data);
                console.log(publicaciones.data.result.data);
            } catch (error) {
                console.log(error);
            } finally {
                hideLoadingModal();
            }
        };

        loadData();
    }, [reload]);

    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const onSubmitEdit = async (data) => {
        debugger;
        // //Oculto el modal
        // handleCloseModalDetalle();

        // // if (!valida) {
        // //     Swal.fire({
        // //         position: "center",
        // //         icon: "error",
        // //         allowOutsideClick: false,
        // //         title:
        // //             "Las fechas son obligatorias y debe ingresar una fecha de inicio menor a la fecha de fin",
        // //         showConfirmButton: true,
        // //     });
        // //     return;
        // // } else {
        // //     try {
        //         showLoadingModal();
        //         const response = await axios.put(apiLocalKey + "/producto", data);
        //         //muestro el msj de exito
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             allowOutsideClick: false,
        //             title: "Producto editado correctamente",
        //             showConfirmButton: true,
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 //aca deberia recargar el componente para que se vea la nueva categoria
        //                 //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
        //                 //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
        //                 setReload((prev) => !prev);
        //                 hideLoadingModal();
        //             }
        //         });
        //     // } catch (error) {
        //     //     hideLoadingModal();
        //     //     Swal.fire({
        //     //         position: "center",
        //     //         icon: "error",
        //     //         allowOutsideClick: false,
        //     //         title: "Hubo un error al agregar el PID",
        //     //         showConfirmButton: true,
        //     //     });
        //     // }
        // // }
    };


    //Funciones para el modal de detalle de un PID

    const handleDetallePublicacion = async (id) => {
        debugger;
            try {
                showLoadingModal();
                const res = await axios.get(apiLocalKey + '/publicacion/' + id)
                const publicacion = res.data.result.data;
                setPublicacion(res.data.result.data);

                setValue("idPublicacion", res.data.result.data.idPublicacion);
                setValue("nombre", res.data.result.data.nombre);
                setValue("stock", res.data.result.data.stock);
                setValue("idCategoria", res.data.result.data.idProductoNavigation.idCategoriaNavigation.idCategoria);
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


        const handleCloseModalDetalle = async (event, reason) => {
            debugger;
            if (reason == 'backdropClick') {
                return;
            }
            setIsEditMode(false);
            reset({
                idPublicacion: "0",
                nombre: "",
                stock: "",
                idCategoria: "",
                precio: "",
                descripcion: "",
                urlImagen: "",
            });
            setOpenModalDetalle(false);
        };

        //funciones para el modal, abrir y cerrar

        // const handleOpenModal = () => {
        //     setOpenModal(true);
        // };

        // const handleCloseModal = async (event, reason) => {
        //     Si se hace click en el backdrop, no se cierra el modal
        //     if (reason == 'backdropClick') {
        //         return;
        //     }

        //     Si se hace click en el botón de cancelar o en la X, se cierra el modal y se resetea el formulario

        //     reset({
        //         idPublicacion: "0",
        //         nombre: "",
        //         idCategoria: "",
        //         precio: "",
        //         descripcion: "",
        //         urlImagen: "",
        //     });
        //     await setOpenModal(false);
        // };













        return (
            <>

                <Box style={{ position: 'relative' }}>

                    <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '30px', marginBottom: '10px' }}>
                        Listado de Publicaciones
                    </Typography>

                    {/* Hago un componente para el modal, para que sea mas facil de leer */}
                    {/* Hago un componente para el modal, para que sea mas facil de leer */}
                    {/* <ModalFormPublicaciones
                open={openModal}
                handleClose={handleCloseModal}
                categorias={categorias}
                onCategoriaChange={handleCategoriaChange}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                reset={reset}
            /> */}


                    <ModalDetallePublicaciones
                        open={openModalDetalle}
                        handleClose={handleCloseModalDetalle}
                        publicacion={publicacion}
                        onSubmit={handleSubmit(onSubmitEdit)}
                        register={register}
                        errors={errors}
                        reset={reset}
                        watch={watch}
                        isEditMode={isEditMode}
                        toggleEditMode={toggleEditMode}
                    />

               
                        <TablaPublicaciones publicaciones={publicaciones} detallePublicacion={handleDetallePublicacion}/>
                
                </Box>
            </>
        );
    };
// };

export default ListadoPublicaciones;