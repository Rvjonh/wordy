import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import WordyDataService from './../../Services/API-gateaway';
import { useIfUserLogged } from './../../Hooks/useLogged';
import { useNotification } from './../../Hooks/useNotification';

import './recuperarStyle.scss';

import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import { motion } from "framer-motion";
const PageAnimation = {in:{opacity:1}, out:{opacity:0}}



export default function RecuperacionPassword (){
    useIfUserLogged();

    useEffect(() => {
        document.title = "Wordy - Recuperar Contraseña";
    }, []);


    return(
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation}
             className='main-block-recuperar'>
                 
            <div className='recuperar-header-title'>
                <h3 className='recuperar-title'>Recuperar contraseña</h3>
            </div>

            <div className='part-context'>
                <PanelRecoveryPassword />
            </div>

        </motion.main>
    );
}

function PanelRecoveryPassword (){
    const [ notificar ] = useNotification() 

    const [buttonClassName, setbuttonClassName] = useState('send-code-button');
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(0)


    const handleEmailInput = (event)=>{
        setEmail(event.target.value)

        let isEmailInputValid = event.target.value.length > 0 && event.target.validity.valid
        
        if(isEmailInputValid){
            setStatus(0);
            setbuttonClassName("send-code-button active");
        }else{
            setbuttonClassName("send-code-button");
        }
    }

    const handleSendCode = (event)=>{
        event.preventDefault();
        setbuttonClassName("send-code-button clicked");
        setStatus(100);

        WordyDataService.sendEmailPassword({email:email}).then(res=>{
            setStatus(200)
            notificar({title:"Correo enviado exitosamente",
                        message:"Debes revisar tu correo y seguir las instrucciones indicadas en el.",
                        severity:"success",
                        persist:true
                    })

        }).catch(err=>{
            console.log(err)
            setStatus(400)
            setStatus(404)
            notificar({title:"No se ha podido enviar",
                        message: err.response.data.Error,
                        severity:"error",
                        persist:true
                    })
        })

    }

    return(
        <div className='part-block'>
            <p className='message-block'>
                Vamos a enviarte un correo a tu correo electronico, 
                sigue la instrucciones para poder recuperar tu cuenta.
                Por favor ingresa tu correo electronico. Si no tienes cuenta, puedes 
                <Link to="/registro"> ¡Registrate!</Link>
            </p>

            <form className='email-form' onSubmit={handleSendCode}>
                <label className='field-email' htmlFor="email">
                    Correo Electronico:
                    <input className='input-text-field' value={email} onChange={handleEmailInput} tabIndex="0" id="email" type="email" placeholder='tucorreo@wordy.io' required="required"/>
                </label>
                <button className={buttonClassName}
                        tabIndex="0"
                        type="submit"
                        value="Submit"
                        disabled={status===200? true:false}>
                    Enviar codigo
                    {status===100 && <Spinner />}
                    {status===200 && <span>&#9989;</span>}
                    {status===404 && <span>&#10060;</span>}
                </button>
            </form>
        </div>
    )
}
