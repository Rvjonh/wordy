import { useEffect } from "react"
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';

import playWord, { getVoiceByName } from './../../../Functions/playWord';

import { WordPlayerSmall } from './../components/WordPlayer';

export default function Lectura2({ word={}, 
                                    language="", 
                                    counter=null, 
                                    setCounter=f=>f, 
                                    moveToLast=f=>f,
                                    handleRegisterInteraction=f=>f,
                                    }){
    const voices = useSelector(state=>state.voices);

    const next=()=>{
        setCounter(counter+1);
        handleRegisterInteraction([word])
    }
 
    useEffect(()=>{
        playWord(word.name, language, getVoiceByName(voices[language]))

        document.addEventListener("keypress",pressNextButton)
        return()=>{
            document.removeEventListener("keypress",pressNextButton)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const pressNextButton=(e)=>{
        if(e.keyCode === 13){
            next()
        }
        if(e.ctrlKey && e.keyCode===0){
            handlePlayWord()
        }
    }

    const handlePlayWord = ()=>{
        playWord(word.name, language, getVoiceByName(voices[language]))
    }


    return(
    <>
        <article className="ejercicio1">
            <h2 className="title-e remembering-title">
                Recuerda esta palabra
            </h2>

            <span className="extra-text remarked-text">
                <WordPlayerSmall img={EJERCICIOS_ASSETS.LEER}
                                 word={word.name.trim().replace(/^\w/, (c) => c.toUpperCase())}
                                 wordTitle="Palabra"
                                 language={language}/>
            </span>

            <span className="extra-text remarked-text">
                <picture className="img-ejercicio">
                    <img src={EJERCICIOS_ASSETS.LEER} draggable={false} alt="logo de representacion para ejercicios de lectura" />
                </picture>
                <span className="palabra-text">
                    <span className="palabra-title">Significado</span>
                    {word.meaning.trim().replace(/^\w/, (c) => c.toUpperCase())}
                </span>
            </span>

        </article>

        <section className={`commands-section`}>
            <div></div>

            <Button onClick={next} variant="contained" size="large" color="success">
                Entendido
            </Button>

        </section>
    </>
    )
}