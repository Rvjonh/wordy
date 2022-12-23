import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import './stylies/ejerciciosPanel.scss';

import MainWraper from './../../components/MainWraper/Main';
import ComfirmProcessModal from './../../components/ComfirmProcessModal/ConfirmProcessModal';
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import FinishedPractice from './FinishedPractice';

import getRandomArray from './../../Functions/getRandomArray';
import Escritura1 from './ejercicios/Escritura1';
import Lectura1 from './ejercicios/Lectura1';
import Lectura2 from './ejercicios/Lectura2';
import Lectura3 from './ejercicios/Lectura3';
import Escuchar1 from './ejercicios/Escuchar1';
import Escuchar2 from './ejercicios/Escuchar2';
import Pronunciar1 from './ejercicios/Pronunciar1';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: "1rem",
        width:"80%",
        maxWidth:"55em",
        margin: "0 0.5rem",
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor:'#5ac9ff',
        },
}));


export default function EjerciciosPanel({DiccionarioInfo={}, Diccionario=[], Palabras=[], language="", voice=null }){
    const CONFIGURACION = useSelector(state => state.practiceConfi);
    const navigate = useNavigate();


    const [loading, setLoading] = useState("loading")
    const [canceling, setCanceling] = useState(false);
    const [error, setError] = useState(false);

    const [counter, setCounter] = useState(0)
    const [row, setRow] = useState([]);

    const [records, setRecords] = useState([]);


    useEffect(()=>{

        if(NoWordsToPractice()){
            setError(true);
        }

        let arrEjercicios = []
        
        
        if(CONFIGURACION.exercices[0].value){
            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"escritura1", ...item}
            }))

            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"escritura2", ...item}
            }))
        }

        if(CONFIGURACION.exercices[1].value){
            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"lectura1", ...item}
            }))
            
            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"lectura2", ...item}
            }))
            arrEjercicios = arrEjercicios.concat({type:"lectura3", array:Palabras});
        }

        if(CONFIGURACION.exercices[2].value){
            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"escuchar1", ...item}
            }))

            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"escuchar2", ...item}
            }))
        }

        if(CONFIGURACION.exercices[3].value){
            arrEjercicios = arrEjercicios.concat(Palabras.map((item)=>{
                return {type:"pronunciar1", ...item}
            }))
        }
        
        if(arrEjercicios.length<=0){
            setError(true);
        }

        getRandomArray(arrEjercicios);
        setRow(arrEjercicios) 
        setLoading("loaded")

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])

    const NoWordsToPractice=()=>{
        return Palabras.length <=0;
    }

    const getEjercicio=(ejercicio, index)=>{

        if(ejercicio.type==="escritura1"){
            return <Escritura1 key={ejercicio.id} 
                                type="1"
                                language={language}
                                counter={index} 
                                setCounter={setCounter} 
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="escritura2"){
            return <Escritura1 key={ejercicio.id} 
                                type="2" 
                                counter={index} 
                                language={language}
                                setCounter={setCounter} 
                                word={{...ejercicio, name:ejercicio.meaning, meaning:ejercicio.name}}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="lectura1"){
            return <Lectura1 key={ejercicio.id} 
                                type="1" 
                                counter={index} 
                                language={language}
                                setCounter={setCounter}
                                dictionary={Diccionario} 
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="lectura2"){
            return <Lectura2 key={ejercicio.id} 
                                type="1"
                                language={language}
                                counter={index} 
                                setCounter={setCounter}
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="lectura3"){
            return <Lectura3 key={"lectura3"}
                                language={language}
                                array={ejercicio.array}
                                counter={index}
                                setCounter={setCounter}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="escuchar1"){
            return <Escuchar1 key={ejercicio.id} 
                                language={language}
                                counter={index} 
                                setCounter={setCounter} 
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="escuchar2"){
            return <Escuchar2 key={ejercicio.id} 
                                language={language}
                                dictionary={Diccionario} 
                                counter={index} 
                                setCounter={setCounter} 
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
        if(ejercicio.type==="pronunciar1"){
            return <Pronunciar1 key={ejercicio.id} 
                                language={language}
                                counter={index} 
                                setCounter={setCounter} 
                                word={ejercicio}
                                moveToLast={moveToLast}
                                handleRegisterInteraction={handleRegisterInteraction}
                                />
        }
    }

    const moveToLast=(index)=>{
        let element = row[index]
        let newSort = [...row.slice(0, index), ...row.splice(index+1), element]
        setRow(newSort)
    }

    const handleRegisterInteraction = (words=[])=>{
        let aux = [...records]

        let flag = false;

        for(let i=0 ; i<words.length ; i++){
            flag = false;
            for(let j=0 ; j<records.length ; j++){
                if(words[i].id === records[j].id){
                    flag = true;
                }
            }
            if(!flag){
                aux.push({...words[i]})
            }
        }
        setRecords(aux)
    }

    const getPorcentajePractica=()=>{
        return counter*100/row.length;
    }

    const redirigir=()=>{
        setTimeout(()=>{navigate('/aprender')},5000)
    }

    const handleCancelPractice =()=>{
        setCanceling(true);
    }
    const handleFinishPractice=()=>{
        setCanceling(false);
        navigate('/aprender')
    }

    if(loading === "loading"){
        return <MainWraper>
                    <Spinner text='Creando Ejercicios ...' />
                </MainWraper>
    }

    if(error){
        return <MainWraper>
                    <h2>No hay palabras en este diccionario</h2>
                    <Spinner text='Hubo un error con el diccionario...' />
                    {redirigir()}
                </MainWraper>
    }

    if(counter < row.length){ //show exercices while recording the interactions ...
        return(
            <MainWraper>

                <section className='progress-bar'>
                    <button className='close-practice-button' onClick={handleCancelPractice}>&#10006;</button>
                    <BorderLinearProgress variant="determinate" value={getPorcentajePractica()} />
                </section>

                <section className='ejercicio-section'>
                    { getEjercicio(row[counter], counter) }
                </section>

                <ComfirmProcessModal title="¿Quieres salir de esta práctica?"
                            message="Perderas los puntos de nivel para las palabras"
                            messageButton="Aceptar"
                            onActivated={setCanceling}
                            activated={canceling}
                            onAcepted={handleFinishPractice} />

            </MainWraper>
        )
    }

    return(
        <FinishedPractice DiccionarioInfo={DiccionarioInfo} 
                            Diccionario={Diccionario} 
                            records={records} />
    )
}