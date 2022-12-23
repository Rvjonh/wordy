import { useEffect } from "react";

import backImage from './assets/error.png';
import './noPageStyle.scss';

import ButtonToDirection from './../../components/ButtonToHome/ButtonToHome';

import { motion } from "framer-motion";
const PageAnimation = {
    in:{opacity:1,
        y:'0vh'}, 
    out:{opacity:0,
        y:'-50vh'}
}

const PanelControlAnimation = {
    in:{opacity:1}, 
    out:{opacity:0}
}

export default function Error404(){
    
    useEffect(() => {
        document.title = "Wordy - No encontrada";
    }, []);

    return (
        <motion.main initial="out" animate="in" exit="out" variants={PageAnimation} className="main-noPageFound">
            <div className="back-img-noPageFound">
                <img src={backImage} alt="no se ha encontrado la pagina imagen" />
            </div>
            <h2 className="title-noPageFound">ERROR 404</h2>
            <h3 className="subtitle-noPageFound">PERDON, NO ENCONTRAMOS LA PAGINA</h3>

            <motion.div className="panel-buttons" initial="out" animate="in" exit="out" variants={PanelControlAnimation}>
                <ButtonToDirection direction="/" texto="Inicio" fColor="white"/>
                <ButtonToDirection direction="/iniciar-sesion" texto="Inicar Sesión" fColor="white" bg="green"/>
                <ButtonToDirection direction="/registro" texto="Registro" fColor="white" bg="red"/>
            </motion.div>
        </motion.main>
    );
}