

export default function playWord(message, language="Español", voice=null, onfinished=f=>f) {

    let speech = new SpeechSynthesisUtterance();
  
    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    if(voice !== null){
        speech.voice = voice;
    }else{
        try{
            let nameVoice = localStorage.getItem("voices_idiomas")[language];
            if(nameVoice !== null){
                speech.voice = getVoiceByName(nameVoice);
            }else{
                speech.lang = getLang(language);
            }
        }catch{
            speech.lang = getLang(language);
        }
    }

    speech.onpause = () => {onfinished()}
    speech.onend = () => {onfinished()}
    speech.onboundary = () => {onfinished()}
    speech.onerror = ()=>{onfinished()}

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

    return speech;
}

export function getLang(language=""){
    const langsI = {
        'Inglés':"en",
        'Frances':"fr",
        'Italiano':"it",
        'Mandarin':"zh",
        'Hindi':"hi",
        'Español':"es"
    }

    const response = langsI[language]
    if(response === undefined){
        return '';
    }
    return response;
}

export function getVoices(language=""){
    return window.speechSynthesis.getVoices().filter((item)=>item.lang.includes(getLang(language)))
}

export function getVoiceByName(name=""){
    let voz = null;
    try{
        voz = window.speechSynthesis.getVoices().filter((item)=>item.name===name)[0]
    }catch{
        voz = null;
    }
    return voz;
}