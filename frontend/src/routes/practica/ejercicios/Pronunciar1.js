import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { EJERCICIOS_ASSETS, extra } from './../../../Assets/Controlador';

import ErrorAlCargar from './../components/ErrorAlCargar';
import playWord, { getVoiceByName } from './../../../Functions/playWord';
import { WordPlayerSmall } from './../components/WordPlayer';

export default function Pronunciar1({ word={}, 
                                        language="", 
                                        counter=null, 
                                        setCounter=f=>f, 
                                        moveToLast=f=>f, 
                                        handleRegisterInteraction=f=>f,
                                        }){
    const voices = useSelector(state=>state.voices);

    const [input, setInput] = useState("")
    const [recognition, setRecognition]  = useState(null);

    const [error, setError] = useState(false);
    const [recording, setRecording] = useState(false);
    const [allowRecord, setAllowRecord] = useState(true);

    const [flag, setFlag] = useState(false);
    const [flagInput, setInputFlag] = useState({value:true, class : "none"});

    const recordButtonRef =  useRef(null);

    const handlePlayWord = ()=>{
        playWord(word.name, language, getVoiceByName(voices[language]))
    }

    useEffect(()=>{
        recordButtonRef.current.focus();
        handlePlayWord();
        try {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            setRecognition(new SpeechRecognition());
        }
        catch(e) {
            setError(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleRecordInput = (e)=>{

        setRecording(true);
        recognition.lang = getLangFromLanguage(language)
        recognition.start();
        
        recognition.onstart = function() { 
            setRecording(true);
            //console.log('Voice recognition activated. Try speaking into the microphone.');
        }
          
        recognition.onspeechend = function() {
            //console.log('You were quiet for a while so voice recognition turned itself off.');
            setRecording(false);
        }
          
        recognition.onerror = function(event) {
            if(event.error === 'no-speech') {
                //console.log('No speech was detected. Try again.');  
            };
            setRecording(false);
        }

        recognition.onresult = function(event) {

            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far. 
            // We only need the current one.
            var current = event.resultIndex;
            // Get a transcript of what was said.
            var transcript = event.results[current][0].transcript;
            // Add the current transcript to the contents of our Note.
            /* noteContent += transcript;
            noteTextarea.val(noteContent); */

            var mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);
            if(!mobileRepeatBug) {

                setInput(transcript.replace(/[?|.|¿|,]/g,""))
            }
            setRecording(false);
            recognition.stop();
        }
    }

    const getLangFromLanguage = (language)=>{
        
        if(language==="Inglés"){
            return "en-US";
    
        }else if(language==="Frances"){
            return "fr-FR";
    
        }else if(language==="Italiano"){
            return "it-IT";
    
        }else if(language==="Mandarin"){
            return "zh-HK";
    
        }else if(language==="Hindi"){
            return "hi-IN";
    
        }else if(language==="Español"){
            return "es-ES"
            
        }else{
            return "es-ES";
        }
    }

    const handleStopRecord = ()=>{
        setRecording(false);
        recognition.stop();
    }

    useEffect(()=>{
        let actualWord = word.name.replace(/[?|.|¿|,]/g,"").toLowerCase();
        let inputWord = input.replace(/[?|.|¿|,]/g,"").toLowerCase();

        if(actualWord === inputWord){
            comprobar();
        }
        setFlag(true);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[input, word.name])

    const comprobar = ()=>{
        setAllowRecord(false);
        if(!flag){
            return;
        }

        setFlag(false);
        let nombreClase = "";
        
        let actualWord = word.name.replace(/[?|.|¿|,]/g,"").toLowerCase();
        let inputWord = input.replace(/[?|.|¿|,]/g,"").toLowerCase();

        if(actualWord === inputWord){
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
        if(recordButtonRef.current !== null){
            recordButtonRef.current.focus();
        }
        if(flagInput.class === "success"){
            setCounter(counter+1);
            handleRegisterInteraction([word]);
        }else{
            setCounter(counter+1);
        }
    }
    
    const shipWord=()=>{
        setAllowRecord(false);
        setFlag(false);
        setInputFlag({value:false, class:"error"})
    }

    useEffect(()=>{

        if(!flagInput.value){
            document.addEventListener("keypress",pressNextButton)
        }
        return()=>{document.removeEventListener("keypress",pressNextButton)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flagInput])

    const pressNextButton=(e)=>{
        if(e.keyCode === 13){
            next()
        }
    }

    return(
    <>
        {error ?
            <ErrorAlCargar title="Lo Sentimos. Parece no funcionar" 
                            msj="Este tipo de ejercicios no funciona
                             en este navegador, para mas informacion
                             puedes revisar la seccion de ayuda. 
                            O escribirnos a nuestro corre appwordy@gmail.com,
                             escribenos tu problema o error. " />
            :
        <article className="ejercicio1">

            <h2 className="title-e">
                Pronuncia la siguiente palabra
            </h2>

            <WordPlayerSmall img={EJERCICIOS_ASSETS.ESCRIBIR} 
                             word={word.name.trim().replace(/^\w/, (c) => c.toUpperCase())}
                             language={language} />

            <span className="extra-controls">

                <div className='container-wordplayer'>
                    {!recording ?
                        <button disabled={!allowRecord} ref={recordButtonRef} className={`img-wordplayer ${!allowRecord? "active":""}`} onClick={ allowRecord ? handleRecordInput : ()=>console.log("")}>
                            <img className="img-logo" src={extra.record} alt="Graba tu voz precionando aqui" />
                        </button>
                    :    
                        <button className='img-wordplayer' onClick={handleStopRecord}>
                            <img className="img-logo" src={extra.stopRecord} alt="Graba tu voz precionando aqui" />
                        </button>
                    }
                </div>
            </span>

            <textarea name="meaning" 
                        className={`text-area ${flagInput.class}`}
                        value={input}
                        maxLength="50"
                        minLength="1"
                        placeholder="Graba tu voz, aparecerá aqui ..."
                        disabled={true}
                        >
            </textarea>

        </article>
        }


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
                        <span className="item">Significa: {word.meaning}</span>
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