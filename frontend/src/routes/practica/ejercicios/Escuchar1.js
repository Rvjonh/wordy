import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';

import WordPlayer from './../components/WordPlayer';
import playWord, { getVoiceByName } from './../../../Functions/playWord';

import TextAreaHelper from './../subComponents/TextAreaHelper';

export default function Escuchar1({ language="", 
                                    word={}, 
                                    counter=null, 
                                    setCounter=f=>f, 
                                    moveToLast=f=>f,
                                    handleRegisterInteraction=f=>f,
                                }){
    const voices = useSelector(state=>state.voices);

    const [input, setInput] = useState("")
    const [flag, setFlag] = useState(false);
    const [flagInput, setInputFlag] = useState({value:true, class : "none"});

    const textAreaRef =  useRef(null);


    useEffect(()=>{
        playWord(word.name, language, getVoiceByName(voices[language]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChangeInput = (e)=>{
        if(e.target.value[e.target.value.length-1] === '\n'){
            e.preventDefault();
            comprobar();
        }else if(e.target.value[e.target.value.length-1] !== '\n'){
            setInput(e.target.value);

            if(e.target.value.length>0){
                setFlag(true);
            }else{
                setFlag(false);
            }
        }
    }

    const comprobar = ()=>{
        if(!flag){
            return;
        }

        setFlag(false);
        let nombreClase = "";
        
        if(input.toLowerCase() === word.name.toLowerCase()){
            nombreClase = "success";
            playWord(word.name, language, getVoiceByName(voices[language]))
        }else{
            nombreClase = "error";
        }
        
        setInputFlag({value:false, class:nombreClase})
    }

    const next=()=>{
        setInput("");
        setFlag(false);
        setInputFlag({value:true, class : "none"});
        if(textAreaRef.current !== null){
            textAreaRef.current.focus();
        }
        if(flagInput.class === "success"){
            setCounter(counter+1);
            handleRegisterInteraction([word]);
        }else{
            moveToLast(counter, word);
        }
    }
    
    const shipWord=()=>{
        setInput("");
        setFlag(false);
        setInputFlag({value:true, class : "error"});
        if(textAreaRef.current !== null){
            textAreaRef.current.focus();
        }
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

    const handleAddpart = (part)=>{
        if(input.length>0){
            setInput(input+" "+part)
        }else{
            setInput(input+part)
        }
        setFlag(true);
    }

    return(
    <>
        <article className="ejercicio1">

            <h2 className="title-e">
                <picture className="img-ejercicio">
                    <img src={EJERCICIOS_ASSETS.ESCUCHAR} draggable={false} alt="logo de representacion para ejercicios de escritura" />
                </picture>
                Escribe la palabra que escuches:
            </h2>

            <span className="extra-controls">
                <WordPlayer word={word.name} language={language} />
            </span>

            <textarea name="meaning" 
                        className={`text-area ${flagInput.class}`}
                        value={input}
                        maxLength="50"
                        minLength="1"
                        onChange={handleChangeInput}
                        placeholder="Escribe aqui la palabra ..."
                        autoFocus={true}
                        disabled={!flagInput.value}
                        ref={textAreaRef}
                        >
            </textarea>

            <TextAreaHelper word={word.name} onPress={flagInput.value ? handleAddpart : false} />

        </article>

        <section className={`commands-section ${flagInput.class}`}>

            {flagInput.value ?
            <>
                <Button onClick={shipWord} variant="outlined" size="large" color="error">
                    Saltar
                </Button>

                <Button onClick={comprobar} disabled={!flag} variant="contained" size="large" color="success">
                    Comprobar
                </Button>
            </>
            :
            <>
                {flagInput.class==="success" && 
                    <span className="msj-bloq">
                        <span className="item">&#9989;Respuesta correcta &#128077;</span>
                        <span className="item">Enhorabuena</span>
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