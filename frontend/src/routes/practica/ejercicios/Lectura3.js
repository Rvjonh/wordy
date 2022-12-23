import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';
import Button from '@mui/material/Button';

import getRandomArray from './../../../Functions/getRandomArray';
import playWord, {getVoiceByName} from './../../../Functions/playWord';


export default function Lectura3({ array=[],
                                    language="",
                                    counter=null,
                                setCounter=f=>f,
                                handleRegisterInteraction=f=>f,
                            }){

    const voices = useSelector(state=>state.voices);

    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);

    const [selection, setSelection] = useState({A:{} , B:{}});
    const [completedSelection, setCompletedSelection] = useState([]);
    const [errorSelected, setErrorSelected] = useState({A:null, B:null});

    const [flag, setFlag] = useState(false);
    const [flagInput, setInputFlag] = useState({value:true, class : "none"});


    useEffect(()=>{
        let aux1 = [...array];
        let aux2 = [...array];

        getRandomArray(aux1)
        getRandomArray(aux2)

        setOptions1(aux1)
        setOptions2(aux2)

    },[array])

    const handleASelection =(item)=>{
        setSelection({...selection, A:item})
    }
    
    const handleBSelection =(item)=>{
        setSelection({...selection, B:item})
    }

    useEffect(()=>{
        if(stringsEqual(selection.A.name, selection.B.name)){
            setSelection({A:{} , B:{}})
            setCompletedSelection([...completedSelection, selection.A.id])

            playWord(selection.A.name, language, getVoiceByName(voices[language]))

            if(completedSelection.length >= array.length-1){
                setFlag(true)
                setInputFlag({value:true, class : "success"});
            }
        }else if(selection.A.name !== undefined && selection.B.name !==undefined){

            setErrorSelected({A:selection.A.id, B:selection.B.id})
            setSelection({A:{} , B:{}})
            
            setTimeout(()=>{
                setErrorSelected({A:null, B:null})
            },1000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selection])

    const stringsEqual =(str1, str2)=>{
        if(str1 === undefined || str2 === undefined){
            return false;
        }else if(str1.toLowerCase() === str2.toLowerCase()){
            return true;
        }else{
            return false;
        }
    }

    const isSelected = (Part, id)=>{
        if(errorSelected[Part] === id){
            return "error";

        }else if(selection[Part].id === id){
            return "selected"
        }else{
            return "";
        }
    }

    const getStyleState = (id)=>{

        if(completedSelection.includes(id)){
            return "success";
        }else{
            return "";
        }
    }

    //Cambiar desde aqui para otros ejerccios ...

    const next=()=>{
        // reiniciar ejercio ...
        setOptions1([])
        setOptions2([])
    
        setSelection({A:{} , B:{}});

        setCompletedSelection([]);
        setErrorSelected({A:null, B:null});
        
        setFlag(false);
        setInputFlag({value:true, class : "none"});
        if(flagInput.class === "success"){
            setCounter(counter+1);
            handleRegisterInteraction(array)
        }
    }
    
    const shipWord=()=>{
        setInputFlag({value:false, class:"error"})
    }

    const nextOmited=()=>{
        // reiniciar ejercio ...
        setOptions1([])
        setOptions2([])
    
        setSelection({A:{} , B:{}});

        setCompletedSelection([]);
        setErrorSelected({A:null, B:null});
        
        setFlag(false);
        setInputFlag({value:true, class : "none"});
        setCounter(counter+1);
    }

    return(
    <>
        <article className="ejercicio1">

            <h2 className="title-e">
                <picture className="img-ejercicio">
                    <img src={EJERCICIOS_ASSETS.LEER} draggable={false} alt="logo de representacion para ejercicios de escritura" />
                </picture>
                Selecciona los pares
            </h2>
            
            <div className="ejercicio-columns">

                <div className="ejercicio-container flex-column flex-top">
                    <h2>Nombre</h2>
                        {options1.map((item, index)=>{
                            return <button key={index} 
                                            className={`item-option item-option-expanded ${isSelected("A", item.id)}  ${getStyleState(item.id)}`}
                                            onClick={()=>handleASelection(item)}
                                            disabled={completedSelection.includes(item.id)}
                                            >
                                <span className="text-option">{item.name}</span>
                            </button>
                        })}
                </div>
                <div className="ejercicio-container flex-column flex-top">
                    <h2>Significado</h2>

                        {options2.map((item, index)=>{
                            return <button key={index} 
                                            className={`item-option item-option-expanded ${isSelected("B", item.id)} ${completedSelection.includes(item.id)? "success": ""}`}
                                            onClick={()=>handleBSelection(item)}
                                            disabled={completedSelection.includes(item.id)}
                                            >
                                <span className="text-option">{item.meaning}</span>
                            </button>
                        })}
                </div>

            </div>


        </article>
        {/* //Cambiar hasta aqui para otros ejerccios ... */}

        <section className={`commands-section ${flagInput.class}`}>

            {flagInput.value ?
            <>
                <Button onClick={shipWord} disabled={flag}  variant="outlined" size="large" color="error">
                    Saltar
                </Button>

                <Button onClick={next} disabled={!flag} variant="contained" size="large" color="success">
                    Siguiente
                </Button>
            </>
            :
            <>

                {flagInput.class==="error" && 
                <>
                    <span className="msj-bloq">
                       <span className="item">&#10060;Se ignorará  &#10071;</span>
                    </span>
                </>
                }
                
                <Button onClick={nextOmited} variant="contained" size="large" color="success">
                    Siguiente
                </Button>
                
            </>
            }

        </section>
    </>
    )
}