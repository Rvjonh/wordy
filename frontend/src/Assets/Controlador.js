
import LogoImg from './header/logo.png';

//Representative flags
import EEUU from './Flags/eeuu.png';
import FR from './Flags/france.png';
import ES from './Flags/spanish.png';
import ZH from './Flags/mandarin.png';
import IT from './Flags/italian.png';
import HI from './Flags/hindi.png';

import noneDiccionary from './extra/noneDiccionaries.png';
import noInternetImg from './extra/noInternet.png';
import serverErrorImg from './extra/server-error.png';
import playImg from './controls/play.png';
import recordImg from './controls/record.png';
import stopRecordImg from './controls/stop-record.png';
import ErrorGeneralIMG from './extra/bad-response.png';

import annonimousUser from './referencias/usuario.jpg';

import EdgeImg from './navegadores/edge.png';
import FirefoxImg from './navegadores/firefox.png';
import ChromeImg from './navegadores/google.png';
import OperaImg from './navegadores/opera.png';
import SafariImg from './navegadores/safari.png';

import escribirImg from './ejerciciosLogos/escribir.png';
import escucharImg from './ejerciciosLogos/escuchar.png';
import leerImg from './ejerciciosLogos/leer.png';
import pronunciarImg from './ejerciciosLogos/pronunciar.png';

import SortImg from './controls/configuracion.png'

import agregarImg from './dictionary/agregar.png';
import deleteImg from './dictionary/delete.png'
import editarImg from './dictionary/editar.png'
import flameImg from './dictionary/flame.png'
import popup1Img from './dictionary/popup1.png'
import practiceImg from './dictionary/practice.png'
import practiceTimeImg from './dictionary/practice-time.png'
import preguntaImg from './dictionary/pregunta.png'
import visualizarImg from './dictionary/visualizar.png'
import xImg from './dictionary/x.png'

const flags =[
    {
        name : "Inglés", 
        flag: EEUU
    },
    {
        name : "Frances", 
        flag: FR
    },
    {
        name : "Italiano", 
        flag: IT
    },
    {
        name : "Español", 
        flag: ES
    },
    {
        name : "Mandarin", 
        flag: ZH
    },
    {
        name : "Hindi", 
        flag: HI
    },
]

const extra ={
    "noneDiccionaries": noneDiccionary,
    "noInternet" : noInternetImg,
    "serverError" : serverErrorImg,
    "play": playImg,
    "record" : recordImg,
    "stopRecord": stopRecordImg,
    "error" : ErrorGeneralIMG,
}

const HEADER_ASSETS ={
    "Logo" : LogoImg
}

const NAVEGADORES_ASSETS = {
    "EdgeImg" : EdgeImg,
    "FirefoxImg" : FirefoxImg,
    "ChromeImg" : ChromeImg,
    "OperaImg" : OperaImg,
    "SafariImg" : SafariImg,
}

const EJERCICIOS_ASSETS ={
    ESCRIBIR : escribirImg,
    LEER : leerImg,
    ESCUCHAR : escucharImg,
    PRONUNCIAR : pronunciarImg,
}

const CONTROLS_ASSETS = {
    sort : SortImg,
}

const DICTIONARY_ASSETS ={
    agregar: agregarImg,
    delete : deleteImg,
    editar : editarImg,
    flame : flameImg,
    popup : popup1Img,
    practice : practiceImg,
    practiceTime : practiceTimeImg,
    pregunta : preguntaImg,
    visualizar : visualizarImg,
    x : xImg
}

export { flags,
         extra, 
         annonimousUser,
         HEADER_ASSETS, 
         NAVEGADORES_ASSETS, 
         EJERCICIOS_ASSETS, 
         CONTROLS_ASSETS,
         DICTIONARY_ASSETS }