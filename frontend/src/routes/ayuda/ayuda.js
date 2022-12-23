import { motion } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import './ayudaStyle.scss';

import upButton from './assets/up-button.png';

import * as Sec from './secciones/secciones';


//if you want to add a new section, add it to 'secciones' and create it in 'secciones.js'
// as is show below ... 

const secciones = {
    "Acerca de":                        <Sec.Acerca />,
    "Plataformas":                      <Sec.Plataformas />,
    "Ejercicios aplicados":             <Sec.Ejercicios />,
    "Creador":                          <Sec.Creador />,
    "Informacion legal":                <Sec.Legal />,
    "Terminos y condiciones":           <Sec.Terminos />,
    "Politica y protección de datos":   <Sec.Politica />
}

const sectionsButtons = [ ...Object.keys(secciones) ];

export default function Ayuda (){
    const PageAnimation = {in:{opacity:1}, out:{opacity:0}}

    const location = useLocation();
    const [section, setSection] = useState("Acerca de");

    let anchor = useRef(null);
    let mainElement = useRef(null);


    useEffect(() => {
        document.title = "Wordy - Ayuda";

        try{
            setSection(location.state.section);
        }catch{
            setSection("Acerca de");
        }

    }, [location.state]);

    const handleChangeSection = (event)=>{
        if(sectionsButtons[event.target.id] !== undefined){
            setSection(sectionsButtons[event.target.id]);
            anchor.current.scrollIntoView({
                behavior : "smooth"
            })
        }
    }
    const handleChangeSectionKey = (event)=>{
        if(event.keyCode === 13){
            handleChangeSection(event);
        }
    }
   
    function isSelected(index){
        return sectionsButtons[index] === section;
    }

    function goTopUp(){
        mainElement.current.scrollIntoView({
            behavior : "smooth"
        })
    }

    return(
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className='main-ayuda' ref={mainElement}>
            <header className='header-ayuda'>
                <h3 className='title-ayuda'>
                    Informacion que te podra ayudar
                </h3>
            </header>
            <div className='container-ayuda'>

               <div className='container-list-ayuda'>
                    <ul className='list-ayuda' onClick={handleChangeSection}>
                        {sectionsButtons.map((value, index) =>{
                            return <li className={`item-ayuda ${isSelected(index)? "selected":""}`}
                                        key={index}
                                        id={index}
                                        tabIndex="0"
                                        onKeyDown={handleChangeSectionKey}
                                        >
                                            {value}
                                    </li>
                        })}
                    </ul>
               </div>
                
                <div className='section-panel' ref={anchor}>
                    {secciones[section]}
                </div>

            </div>
            <div className='up-button-ayuda' tabIndex="0" onClick={goTopUp} onKeyPress={goTopUp}>
                <img src={upButton} alt="boton para subir"/>
            </div>
        </motion.main>
    );
}