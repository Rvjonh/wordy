import { Link } from 'react-router-dom';

import { extra } from '../../../Assets/Controlador';

import './messageNoneStyle.scss';

export default function NoneDiccionaries({text="Actualmente no tienes diccionarios para practicar,", linkText="agrega uno."}){
    return(
        <div className="none-container">
            <figure className="message">
                <img className='message-img' src={extra["noneDiccionaries"]} alt="Estante vacio porque no hay diccionarios" />
                <figcaption>
                    {text}&nbsp;
                    <Link to="/agregar-diccionario">{linkText}</Link>
                </figcaption>
            </figure>
        </div>
    )
}