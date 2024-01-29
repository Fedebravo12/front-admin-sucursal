import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';



const Filter = ({ fechaSeleccionada, changeFecha, minDate, maxDate, limpiar, buscar, estadosEnvio, changeEstadoEnvioFilter, estadoEnvio, expanded, changeExpanded }) => {
    return (
        <Grid container spacing={2} sx={{ mt: 3, mb: 4 }}>
            <Grid item xs={12}>
                <Accordion sx={{ backgroundColor: '#F4F4F4', boxShadow: 3}} expanded={expanded} onChange={changeExpanded}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontSize={'18px'} gutterBottom>
                            Filtros
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} xl={4}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        format='MM/YYYY'
                                        name='fecha'
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        label={'Mes y Año'}
                                        views={['year', 'month']}
                                        value={fechaSeleccionada}
                                        onChange={changeFecha}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="label-estado-envio">Estado envío</InputLabel>
                                    <Select
                                        labelId="label-estado-envio"
                                        id="estado-envio"
                                        label="Estado envío"
                                        value={estadoEnvio}
                                        onChange={changeEstadoEnvioFilter}

                                    >
                                        {estadosEnvio.map((estado) => {
                                            return (
                                                <MenuItem key={estado.id} value={estado.id}>{estado.descripcion}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                    </AccordionDetails>


                    <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
                        <Button
                            sx={{
                                mt: 1, mr: 2, width: '120px', textTransform: 'none',
                            }}
                            size="large"
                            variant="outlined"
                            color="primary"

                            onClick={limpiar}
                        >
                            Limpiar
                        </Button>
                        <Button
                            size="large"
                            sx={{
                                mt: 1, width: '120px', color: 'white', textTransform: 'none',
                            }}
                            variant="contained"
                            color="primary"
                            onClick={buscar}

                        >
                            Buscar
                        </Button>
                    </Box>
                </Accordion>
            </Grid>
        </Grid>

    )
}

export default Filter;






