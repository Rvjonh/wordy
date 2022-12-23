import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import './inicioStyle.scss';
import LogoInicio from './assets/logo512.png';
import DownImg from './assets/down-arrow.png'
import arrowRepeticion from './assets/flecha.png';
import backgroundRepeticion from './assets/fondo-repeticion.png';

//ventajas imgs
import divesionLine from './assets/ventajas-block/diversion-line.png';
import diversionLine2 from './assets/ventajas-block/diversion-line2.png';
import diversionStars from './assets/ventajas-block/diversion-stars.png';
import eficienciaArrows from './assets/ventajas-block/eficiencia-arrows.png';
import eficiencia from './assets/ventajas-block/eficiencia.png';
import motivacionArrows from './assets/ventajas-block/motivacion-arrows.png';
import motivacion from './assets/ventajas-block/motivacion.png';
import personalizacionPencil from './assets/ventajas-block/personalizacion-pencil.png';
import personalizacionTool from './assets/ventajas-block/personalizacion-tool.png';

//import OpinionesSlider from './subComponents/opinionesSlider';

                            
import { motion, AnimatePresence } from "framer-motion";
const PageAnimation = {in:{opacity:1}, out:{opacity:0}}

export default function Inicio(){
    const SESSION = useSelector(state=>state.session);

    let repeticionAnchor = useRef(null);
    let ventajasAnchor = useRef(null);
    //let opinionesAnchor = useRef(null);
    let actionsAnchor = useRef(null);

    useEffect(() => {
        document.title = "Wordy - Aplicación para aprender vocabulario";
    }, []);


    return (
        <motion.div initial="out" animate="in" exit="out" variants={PageAnimation}>
            <main className="main-inicio">

                <section className="seccion-inicio-1">
                    <picture className="logo-inicio">
                        <img src={LogoInicio} draggable="false" alt="Logo de la aplicacion wordy"/>
                    </picture>

                    <div className="header-inicio">
                        <h2 className="title-inicio">
                            <span className="tag-1">Wordy</span> una aplicación web progresiva para aprender vocabulario a traves de repetición
                        </h2>
                        <div className="background-title-inicio"></div>
                    </div>

                    <div className="background-seccion-1">
                        <AnimatePresence>
                            <Ball key={1}  className="bola-1" />
                            <Ball key={2}  className="bola-2" />
                            <Ball key={3}  className="bola-3" />
                            <Ball key={4}  className="bola-4" />
                            <Ball key={5}  className="bola-5" />
                            <Ball key={6}  className="bola-6" />
                            <Ball key={7}  className="bola-7" />
                        </AnimatePresence>
                    </div>
                    

                    <DownButton element={repeticionAnchor}/>
                </section>

                <section className="seccion-inicio" ref={repeticionAnchor}>
                    <picture className="img-repeticion">
                        <img className='img-back' src={backgroundRepeticion} draggable="false" alt="imagen de fondo de repeticion animada" />
                        <img className='img-arrow' src={arrowRepeticion} draggable="false" alt="imagen de repeticion animada" />
                    </picture>          

                    <div className="header-repeticion">
                        <h2 className="title-repeticion">
                            Es que la <span className="tag-1">Repeticion</span>
                        </h2>
                        <p>
                            Es un un mecanismo natural eficaz para consolidar lo que se ha estudiado.
                        </p>
                        <p className='paragraph'>
                            -"Se aprende haciendo y repitiendo".
                        </p>
                        <p className='paragraph'>
                            Puedes practicar constantemente en wordy, online o offline las palabras que registres.
                        </p>
                    </div>
                    <DownButton element={ventajasAnchor}/>
                    <AnimationFadingBalls />
                </section>

                <section className="seccion-inicio" ref={ventajasAnchor}>

                    <h2 className='title-ventajas'>
                        Porque te encantara aprender con <span className='tag-1'>Wordy</span>
                    </h2>


                    <ul className='list-ventajas'>
                        <li className='list-item'>
                            <picture className='list-icon'>
                                <img className='icon fade-in' src={eficiencia} draggable="false" alt="imagene animada sobre eficiencia en wordy"/>
                                <img className='icon fade-in go-up' src={eficienciaArrows} draggable="false" alt="imagene animada sobre eficiencia en wordy"/>
                            </picture>
                            <div className='list-information'>
                                <h3 className='title-item'>Efectivo y eficiente</h3>
                                <p className='paragraph' >
                                    <span className="hidden-text">Cuando estudias con wordy, podras hacer ejercicios para aprender vocabulario a traves de la repeticion.</span> Con ejercicios de leer, escuchar y pronunciar de forma efectiva y eficiente.
                                </p>
                            </div>
                        </li>
                        <li className='list-item'>
                            <picture className='list-icon'>
                                <img className='icon rotate-from-left' src={personalizacionTool} draggable="false" alt="imagen animada sobre personalizacion en wordy" />
                                <img className='icon rotate-from-top' src={personalizacionPencil} draggable="false"  alt="imagen animada sobre personalizacion en wordy" />
                            </picture>
                            <div className='list-information'>
                                <h3 className='title-item'>Aprendizaje personalizado</h3>
                                <p className='paragraph' >
                                    El proceso de aprendizaje se adapta mejor a cada usuario individual<span className="hidden-text">, con su propio estilo de aprendizaje, antecedentes, necesidades y experiencias previas únicos. Puedes estudiar lo que tu decidas.</span>
                                </p>
                            </div>
                        </li>
                        <li className='list-item'>
                            <picture className='list-icon'>
                                <img className='icon go-up' src={motivacionArrows} draggable="false" alt='imagen animada sobre motivación en wordy' />
                                <img className='icon go-up' src={motivacion} draggable="false" alt='imagen animada sobre motivación en wordy' />
                            </picture>
                            <div className='list-information'>
                                <h3 className='title-item'>Mantente motivado</h3>
                                <p className='paragraph' >
                                    Al sentirse como un juego y ofrecerte ejercicios divertidos, hacemos que sea fácil <span className="hidden-text"> formar un hábito de aprendizaje de vocabulario.</span>
                                </p>
                            </div>
                        </li>
                        <li className='list-item'>
                            <picture className='list-icon'>
                                <img className='icon go-up' src={divesionLine} draggable="false" alt="imagen animada sobre diversion en wordy" />
                                <img className='icon go-up' src={diversionLine2} draggable="false" alt="imagen animada sobre diversion en wordy" />
                                <img className='icon fade-in' src={diversionStars} draggable="false" alt="imagen animada sobre diversion en wordy" />
                            </picture>
                            <div className='list-information'>
                                <h3 className='title-item'>¡Diviertete!</h3>
                                <p className='paragraph' >
                                    <span className="hidden-text">¡El aprendizaje puede ser efectivo y divertido a la vez!</span> Desarrolla tus habilidades cada día con ejercicios entretenidos y mejora pregresivamente.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <DownButton element={actionsAnchor}/> {/*cambiar "opinionesAnchor" */}
                    <AnimationFadingBalls />
                </section>

               {/*  <section className='seccion-inicio' ref={opinionesAnchor}>
                    <div className='header-opiniones'>
                        <h2 className='title-opiniones'>
                            <span className='tag-1'>Opiniones</span> de usuarios
                        </h2>
                    </div>

                    <OpinionesSlider />

                    <DownButton element={actionsAnchor}/>
                </section> */}

                <section className='seccion-inicio actions-panel' ref={actionsAnchor}>
                    <div className='header-actions'>
                        <h2 className='title-actions'>
                            ¿A <span className='tag-1'>qué esperas</span> para?
                        </h2>
                    </div>

                    <div className='buttons-actions'>
                        {
                            SESSION.token==="" && <>
                                <div className="button-container">
                                    <button className='iniciar-sesion-button'>
                                        <Link to='/iniciar-sesion'>
                                            Iniciar Sesión
                                        </Link>
                                    </button>
                                </div>

                                <div className="button-container">
                                    <button className='crear-cuenta-button'>
                                        <Link to='/registro'>
                                            Crear una Cuenta
                                        </Link>
                                    </button>
                                </div>
                            </>
                        }
                        <div className="button-container">
                            <button className='practicar-button'>
                                <Link to='/aprender'>
                                    Practicar
                                </Link>
                            </button>
                        </div>
                        <div className="button-container">
                            <InstallPWAButton />
                        </div>

                    </div>

                </section>

            </main>
        </motion.div>
    );
}

