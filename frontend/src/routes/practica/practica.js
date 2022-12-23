import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import ConfiguracionPractica from './../configuracion/configuracion';
import SelectWords from './subComponents/selectionWords';
import MainWraper from './../../components/MainWraper/Main';

import EjerciciosPanel from './EjerciciosPanel';
import Spinner from "../../ComunComponents/spinnerImg/spinnerComponent";

export default function Practica(){
    const location = useLocation();
    const configuracion = useSelector(state=>state.practiceConfi)
    const navigate = useNavigate();
    

    const [process, setProcess] = useState({
                                                configuracion : configuracion.ask,
                                                diccionario : "loading",
                                                palabras : "loading",
                                            });

    const [diccionario, setDiccionario] = useState(null);
    const [palabras, setPalabras] = useState([]);
   

    //get the diccionary where the practice is running ...
    useEffect(() => {
        if(location.state !== null){
            setDiccionario(location.state)
            setProcess({...process, diccionario:"loaded"})
        }else{
            navigate('*')
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    
    const onAccept = ()=>{
        if(location.state !== null){
            setDiccionario(location.state)
            setProcess({...process, configuracion:true, diccionario:"loaded"})
        }else{
            navigate('*')
        }
    }
    
    const handleWordsSelected = (arraySelectedWords)=>{
        setPalabras(arraySelectedWords)
        setProcess({...process, diccionario:"", palabras:"loaded"})
    }

    const getDictionaryData=()=>{
        let aux = {...diccionario}
        delete aux.words;
        return aux;
    }

    //Render components ...

    if(!process.configuracion){
        return <ConfiguracionPractica buttonMsj="Siguiente" onAccept={onAccept}/>
    }

    if(process.diccionario === "loaded"){
        return <SelectWords allWords={diccionario.words.filter(item=>item.state !== "delete")} onAccept={handleWordsSelected} />
    }else if(process.diccionario === "loading"){
        return  <MainWraper>
                    <Spinner text="Cargando Diccionario ..."/>
                </MainWraper>
    }
    
    return (
        <EjerciciosPanel language={diccionario.language}
                         Palabras={palabras}
                         DiccionarioInfo={getDictionaryData()}
                         Diccionario={diccionario.words.filter(item=>item.state !== "delete")} />
    )
}