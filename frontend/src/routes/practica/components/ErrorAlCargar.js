import {extra} from './../../../Assets/Controlador';


export default function ErrorAlCargar({
                                        title="Parece que hubo un error",
                                        msj="No se pudo cargar este apartado de los ejercicios"
                                    }){
    return(
        <article className="error-panel">
            <div className="error-panel-img">
                <img src={extra.error} alt="no se ha encontrado la pagina imagen" />
            </div>
            <h2 className="error-panel-title">{title}</h2>
            <h3 className="error-panel-text">{msj}</h3>

        </article>
    )
}