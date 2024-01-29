// FilterBar.jsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DatePickerViews from '../components/DatePicker';
const FilterBar = ({ onFilterChange, onLimpiarFiltro }) => {
    const [filteredDate, setFilteredDate] = useState(null);

    const handleDateChange = (date) => {
        setFilteredDate(date);
        onFilterChange(date);
    };

   

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 2 }}>
            <DatePickerViews onDateChange={handleDateChange} />
            <Button variant="contained" color="primary" sx={{ ml: 2, height: 40 }} >
                <Typography sx={{ fontSize: 14, color: 'white', textTransform: 'none' }}>
                    Limpiar filtro
                </Typography>
            </Button>
        </Box>
    );
};

export default FilterBar;