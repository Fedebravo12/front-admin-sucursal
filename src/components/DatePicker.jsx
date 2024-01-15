import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import 'dayjs/locale/es';




export default function DatePickerViews() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <DemoContainer components={['DatePicker']}>
      
        <DatePicker label={'Mes y Año'} views={['month', 'year']} />
      </DemoContainer>
    </LocalizationProvider>
  );
}