import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import { useSelector, useDispatch } from 'react-redux';
import SessionActions from './../../Store/Session-Slice';
import GlobalNotificationsActions from "./../../Store/GlobalNotification-Slice";

import { Link } from 'react-router-dom';

import './perfilStyle.scss';
import foto from './assets/cuenta-icon.png';

import { useNotLogged } from '../../Hooks/useNotLogged';
import { useNotification } from '../../Hooks/useNotification';
import { isEmailValid } from './../../Hooks/Functions/isEmailValid';
import { useInternetDetector } from './../../Hooks/useInternetDetector'


import WordyDataService from './../../Services/API-gateaway';

import Tooltip from '@mui/material/Tooltip';

import ProcessButton from '../../ComunComponents/processButton/ProcessButton.js';
import ComfirmFieldModal from './../../components/ComfirmFieldModal/ComfirmFieldModal.js';

function Perfil (){
    useNotLogged('/iniciar-sesion');
    const [ isOnline ] = useInternetDetector();

    const STATE = useSelector( state => state.session)
    const dispach = useDispatch()
    const [ notificar ] = useNotification()

    const data = {
        img : foto,
        profile:{
            name : STATE.name,
            email : STATE.email,
            password : ""
        }
    }

    
    const PageAnimation = {in:{opacity:1}, out:{opacity:0}}

    const [Photo] = useState( data.img );

    const [profileData, setProfileData] = useState({...data.profile});
    const [popup, setPopup] = useState(false);
    const [valuepass, setValuepass] = useState("");


    useEffect(() => {
        document.title = "Wordy - Perfil";
    }, []);
    
    const handleChangeUpdateData = (event)=>{
       setProfileData({
           ...profileData,
           [event.target.id] : event.target.value
       })
    }

    const isDataChanged = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

    const handleComfirmUpdate =(e)=>{
        e.preventDefault()

        if(!isOnline){
            notificar({title:"Sin conexion de internet",
                        message:"No se puede realizar la siguiente accion porque no hay conexion a internet",
                        severity:"warning"})
            return;
        }

        if (STATE.emailverification === "false"){
            notificar({title:"Confirma tu correo",
                        message:"Debes confirmar tu correo primero para actualizar datos",
                        severity:"warning"})
            dispach(GlobalNotificationsActions.activateEmailVerification())
            return;
        }

        if (!isEmailValid(profileData.email)){
            notificar({title:"Correo electronico no valido",
                        message:"Debes de ingresar un correo valido",
                        severity:"error"})
            return
        }

        setPopup(true);
        setValuepass("")
    }
    
    const UpdatateUserData =()=>{

        if (valuepass.length > 0){
            setPopup(false);

            const data ={
                email : STATE.email,
                password : valuepass,
                newname: profileData.name,
                newemail: profileData.email,
                newpassword : profileData.password
            }

            WordyDataService.updataUser(data).then(res=>{
                dispach(SessionActions.Login({
                    name : res.data.data.name,
                    email : res.data.data.email,
                    emailverification : res.data.data.emailverification,
                    token : STATE.token
                }))
                setProfileData({...profileData, password : ""})

                notificar({message:"Datos del perfil actualizados",
                            title:"Actualizacion completada",
                            severity:"success"})
                        })

            .catch(err=>{

                if (err.response.status === 401){
                    notificar({title:"Confirma tu correo",
                        message:"Debes confirmar tu correo primero para actualizar datos",
                        severity:"warning"})
                        
                }else if(err.response.status === 402){
                    notificar({title:"Error al asignar un nuevo correo",
                        message:"El correo sumistrado esta siendo utilizado por otro usuario",
                        severity:"warning"})
                
                }else{
                    notificar({message:"Comprueba tus datos y/o tu conexion",
                                title:"No se ha podido actualizar",
                                severity:"error"})
                }
            })
        }
    }

    return(
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className="main-perfil">
            <div className='header-perfil'>
                <h2 className='header-title'>Perfil</h2>
            </div>

            <div className='data-profile'>

                <picture className='img-perfil'>
                    <img src={Photo} alt="imagen de perfil del usuario"/>
                </picture>

                <div className='info-perfil'>
                    <form className='form-perfil' onSubmit={handleComfirmUpdate}>
                        <label className='campo-input' htmlFor="name" title="Intruduce tu nombre con letras y/o espacios unicamente.">
                            Nombre:
                            <input className='input-text-field' onChange={handleChangeUpdateData} tabIndex="0" id="name" type="text" value={profileData.name} pattern="[A-Za-z\s]{1,40}" placeholder='William Shakespeare' maxLength={40} required="required"/>
                        </label>
                        <label className='campo-input' htmlFor="email" title="Tu correo actual">
                            <span>
                                Correo Electronico:
                                {STATE.emailverification==="true" &&
                                    <Tooltip title="Verificado" arrow placement="top">
                                        <span>&#9989;</span>
                                    </Tooltip>
                                }
                            </span>
                            <input className='input-text-field' onChange={handleChangeUpdateData} tabIndex="0" id="email" type="email" value={profileData.email} placeholder='tucorreo@wordy.io' maxLength={40} required="required"/>
                        </label>
                        <label className='campo-input' htmlFor="password">
                            Contraseña:
                            <input className='input-text-field' onChange={handleChangeUpdateData} tabIndex="0" id="password" type="password" value={profileData.password} minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="24" placeholder='•••••••••••' title="Completa este campo con tu contraseña"/>
                        </label>
                        {STATE.emailverification==="false" &&
                           <Link to="/verificar-correo"
                                 className="warning-error">
                                Verifica tu correo electronico haciendo click aqui...
                            </Link>
                        }

                        <div className='submit-data-block'>
                            <ProcessButton state={isDataChanged(profileData, data.profile)}
                                            className="submit-button" 
                                            message="Actualizar"
                                            onClick={handleComfirmUpdate}/>

                            <ComfirmFieldModal activated={popup}
                                                  onActivated={setPopup} 
                                                  valueField={valuepass}
                                                  setValueField={setValuepass}
                                                  onAcepted={UpdatateUserData}/>
                        </div>
                    </form>
                </div>
            </div>

        </motion.main>
    );
}

export default Perfil;