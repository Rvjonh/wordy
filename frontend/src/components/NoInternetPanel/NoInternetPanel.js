
import { extra } from './../../Assets/Controlador';
import './style.scss';

export default function NoInternetPanel({title="Actualmente no tienes conexión de internet",
                                        text= "Lo cual nos impide mostrarte listas de diccionarios" }){
    return(
        <section className='container'>
            <img className='img-container' src={extra.noInternet} alt="logo de desconexion de internet" />
            <h3 className='msj-title'>{title}</h3>
            {text!=="" && 
                <p className='msj-text'>{text}</p>
            }
        </section>
    )
}