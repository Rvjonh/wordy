import { useNavigate } from 'react-router-dom';

export default function AgregarDiccionarioLink(){
    const navigate = useNavigate()

    const toAgregarDiccionario=()=>{
        navigate('/agregar-diccionario')
    }

    return(
        <button className="add-diccionary-button" onClick={toAgregarDiccionario}>
            <span className="text-button">Agregar Diccionario</span>
        </button>
    )
}