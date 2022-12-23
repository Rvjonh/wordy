import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PracticeConfigurationActions from './../../Store/Practice-slice';
import { useNavigate } from "react-router-dom";

import { useNotification } from './../../Hooks/useNotification';

import './confiStyle.scss';

import Fab from '@mui/material/Fab';


const ConfigurationAnimation = {
    in:{ opacity : 0 },
    while:{ opacity : 1 },
    tran:{delay:0.1}
}

export default function ConfiguracionPractica({buttonMsj="Guardar", onAccept=null, fastStep=false}){
    const PRACTICE = useSelector(state=>state.practiceConfi)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ notificar ] = useNotification();

    const [confi, setConfi] = useState({...PRACTICE});


    const handleChangeReminder =(e)=>{
        setConfi({...confi, ask:e.target.checked})
    }
    
    const handleChangeExercise = (e, id)=>{
       
        let newExercises = [...confi.exercices];
        newExercises[id] = {
            ...confi.exercices[id],
            value: e.target.checked
        }
        setConfi({...confi, exercices:newExercises })
    }

    const handleSetCounterWords = (numero)=>{
        setNumoroWords(numero);
    }
    const setNumoroWords = (numero)=>{
        let n = parseInt(numero);
        if(n>5){
            n=5;
        }else if(n<1){
            n=1;
        }
        setConfi({...confi, numeroWords: n})
    }

    useEffect(()=>{

        document.addEventListener("keypress", detectEnter)

        return ()=>{
            document.removeEventListener("keypress", detectEnter)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const detectEnter = (e)=>{
        if(e.keyCode === 13){
            keepNewStateForExercises();
        }
    }

    const keepNewStateForExercises=()=>{

        if(isNotExercicesSelected()){
            notificar({title:"No hay ejercicios seleccionados",
                        message:"No se pueden crear practicas sin algun tipo de ejercicio.",
                        severity:"warning"})
            return;
        }

        dispatch(PracticeConfigurationActions.setExercicesState(confi));

        if(onAccept === null){
            navigate('/aprender');
        }else{
            onAccept();
        }
    }

    const isNotExercicesSelected=()=>{
        return !confi.exercices.some((item)=>item.value===true);
    }

    return(
        <motion.main variants={ConfigurationAnimation}
                     initial="in"
                     whileInView="while"
                     transition="tran"
                     className="container-confi"
                     >
            
            <div className="float-container">
                <Fab onClick={keepNewStateForExercises} variant="extended" color="success" aria-label="add" className="button-save-confi">
                    {buttonMsj}
                </Fab>
            </div>

            <header className="header">
                <h2>Configuracion</h2>
            </header>

            <label htmlFor="keep" className={`keepConfig ${confi.ask ? "selected": ""}`}>
                <input checked={confi.ask} onChange={handleChangeReminder} name="keep" id="keep" type="checkbox" />
                &nbsp;
                Recordar configuracion
            </label>


            <section className="content">

                <div className="sec">
                    <h3 className="title">Tipos de ejercicios</h3>

                    <form>

                        {
                            confi.exercices.map((item, index)=>{
                                return(
                                    <label htmlFor={item.type} className={`exercise ${item.value ? "selected": ""}`} key={`exer-${index}`} >
                                        <input checked={item.value} onChange={(e)=>handleChangeExercise(e, index)} name={item.type} id={item.type} type="checkbox"/>
                                        &nbsp;
                                        {item.type}
                                    </label>
                                )
                            })
                        }

                    </form>
                </div>

                <div className="sec">
                    <h3 className="title">
                        Numero de palabras
                        <div className="contador-words">
                            <button onClick={()=>handleSetCounterWords(confi.numeroWords-1)} className="button-contador btn-fail">-</button>
                            <span className="numeroWords" draggable={false}>{confi.numeroWords}</span>
                            <button onClick={()=>handleSetCounterWords(confi.numeroWords+1)} className="button-contador btn-success">+</button>
                        </div>
                    </h3>

                    <p className="message-n-words">
                        Este es numero de palabras utilizadas en las practicas para los ejercicios de los diccionarios.
                        (pude estar entre 1 y 5 palabras por practica). Se seleccionan las de menor nivel.
                    </p>
                    
                </div>

            </section>

        </motion.main>
    )
}
