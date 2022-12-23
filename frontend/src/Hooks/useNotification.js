import { useSnackbar } from 'notistack';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

/* 

preventDuplicate: true,

severity :  "default" , 'success', "Error", "Warning", "info"

persist: true ... para que se quede ahi pegada...

*/

const buttonStlyed ={
    outline : "none",
    border : "none",
    backgroundColor : "transparent",
    borderRadius : "0.2em",
    color : "rgb(0,0,0)",
    fontSize : "1.5rem",
    padding : "0",
    margin : "0",
    fontWieght : "bolder",
    textTransform: "capitalize",
}

export function useNotification(){


    const { enqueueSnackbar, closeSnackbar  } = useSnackbar();

    const closeNotification = (key)=>{
        closeSnackbar(key)
    }

    const callfunction=({message="Notificacion Emergente...",
                            title=false,
                            severity="default",
                            positionX = "left",
                            positionY = "bottom",
                            persist = false,
                            preventDuplicate = false
                        })=>{

        const confi = {
            autoHideDuration: 3000,
            preventDuplicate: preventDuplicate,
            persist : persist,
            anchorOrigin: {
                vertical: positionY,
                horizontal: positionX,
            },
            content : (key)=>{
                return <Alert variant='filled'
                              severity={severity} 
                              action={  <Button onClick={()=>closeNotification(key)}
                                                aria-label="cerrar"
                                                variant="outlined"
                                                severity="default"
                                                size="large"
                                                style={buttonStlyed}
                                                >
                                            &#10006;
                                        </Button>
                                    }
                              >
                                {title && <AlertTitle>{title}</AlertTitle>}
                                {message}
                        </Alert>
            }
        }

        enqueueSnackbar("default", confi)
    }

    return [ callfunction ]
}