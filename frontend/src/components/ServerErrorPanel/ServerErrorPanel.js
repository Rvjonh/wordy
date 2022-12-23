import { extra } from './../../Assets/Controlador';
import './style.scss';

export default function ServerErrorPanel({title="Actualmente el servidor falla",
                                        text= "Lo cual nos impide mostrarte listas de diccionarios" }){
    return(
        <section className='container'>
            <img className='img-container' src={extra.serverError} alt="logo de error del servidor" />
            <h3 className='msj-title'>{title}</h3>
            {text!=="" && 
                <p className='msj-text'>{text}</p>
            }
        </section>
    )
}