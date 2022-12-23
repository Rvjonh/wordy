import { Link } from "react-router-dom"

import './registrarButtonStyle.scss';

export default function RegistrarButton(){
    return(
        <Link className="registrar-button" to="/registro">Registrarse</Link>
    )
}