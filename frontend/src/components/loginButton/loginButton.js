import { Link } from 'react-router-dom';

import './loginButtonStyle.scss';

export default function LoginButton(){
    return(
        <Link className="login-button" to="/iniciar-sesion">Ingresar</Link>
    )
}