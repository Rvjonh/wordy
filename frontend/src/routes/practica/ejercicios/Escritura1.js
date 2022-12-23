import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';

import playWord, { getVoiceByName } from './../../../Functions/playWord';
import { WordPlayerSmall } from './../components/WordPlayer';
import TextAreaHelper from './../subComponents/TextAreaHelper';

export default function Escritura1({ word={}, 
                                    language="", 
                                    counter=null, 
                                    setCounter=f=>f, 
                                    moveToLast=f=>f, 
                                    type="1",
                                    handleRegisterInteraction=f=>f,}){

    const voices = useSelector(state=>state.voices);

    const [input, setInput] = useState("")

    const [flag, setFlag] = useState(false);
    const [flagInput, setInputFlag] = useState({value:true, class : "none"});

    const textAreaRef =  useRef(null);

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

    useEffect(()=>{
        function pressToPlay(e){
            if(e.ctrlKey && e.keyCode===0){
                handlePlayWord()
            }
        }

        document.addEventListener("keypress",pressToPlay)
        return()=>{
            document.removeEventListener("keypress",pressToPlay)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePlayWord = ()=>{
        if(type === "1"){
            playWord(word.name, language, getVoiceByName(voices[language]))
        }
    }

    const comprobar = ()=>{
        if(!flag){
            return;
        }

        setFlag(false);
        let nombreClase = "";
        
        if(input.toLowerCase() === word.meaning.toLowerCase()){
            nombreClase = "success";
            if(type === "1"){
                playWord(word.name, language, getVoiceByName(voices[language]))
            }else if(type === "2"){
                playWord(word.meaning, language, getVoiceByName(voices[language]))
            }
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
            if(type==="1"){
                handleRegisterInteraction([word])
            }else if(type==="2"){
                handleRegisterInteraction([{...word, name:word.meaning, meaning:word.name}]);
            }
        }else{
            moveToLast(counter, word);
        }
    }
    
    const shipWord=()=>{
        setFlag(false);
        setInputFlag({value:false, class:"error"})
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
                Escribe {type==="1"? "el significado": "la traducción"} de:
            </h2>

            <WordPlayerSmall img={EJERCICIOS_ASSETS.ESCRIBIR}
                             word={word.name.trim().replace(/^\w/, (c) => c.toUpperCase())}
                             language={language}
                             play={type==="1"}
                            />

            <textarea name="meaning" 
                        className={`text-area ${flagInput.class}`}
                        value={input}
                        maxLength="50"
                        minLength="1"
                        onChange={handleChangeInput}
                        placeholder="Escribe que significa esta palabra ..."
                        autoFocus={true}
                        disabled={!flagInput.value}
                        ref={textAreaRef}
                        >
            </textarea>

            <TextAreaHelper word={word.meaning} onPress={flagInput.value ? handleAddpart : false} />

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
                       <span className="item">Correcta: {word.meaning}</span>
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