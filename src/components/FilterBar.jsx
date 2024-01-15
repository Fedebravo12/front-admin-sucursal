import React from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import DatePickerViews from '../components/DatePicker';


const FilterBar = ({   }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%',mt:2 }}>
      <DatePickerViews />

        <Button variant="contained" color='primary' sx={{ml:2, height:40}}>
          <Typography sx={{ fontSize: 14, color: 'white', textTransform: 'none' }}>
            Limpiar filtro

          </Typography>
        </Button>


      </Box>



    </>

  );
};

export default FilterBar;
