import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';

import { useNotification } from './../../Hooks/useNotification';
import WordyDataService from './../../Services/API-gateaway';

import './NuevaContraseñaStyle.scss';

import ButtonToDirection from './../../components/ButtonToHome/ButtonToHome'
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

function NuevaContrasenaToken(){
    const navigate = useNavigate();
    const params = useParams();

    if (params.token === null || params.token===""){
        navigate('./iniciar-sesion');
    }

    useEffect(() => {
        try{
            let token = params.token;
            navigate('/recuperar-contrasena/user', { state:{ "token":token } })
        }catch(e){
            navigate('/iniciar-sesion')
        }
    }, [navigate, params]);

    return null;
}



function NuevaContrasena(){
    const navigate = useNavigate();
    const location = useLocation();
    const [notificar] = useNotification()

    const [token, setToken] = useState("");
    const [inputs, setInputs] = useState({password:"", repeatpassword:""})
    const [status, setStatus] = useState(0)

    useEffect(() => {
        document.title = "Wordy - Establecer Contraseña";
    }, []);

    useEffect(() => {
        try{
            setToken(location.state.token)
        }catch(e){
            navigate('/iniciar-sesion');
        }

    }, [location, navigate]);

    const handleInputsChange=(e)=>{
        setStatus(0)
        setInputs({...inputs, [e.target.id] : e.target.value})
    }

    const handleSendNewPassword =(e)=>{
        e.preventDefault()

        if (inputs.password !== inputs.repeatpassword){
            setStatus(50);
            return;
        }

        setStatus(100)

        WordyDataService.setNewPassword({token:token, newpassword: inputs.password}).then(res=>{
            setStatus(200)
        }).catch(err=>{
            setStatus(400)
            notificar({title:"No se ha podido actualizar",
                        message:err.response.data.Error+" o expirado. Solicita uno nuevo a tu correo.",
                        severity:"error"})
        })
    }

    return(
        <div className="body-container">
            <header className="header-top">
                <h1>
                    <Link className="title" to='/'>Wordy</Link>
                </h1>
            </header>
            <main className="container-recover-password">
                <h3 className="title-form">Establecer nueva contraseña</h3>
                <p>Establece una nueva contraseña para tu cuenta.</p>

                <form className="form" onSubmit={handleSendNewPassword}>
                    <label className='campo-input' htmlFor="password">
                        Contraseña:
                        <input onChange={handleInputsChange} tabIndex="0" id="password" type="password" minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="24" placeholder='•••••••••••' required="required" title="Completa este campo con tu contraseña"/>
                    </label>

                    <label className='campo-input' htmlFor="repeatpassword">
                        Confirma tu contraseña:
                        <input onChange={handleInputsChange} tabIndex="0" id="repeatpassword" type="password" minLength="8" pattern="[A-Za-z0-9(+|*|-|!|¡|$|&|.)]{8,24}"  maxLength="24" placeholder='•••••••••••' required="required" title="Repite este campo con tu contraseña"/>
                        <span className={`warning-message ${status===50?"active":""}`}>
                            Ambas contraseñas no son iguales
                        </span>
                    </label>

                    <button className={`registro-button ${status===200?"active":""}`} disabled={status===200}>
                        <b>Actualizar</b>
                        {status===100 && <Spinner />}
                        {status===200 && <span> &#9989;</span>}
                        {status===400 && <span> &#10060;</span>}
                    </button>
                </form>
            </main>
            {status===400 &&(
                <>
                <h3>Correo o Token expirado, solicita uno nuevo</h3>
                <ButtonToDirection direction="/recuperar-contrasena" texto="Recuperar Contraseña" />
                </>
            )}
            {status===200 &&(
                <>
                <h3>Contraseña establecida exitosamente</h3>
                <ButtonToDirection direction="/iniciar-sesion" texto="Iniciar Sesion" bg="green" />
                </>
            )}
        </div>
    )
}

export { NuevaContrasenaToken, NuevaContrasena}