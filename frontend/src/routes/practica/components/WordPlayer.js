
import { useState, useEffect } from 'react';
import { extra } from './../../../Assets/Controlador';
import { useSelector, useDispatch } from 'react-redux'
import VoicesIdiomasActions from './../../../Store/Voices-slices';

import { flags } from './../../../Assets/Controlador';
import Spinner from './../../../ComunComponents/spinnerImg/spinnerComponent';

import playWord from './../../../Functions/playWord';
import { getVoices, getVoiceByName } from './../../../Functions/playWord';

export default function WordPlayer({ word="", language=""}){
    const voices = useSelector(state=>state.voices);
    
    const getVoice = ()=>{
        let voz = null;
        try{
            voz = getVoiceByName(voices[language]);
        }catch{}
        return voz;
    }

    const [voice, setVoice]= useState(getVoice());
    const [playing, setPlaying] = useState(false);

    const handlePlayWord = ()=>{
        setPlaying(true)
        playWord(word, language, voice, ()=>{setPlaying(false)})
    }

    useEffect(()=>{
        document.addEventListener("keypress", handleKeyPlayer)

        return ()=>{document.removeEventListener("keypress", handleKeyPlayer)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleKeyPlayer=(e)=>{
        if(e.ctrlKey && e.keyCode===0){
            handlePlayWord()
        }
    }

    return(
        <div className='container-wordplayer'>
            {playing ?
                <picture className='img-wordplayer'>
                    <Spinner />
                </picture>
            :
                <picture className='img-wordplayer' onClick={handlePlayWord}>
                    <img src={extra.play} alt="reproducir palabra sintetisada" />
                </picture>
            }

            <LanguageChoosePanel language={language} voice={voice} setVoice={setVoice}/>
        </div>
    )
}


function LanguageChoosePanel({language="", voice=null, setVoice=f=>f, title=""}){
    const dispatch = useDispatch();

    const [voices, setVoices] = useState(getVoices(language));
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const auxVoices = getVoices(language);
        setVoices(auxVoices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        const auxVoices = getVoices(language);

        if(voice !== null){
            auxVoices.forEach((item, index)=>{
                if(item.name === voice.name){
                    setIndex(index)
                }
            })
        }else{
            setIndex(0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[voice])
    
    const handleSetVoice=(e)=>{
        dispatch(VoicesIdiomasActions.setVoices({language: language, name:voices[parseInt(e.target.value)].name}))
        setVoice(voices[parseInt(e.target.value)])
    }
    
    return(
        <label htmlFor='idioma' className='input-voces'>
            <span className="input-title">
                <img className='input-img' src={flags.filter((item)=>item.name===language)[0].flag}  alt="bandera del idioma"/>
                &nbsp; Voces: &nbsp;
                {title && title}
            </span>
            <select value={index} className='input-selection' name="voice-idioma" id="voice-idioma" onChange={handleSetVoice}>
                {
                    voices.map((item, index)=>{
                        return <option value={index}
                                        key={`${index}-voice`}
                                        >
                                            {item.name}
                                </option>
                    })
                }
            </select>
        </label>
    )
}

function WordPlayerSmall({img=null, word="", language="", play=true}){
    const voices = useSelector(state=>state.voices);
    
    const getVoice = ()=>{
        let voz = null;
        try{
            voz = getVoiceByName(voices[language]);
        }catch{}
        return voz;
    }

    const [voice, setVoice]= useState(getVoice());
    const [playing, setPlaying] = useState(false);

    const handlePlayWord = ()=>{
        setPlaying(true)
        playWord(word, language, voice, ()=>{setPlaying(false)})
    }

    useEffect(()=>{
        document.addEventListener("keypress", handleKeyPlayer)

        return ()=>{document.removeEventListener("keypress", handleKeyPlayer)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleKeyPlayer=(e)=>{
        if(e.ctrlKey && e.keyCode===0){
            handlePlayWord()
        }
    }
    return(
        <div className='word-player-small'>

            <div className='word-player-info'>

                <picture className="word-player-img-small">
                    <img src={img} draggable={false} alt="logo de representacion para ejercicios de escritura" />
                </picture>

                <p className='word-player-text'>
                    {word}
                </p>

                {play &&
                    <picture className='word-player-img-small'>
                        {playing ? 
                            <Spinner />
                            :
                            <img className='img-clickable' onClick={handlePlayWord} src={extra.play} alt="reproducir palabra sintetisada" />
                        }
                    </picture>
                }
            </div>
            
            {play &&
                <LanguageChoosePanel language={language} voice={voice} setVoice={setVoice}/>
            }
        </div>
    )
}

export { LanguageChoosePanel, WordPlayerSmall}