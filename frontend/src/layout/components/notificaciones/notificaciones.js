import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GlobalNotificationsActions from './../../../Store/GlobalNotification-Slice';

import { Link } from 'react-router-dom';

import './notificacionesStyle.scss';

import { motion } from 'framer-motion';
import { useInternetDetector } from './../../../Hooks/useInternetDetector';


import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import DesappearComponent from './../../../components/DisappearComponent/DisappearComponent';


const PageAnimation = {in:{opacity:1}, out:{opacity:0}}

export default function NotificacionesGlobales(){
    const [ isOnline ] = useInternetDetector();

    const emailverification = useSelector(state=>state.notifications.emailverification);
    const dispach = useDispatch()

    const [ network, setNetwork ] = useState({ status:0, firstcheck:false });

    const handleDisapperNetwork = ()=>{
        setNetwork({...network, status: 0});
    }

    useEffect(()=>{

        if(!isOnline){
            setNetwork({...network, status:400})
        }else if(isOnline && network.firstcheck){
            setNetwork({...network, status:200, firstcheck:true})
        }else{
            setNetwork({...network, firstcheck:true})
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOnline])


    const handleDisapperNotify = ()=>{
        dispach(GlobalNotificationsActions.desactivateEmailVerification())
    }

    return(
     <Container maxWidth="xl">

        {network.status === 400 &&
            <motion.main initial="out" animate="in" exit="out" variants={PageAnimation}>
                <Alert onClose={handleDisapperNetwork}
                        variant="filled"
                        severity="error">
                            No hay conexion de internet &#9757; 
                </Alert>
            </motion.main>
        }

        {network.status === 200 &&
            <DesappearComponent time={2000}>
                <motion.main initial="out" animate="in" exit="out" variants={PageAnimation}>
                    <Alert 
                            variant="filled"
                            severity="success">
                                Se ha conectado nuevamente a la red de internet &#9889; 
                    </Alert>
                </motion.main>
            </DesappearComponent>
        }

        {emailverification && 
            <Alert onClose={handleDisapperNotify}
                    variant="filled"
                    severity="info">
                        Verifica tu correo y mantente conectado, &#9993; 
                        <Link to="/verificar-correo" 
                                className='link-colored'
                                onClick={handleDisapperNotify}>

                                Ingresa aqui el codigo que te enviemos

                            </Link>
            </Alert>
        }

      </Container>
    )
}