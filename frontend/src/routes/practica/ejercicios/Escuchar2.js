import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';

import WordPlayer from './../components/WordPlayer';
import playWord, { getVoiceByName } from './../../../Functions/playWord';
import getRandomArray from './../../../Functions/getRandomArray';
import getRandomWords from './../../../Functions/getRandomWords';

export default function Escuchar2({ language="", 
                                    word={}, 
                                    dictionary=[], 
                                    counter=null, 
                                    setCounter=f=>f, 
                                    moveToLast=f=>f,
                                    handleRegisterInteraction=f=>f,
                                }){
    const DICCIONARIOS = useSelector(state=>state.diccionarios);
    const voices = useSelector(state=>state.voices);

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null)


    const [flag, setFlag] = useState(false);
    const [flagInput, setInputFlag] = useState({value:true, class : "none"});

    const buttonPress = useRef(null);

    useEffect(()=>{
        playWord(word.name, language, getVoiceByName(voices[language]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(dictionary.length<=0){
            setOptions(null)
        }else{
            let newOptions = dictionary.filter((item)=>item.name!==word.name)
            if(newOptions.length <=2){
                let auxArray = [];

                for(let i=0; i<DICCIONARIOS.diccionarios.length; i++){

                    for(let j=0; j<DICCIONARIOS.diccionarios[i].words.length; j++){
                        if(auxArray.length<25){
                            if(word.name !== DICCIONARIOS.diccionarios[i].words[j].name){
                                auxArray.push(DICCIONARIOS.diccionarios[i].words[j])
                            }
                        }else{
                            break;
                        }
                    }
                    if(auxArray.length>=25){
                        break;
                    }
                }
                if(auxArray.length >=2){
                    newOptions = auxArray
                }else{
                    newOptions = getRandomWords(2)
                }
            }
            getRandomArray(newOptions);
            newOptions = newOptions.slice(0,2)
            newOptions.push(word)
            getRandomArray(newOptions);
            setOptions(newOptions)
        }

    },[dictionary, word, DICCIONARIOS.diccionarios])


    useEffect(()=>{
        document.addEventListener("keypress",pressSelectionButton)
        return()=>{
            document.removeEventListener("keypress",pressSelectionButton)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const pressSelectionButton = (e)=>{
        if(e.keyCode === 49){
            handleSelection(0)
            
        }else if(e.keyCode === 50){
            handleSelection(1)
            
        }else if(e.keyCode === 51){
            handleSelection(2)
        }
        
        if(e.ctrlKey && e.keyCode===0){
            playWord(word.name, language, getVoiceByName(voices[language]))
        }
    }

    const handleSelection=(index)=>{
        if(flagInput.value){
            setSelected(index);
            setFlag(true);
            if(buttonPress.current !==null){
                buttonPress.current.focus();
            }
        }
    }

    const isSelected = (index)=>{
        try{
            return selected === index;
        }catch{
            return false;
        }
    }

    const comprobar = ()=>{
        if(!flag){
            return;
        }

        setFlag(false);
        document.removeEventListener("keypress",pressSelectionButton)

        if(options[selected].name.toLowerCase() === word.name.toLowerCase()){
            setInputFlag({value:false, class : "success"})
            playWord(word.name, language, getVoiceByName(voices[language]))
        }else{
            setInputFlag({value:false, class : "error"})
        }
    }

    const next=()=>{
        setFlag(false);
        setInputFlag({value:true, class : "none"});
        
        if(flagInput.class === "success"){
            setCounter(counter+1);
            handleRegisterInteraction([word])
        }else{
            moveToLast(counter, word);
        }
    }
    
    const shipWord=()=>{
        setFlag(false);
        setInputFlag({value:true, class : "error"});
        
        setCounter(counter+1);
    }

    useEffect(()=>{

        if(!flagInput.value){
            document.addEventListener("keypress",pressNextButton)
        }
        return()=>{
            document.removeEventListener("keypress",pressNextButton)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagInput])

    const pressNextButton=(e)=>{
        if(e.keyCode === 13){
            next()
        }
    }

    return(
    <>
        <article className="ejercicio1">

            <h2 className="title-e">
                <picture className="img-ejercicio">
                    <img src={EJERCICIOS_ASSETS.ESCUCHAR} draggable={false} alt="logo de representacion para ejercicios de escritura" />
                </picture>
                Selecciona la palabra que escuches:
            </h2>

            <span className="extra-controls">
                <WordPlayer word={word.name} language={language} />
            </span>

            <div className="ejercicio-container flex-column">
                {options.map((item, index)=>{
                    return <button key={index} 
                                    className={`item-option ${isSelected(index)? "selected": ""}`}
                                    onClick={()=>handleSelection(index)}
                                    >
                        <span className="number-option">{index+1})</span>
                        <span className="text-option">{item.name}</span>
                    </button>
                })}
           </div>

        </article>

        <section className={`commands-section ${flagInput.class}`}>

            {flagInput.value ?
            <>
                <Button onClick={shipWord} variant="outlined" size="large" color="error">
                    Saltar
                </Button>

                <Button onClick={comprobar} ref={buttonPress} disabled={!flag} variant="contained" size="large" color="success">
                    Comprobar
                </Button>
            </>
            :
            <>
                {flagInput.class==="success" && 
                    <span className="msj-bloq">
                        <span className="item">&#9989;Respuesta correcta &#128077;</span>
                        <span className="item">Significado: {word.meaning}</span>
                    </span>
                }

                {flagInput.class==="error" && 
                    <span className="msj-bloq">
                       <span className="item">&#10060;Respuesta incorrecta &#10071;</span>
                       <span className="item">Correcta: {word.name}</span>
                    </span>
                }
                
                <Button onClick={next} variant="contained" size="large" color="success">
                    Siguiente
                </Button>
                
            </>
            }

        </section>
    </>
    )
}