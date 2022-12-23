import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import './NotificacionesStyle.scss';

import { useNotification } from './../../Hooks/useNotification';

import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import ProcessButton from './../../ComunComponents/processButton/ProcessButton';

//import IconNotificacion from './assets/icon.png';

//import  {registerServiceWorker } from './pushManager';

const getNotificationState=()=>{
    let noti = window.Notification || window.mozNotification || window.webkitNotification;

    if(!("Notification" in window)){
        alert("This browser does not support desktop notification");
        return false;
    }else if(noti.permission === 'granted'){
        return true;
    }else if(noti.permission === 'denied'){
        return false
    }
    return false
}



const ToggleNotification =({state=false, onChange=f=>f, })=>{
    const [ notificar ] = useNotification()

    const handleNotification=()=> {
        try {
            Notification.requestPermission().then((permission) => {
                onChange(getNotificationState())
            })
        } catch(e) {
            Notification.requestPermission(function(permission) {
                onChange(getNotificationState())
            });
        }
        notificar({title:"Permite las notificaciones en tu navegador",
                        message:"Activalas en el candado al lado de la barra de busqueda",
                        severity:"info",
                        preventDuplicate:true})
    }

    useEffect(()=>{
        if (state){
            console.log("registrar servi")
            //registerServiceWorker();
        }else{
            console.log("borrar worker")
        }
    },[state])

    return(
        <div>
            <Typography sx={{fontWeight:"700"}}>
                {state? "Activadas":"Apagadas"}
            </Typography>
            <Switch checked={state} onChange={handleNotification} name="loading" color="success"/>
        </div>
    )
} 







const PageAnimation = {in:{opacity:1}, out:{opacity:0}}
export default function NotificacionPanel(){

    const data = {
        notificacion : {
            dias : [],
            hora : "00:00"
        }
    }
    const [allow, setAllow] = useState(getNotificationState());
    const [notify, setNotify] = useState({...data.notificacion});
    const days = ["D", "L", "M", "Mi", "J", "V", "S"];

    const handleAddAllDays = ()=>{
        let flag = false;
        days.forEach((value)=>{
            if(!notify.dias.includes(value)){
                flag = true;
            }
        });
        //if it's missed any day, add them all, ifnot remove all of them 
        if(flag){
            setNotify({
                ...notify,
                dias: days
            });
        }else{
            setNotify({
                ...notify,
                dias: []
            });
        }

    }

    const handleTimeNotify =(event)=>{
        setNotify({
            ...notify,
            hora : event.target.value
        });
    }

    const handleChangeNotifyDays = (event)=>{
        const item = event.target.textContent; 

        if(notify.dias.includes(item)){
            setNotify({
                ...notify,
                dias : arrayRemove(notify.dias, item)
            });
        }else{
            setNotify({
                ...notify,
                dias:notify.dias.concat(item)
            });
        }
    }

    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele !== value; 
        });
    }

    const isDataChanged = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

    const showNoty =()=>{
       /*  const notificacion = new Notification("Hola, te recuerdo tu practica.",{
            icon: IconNotificacion,
            body: "Practica, divierte y aprender 5 min en wordy",
            badge: IconNotificacion,
        });
        notificacion.onclick = function(){
            window.open("/aprender");
        } */
    }

    return(
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className="main-perfil">
        <div className='notification-profile'>
            <button onClick={showNoty}>click on notificacion</button>

            <div className='title-notification'>
                <h3 className='title'>Notificaciones
                <ToggleNotification state={allow} onChange={setAllow} />
                
                </h3>
                <p className='title-explicacion' >
                    Asigna una notificacion para el dispositivo que estas utilizando,
                    te avisara los dias y a la hora que asignes, utilizalo para recordar practicar
                    o utilizar la aplicacion.<br/>
                    <a href="https://www.bing.com/search?q=como+permitir+las+notificaciones+en+mi+navegador&cvid=f34ea571e74d4b1fa18d837357bd7aad&aqs=edge..69i57j0l2.14030j0j4&FORM=ANAB01&PC=U531"
                        target="_blank" rel='noreferrer' style={{color:"red"}}>
                        'Debes permitir las notificaciones en tu dispositivo'
                    </a>
                </p>
            </div>

            <div className='componentes-notification'>
                <div className={!allow ? 'bloquear-notificacion':''}></div>

                <div className='days-component'>
                    <p className='title-days-component'>Dias</p>
                    <button className='button-days' onClick={handleAddAllDays}>
                        Todos
                    </button>
                    <div className='container-days'>
                        <ul className='list-days'>
                            {days.map((item, index)=>{
                                return <li className={`item-days ${notify.dias.includes(item)? 'active':""}`} 
                                            key={index}
                                            onClick={handleChangeNotifyDays}
                                            >{item}</li>
                            })}
                        </ul>
                    </div>
                </div>
                
                <div className='time-component'>

                    <div className='block-time'>

                        <label className='title-time' htmlFor='appt-time'>Hora

                            <div className='border-input'>
                                <input onChange={handleTimeNotify} 
                                className="time-input"
                                id="appt-time" 
                                type="time" 
                                name="appt-time"
                                max="12:00"
                                value={notify.hora} />
                            </div>
                            
                        </label>

                    </div>

                </div>

                <div>
                    <ProcessButton state={isDataChanged(notify, data.notificacion)}
                                    className="time-button" 
                                    message="Actualizar"/>
                </div>
            </div>


        </div>
        
        </motion.main>
    )
}