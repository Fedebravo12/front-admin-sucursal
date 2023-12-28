// useLoadingModal.js
import { useState } from "react";
import Swal from "sweetalert2";

const LoadingModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoadingModal = () => {
        setIsLoading(true);
        Swal.fire({
            title: 'Cargando',
            text: 'Por favor espere',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                Swal.hideLoading();
            }
        });
    };

    const hideLoadingModal = () => {
        setIsLoading(false);
        Swal.close();
    };

    return { isLoading, showLoadingModal, hideLoadingModal };
};

export default LoadingModal;