const Ball =(props)=>{

    const getTimeRandom=()=>{
        return 2 + Math.floor(Math.random()*3)+(Math.floor(Math.random()*99)/100);
    }

    return(
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0,1,0.9,0] }}
            exit={{  opacity: 0 }}
            transition={{ ease: "linear", duration: getTimeRandom(), repeat: Infinity }}

            drag dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
            }} className={props.className} />
    )
}

const DownButton = (props)=>{

    const handleKeyDown = (event)=>{
        if(event.keyCode === 13)
            handleDown();
    }
    const handleDown = ()=>{
        props.element.current.scrollIntoView({
            behavior : "smooth"
        })
    }

    return(
        <div className="block-down-inicio" onClick={handleDown} onKeyDown={handleKeyDown} tabIndex="0" >
            <picture className="block-img-button" >
                <img src={DownImg} draggable="false" alt="boton para bajar a la siguiente sección del inicio." />
            </picture>
        </div>
    );
}

const AnimationFadingBalls = ()=>{
    return (
        <div className='animacion-fading-balls '>

            <div className='set-3-balls set-left '>
                <div className='ball-fade-1 fade-top'></div>
                <div className='ball-fade-2 fade-top'></div>
                <div className='ball-fade-3 fade-top'></div>
            </div>

            <div className='set-3-balls set-right '>
                <div className='ball-fade-1 fade-bottom'></div>
                <div className='ball-fade-2 fade-bottom'></div>
                <div className='ball-fade-3 fade-bottom'></div>
            </div>
        </div>
    );
}

let deferredPrompt;

const InstallPWAButton = ()=>{
    let [isInstallable, setInstallable] = useState(deferredPrompt !== null? true : false);
    let [buttonData, setButtonData] = useState({text : "Instalar la aplicación"})

    useEffect(() => {

        window.addEventListener('beforeinstallprompt', (e)=>{
            setInstallable(true);
            deferredPrompt = e;
        });

    }, []);

    const handleInstallPWA = async()=>{
        if(deferredPrompt !== null){
            try{
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if(outcome === 'accepted'){
                    deferredPrompt = null;
                    setButtonData({text : "Aplicación ya instalada"})
                }
            }catch{
                setButtonData({text : "No disponible en este navegador"})
                setInstallable(false);
            }
        }
    }

    return (
        <button onClick={handleInstallPWA} className={`instalar-button ${isInstallable? "show":"clicked"}`}>
            {buttonData.text}
        </button>
    );
}
