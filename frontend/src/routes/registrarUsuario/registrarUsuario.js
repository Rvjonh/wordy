import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import './registroStyle.scss';

import WordyDataService from './../../Services/API-gateaway';

import GlobalNotificationsActions from "./../../Store/GlobalNotification-Slice";

import Alert from '@mui/material/Alert';
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';
import SessionActions from "./../../Store/Session-Slice";

import { useIfUserLogged } from './../../Hooks/useLogged';
import { useNotification } from '../../Hooks/useNotification';
import { useInternetDetector } from './../../Hooks/useInternetDetector'


const PageAnimation = {in:{opacity:1}, out:{opacity:0}}


export default function RegistrarUsuario (){
    useIfUserLogged();
    const [ isOnline ] = useInternetDetector();

    const [ notificar ] = useNotification()
    const dispach = useDispatch()

    const [inSubmit, setSubmit] = useState(false);
    const [messageFinal, setMessageFinal] = useState({status:0})
    const [validInputs, setValidInputs] = useState({
        name : true,
        email : true,
        pass : true,
        pass2: true
    });
    const [inputsData, setInputsData] = useState({
        name : "",
        email : "",
        pass : "",
        pass2 : ""
    });

    useEffect(() => {
        document.title = "Wordy - Registro";
        window.scrollTo(0,0);
    }, []);

    const setFocusToTextBox = ()=>{
        document.getElementById("name").focus();
    }

    const handleCheckValid = (event) =>{
        setInputsData({ ...inputsData,[event.target.id] : event.target.value });

        if(event.target.id === "pass2" && inputsData.pass !== event.target.value){
            setValidInputs({ ...validInputs, [event.target.id] : false });
        }else{
            setValidInputs({ ...validInputs, [event.target.id] : event.target.validity.valid });
        }
    }

    function isEmailValid(email) {
        // eslint-disable-next-line no-useless-escape
        const emailRegexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
    
        return emailRegexp.test(email)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(!isOnline){
            notificar({title:"Sin conexion de internet",
                        message:"No se puede realizar la siguiente accion porque no hay conexion a internet",
                        severity:"warning"})
            return;
        }

        if (!isEmailValid(inputsData.email)){
            setMessageFinal({status:402})
            return
        }

        setSubmit(true);
        WordyDataService.signup({
            username : inputsData.name,
            email : inputsData.email,
            password : inputsData.pass
        }).then((res)=>{
            setSubmit(false);
            setMessageFinal({status:200})
            dispach(SessionActions.Login({
                email : inputsData.email,
                token : res.data.Token,
                name : res.data.name,
                emailverification : res.data.emailverification
            }))
            dispach(GlobalNotificationsActions.setEmailVerification({
                emailverification : res.data.emailverification
            }))
        }).catch((err)=>{
            setSubmit(false);

            if (err.response.status===401){
                setMessageFinal({status:401})
            }else{
                setMessageFinal({status:400})
            }
        })
    }

    return (
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className='main-block'>
            <div className='header-title'>
                <h2 className="title-registro">Registrate en Wordy, y empieza a practicar vocabulario.</h2>
            </div>
            <div className='background-form'>
                
                <div className='form-block'>
                    <div className='title-form-block'>
                        <h3 onClick={setFocusToTextBox} className='title-form' title="Registrate llenando el formulario">Registro</h3>
                    </div>

                    {messageFinal.status===400 && 
                        <Alert variant="filled" severity="error">
                            Verifica tu informacion &#128400;
                         </Alert>
                    }
                    {messageFinal.status===401 && 
                        <Alert variant="filled" severity="error">
                            Correo electronico ya registrado &#128400;
                            <br/>
                            <Link to="/recuperar-contrasena">recuperar contraseña</Link>
                         </Alert>
                    }
                    {messageFinal.status===402 && 
                        <Alert variant="filled" severity="error">
                            Correo electronico no permitido &#128400;
                         </Alert>
                    }

                    <form className='form-data' onSubmit={handleSubmit}>
                        <label className='campo-input' htmlFor="name" title="Intruduce tu nombre con letras y/o espacios unicamente.">
                            Nombre:
                            <input className={validInputs.name? "" : "invalido"} disabled={inSubmit? "disabled" : ""} onChange={handleCheckValid} tabIndex="0" id="name" type="text" pattern="[A-Za-z\s]{1,40}" placeholder='William Shakespeare' required="required"/>
                        </label>
                        <label className='campo-input' htmlFor="email">
                            Correo Electronico:
                            <input className={validInputs.email? "" : "invalido"} disabled={inSubmit? "disabled" : ""} onChange={handleCheckValid} tabIndex="0" id="email" type="email" placeholder='BardoDeAvon@wordy.io' required="required"/>
                        </label>
                        <label className='campo-input' htmlFor="pass">
                            Contraseña:
                            <input className={validInputs.pass? "" : "invalido"} disabled={inSubmit? "disabled" : ""} onChange={handleCheckValid} tabIndex="0" id="pass" type="password" minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="24" placeholder='•••••••••••' required="required" title="Completa este campo con tu contraseña"/>
                        </label>
                        <label className='campo-input' htmlFor="pass2">
                            Confirma tu contraseña:
                            <input className={validInputs.pass2? "" : "invalido"} disabled={inSubmit? "disabled" : ""} onChange={handleCheckValid} tabIndex="0" id="pass2" type="password" minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="24" placeholder='•••••••••••' required="required" title="Repite este campo con tu contraseña"/>
                            <span className={`warning-message  ${!validInputs.pass2? "active":""}`}>Ambas contraseñas no son iguales</span>
                        </label>
                        
                        <div className='requirement-block'>
                            <b>Comprueba que tu contraseña:</b>
                            <ul className='requirement-list'>
                                <li>Contiene una cifra</li>
                                <li>Tiene entre 8 y 24 caracteres</li>
                                <li>No tiene espacios</li>
                                <li>Tiene signos (+ * - ! ¡ $ & .)</li>
                            </ul>
                        </div>

                        <label className='campo-rules' htmlFor="rules">
                            <input tabIndex="0" className="check-rules" id="rules" type="checkbox" disabled={inSubmit? "disabled" : ""} required="required"/>
                            <p>¿Aceptas los <Link to="/ayuda" state={{section:"Terminos y condiciones"}}>terminos y condiciones</Link>?</p>
                        </label>

                        {inSubmit? 
                            <button id="submit-button" tabIndex="0" type="submit" value="Submit" className="registro-button clicked" disabled>
                                Registrado...
                                <Spinner />
                            </button>
                        :
                            <button id="submit-button" tabIndex="0" type="submit" value="Submit" className="registro-button">
                                {messageFinal.status===0 && <span>Registro, es gratis.</span>}
                                {messageFinal.status===200 && <span>Registro Exitoso&#9989;</span>}
                                {messageFinal.status===400 && <span>Registro Fallido&#10060;</span>}
                                {messageFinal.status===401 && <span>Registro Fallido&#10060;</span>}
                                {messageFinal.status===402 && <span>Registro Fallido&#10060;</span>}
                            </button>
                        }

                    </form>
                </div>
            </div>
        </motion.main>
    );
}