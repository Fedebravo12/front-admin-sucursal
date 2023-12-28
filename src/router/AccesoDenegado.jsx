// AccessDenied.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccesoDenegado = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h2" color="error" gutterBottom>
                Acceso Denegado
            </Typography>
            <Typography variant="h6" marginBottom={3}>
                No tienes permiso para acceder a esta página.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/')}
            >
                Volver al inicio
            </Button>
        </Box>
    );
}

export default AccesoDenegado;
