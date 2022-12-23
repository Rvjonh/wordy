import { useState, useEffect } from "react";


import { useDispatch } from "react-redux";
import SessionActions from './../../Store/Session-Slice';
import GlobalNotificationsActions from "./../../Store/GlobalNotification-Slice";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import WordyDataService from './../../Services/API-gateaway';

import "./iniciarStyle.scss";
import Alert from '@mui/material/Alert';

import { useIfUserLogged } from './../../Hooks/useLogged';

import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';
import { useNotification } from "./../../Hooks/useNotification";
import { useInternetDetector } from './../../Hooks/useInternetDetector';

export default function Iniciar (){
    useIfUserLogged();
    const [isOnline] = useInternetDetector();

    const dispach = useDispatch();
    const [ notificar ] = useNotification();


    const PageAnimation = {in:{opacity:1}, out:{opacity:0}}

    const [inSubmit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
    })
    const [error, setError] = useState({status:0});

    useEffect(() => {
        document.title = "Wordy - Inicio de Sesión";
        window.scrollTo(0,0);
    }, []);

    const handleCheckValid = (event)=>{
        setInputs({...inputs, [event.target.id] : event.target.value})
    }

    function isEmailValid(email) {
        // eslint-disable-next-line no-useless-escape
        const emailRegexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
    
        return emailRegexp.test(email)
    }
    
    const handleLogin = (event)=>{
        event.preventDefault();

        if(!isOnline){
            notificar({title:"Sin conexion de internet",
                        message:"No se puede realizar la siguiente accion porque no hay conexion a internet",
                        severity:"warning"})
            return;
        }

        if (!isEmailValid(inputs.email)){
            setError({status:400})
            return
        }

        setSubmit(true);
        setError({status:0})

        WordyDataService.login({
            email : inputs.email,
            password : inputs.password
        })
        .then((res)=>{
            setSubmit(false);
            setError({status:0})
            dispach(SessionActions.Login({
                email : inputs.email,
                token : res.data.Token,
                name : res.data.name,
                emailverification : res.data.emailverification
            }))
            dispach(GlobalNotificationsActions.setEmailVerification({
                emailverification : res.data.emailverification==="true"?"":"true"
            }))
            notificar({message:`Un gusto volverte a ver ${res.data.name}`,
                        title:"Bienvenido",
                        severity:"info"})
        })
        .catch(err=>{
            setSubmit(false);
            setError({status:400})
        })
    }
    
    return(
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className="main-block">

            <div className="header-title">
                <h3 className="title-iniciar">Inicia Sesión, y guarda tus palabras en la nube.</h3>
            </div>

            {error.status===400 && 
                <Alert variant="filled" severity="error">
                    No se pudo conectar, verifica tus datos...
                </Alert>
            }

            <div className="form-block">
                <form className="form-data" onSubmit={handleLogin}>
                    <label className='campo-input' htmlFor="email" title="Intruduce tu correo electronico.">
                        Correo Electronico:
                        <input onChange={handleCheckValid} value={inputs.email} tabIndex="0" id="email" type="email" placeholder='tucorreo@wordy.io' required="required"/>
                    </label>
                    <label className='campo-input' htmlFor="password">
                        Contraseña:
                        <input onChange={handleCheckValid} value={inputs.password} tabIndex="0" id="password" type="password" minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="30" placeholder='•••••••••••' required="required" title="Completa este campo con tu contraseña"/>
                    </label>
                    
                    <Link className="enlace-recuperar" to="/recuperar-contrasena">
                        ¡He olvidado mi contraseña!
                    </Link>

                    <button className={`iniciar-button ${inSubmit? "clicked" : ""}`} disabled={inSubmit? "disabled" : ""} tabIndex="0" type="submit" value="Submit">
                        Iniciar Sesión
                        {inSubmit && <Spinner />}                        
                    </button>
                </form>

                <Link className="enlace-registrar" to="/registro">
                    ¿No tienes cuenta? ¡Registrate!
                </Link>

            </div>

        </motion.main>
    );
}