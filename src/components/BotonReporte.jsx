import { Button } from "@mui/material";
import FeedIcon from '@mui/icons-material/Feed';


const BotonReporte = ({ onClick }) => {

return(


<Button onClick={onClick}
variant="contained"
color="primary"
sx={{
    right: 0,
    float: { xs: 'none', md: 'right' },  // Agrega float a la derecha en pantallas medianas y grandes, elimina en pantallas pequeñas
    marginBottom : '15px',
    fontSize: '1.1em',
    //le saco las mayusculas
    textTransform: 'none',
    minWidth: '40px',
    height: '50px',
    color: 'white',
}}
>
<FeedIcon sx={{mr:1}}/>

Generar reporte
</Button>
)
}

export default BotonReporte;