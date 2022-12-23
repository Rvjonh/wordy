import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './aprenderStyle.scss';

import Spinner  from './../../ComunComponents/spinnerImg/spinnerComponent';

import ButtonPractice2 from './assets/dictionary-component/practice2.png';
import ButtonVisualizar from './assets/dictionary-component/visualizar.png';

import AprendidasIMG from './assets/dictionary-component/flame.png';
import PracticeIMG from './assets/dictionary-component/practice-time.png';
import DesconocidoIMG from './assets/dictionary-component/pregunta.png';

import { flags } from './../../Assets/Controlador';

import AgregarDiccionarioLink from '../../components/AgregarDiccionarioLink/AgregarDiccionarioLink';

import NoneDiccionaries from './components/MessageNoneDictionaries';
import SortingButton from './components/SortingBar';

import ListWordsDialog from './components/ListWordsDialog';
import MenuOpciones from './components/MenuOpciones';

export default function Aprender(){
    const Diccionarios = useSelector(state=>state.diccionarios)

    const [copyDiccionarios, setCopyDiccionarios] = useState([...Diccionarios.diccionarios])

    const [searchedInput , setSearchedInput] = useState("");

    const [typeSort, setTypeSort] = useState("todos");
    const [typeDictSort, setTypeDictSort] = useState([]);
    const [sorting, setSorting] = useState(false);

    useEffect(() => {
        document.title = "Wordy - Aprender";
        window.scrollTo(0,0);
    }, []);
    
    useEffect(()=>{
        setSorting(true)
        if(searchedInput===""){
            setSort();
            //setCopyDiccionarios([...Diccionarios.diccionarios])
        }else{
            setCopyDiccionarios(copyDiccionarios.filter((item)=>item.name.toLocaleLowerCase().includes(searchedInput.toLocaleLowerCase())))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchedInput])

    useEffect(()=>{
        setTypeSort("fecha");
        setCopyDiccionarios(Diccionarios.diccionarios)
        setTypeDictSort(getTypeDicts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Diccionarios.diccionarios])
    
    useEffect(()=>{
        setSort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[typeSort])

    const setSort=()=>{
        setSorting(true)
        if(typeSort === "todos"){
            setCopyDiccionarios(Diccionarios.diccionarios)

        }else if(typeSort === "fecha"){
            let newArray = [...Diccionarios.diccionarios]
            newArray = newArray.sort((a, b) => getDateFormated(b.lastPlay) - getDateFormated(a.lastPlay))
            setCopyDiccionarios(newArray)

        }else if(typeDictSort.includes(typeSort)){
            setCopyDiccionarios([...Diccionarios.diccionarios].filter((item)=>item.language===typeSort))
        }
    }

    useEffect(()=>{
        if(sorting){
            setSorting(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[copyDiccionarios])

    const handleSearchDictionary=(e)=>{
        setSearchedInput(e.target.value);
    }

    const getDateFormated=(date)=>{
        let str = date.split(" ")[0].split("/")
        return new Date(str[2], str[1]-1, str[0]);
    }

    const getTypeDicts=()=>{
        let typeDicts = []
        Diccionarios.diccionarios.forEach((item)=>{
            if(!typeDicts.includes(item.language)){
                typeDicts.push(item.language);
            }
        })
        return typeDicts;
    }

    if(Diccionarios.loadLocalState === "synchronization"){
        const PageAnimation = {in:{opacity:1}, out:{opacity:0}}
        return(
            <motion.main className="main-aprender" initial="out" animate="in" exit="end" variants={PageAnimation}>
                <Spinner text="Sincronizando Diccionarios ..."/>
            </motion.main>
        );
    }


    const PageAnimation = {in:{opacity:1}, out:{opacity:0}}
    return(
        <motion.main className="main-aprender" initial="out" animate="in" exit="end" variants={PageAnimation}>
            <div className="header-aprender">
                <AgregarDiccionarioLink />
            </div>
            
            <div className="section-title">
                <h3 className="title">Diccionarios</h3>
            </div>


            {Diccionarios.diccionarios.length >0 &&
                <div className="sort-panel">
                    <div className="search-bar">
                        <label htmlFor="searcher" className="searcher">
                            &#128270;
                        </label>
                        <input value={searchedInput} onChange={handleSearchDictionary} className="bar" type="text" placeholder="Nombre de diccionario" maxLength="100"/>
                    </div>

                    <div className="sorting-options">
                        <SortingButton selected={typeSort} setTypeSort={setTypeSort} typeDict={typeDictSort} />
                    </div>
                </div>
            }


            {Diccionarios.loadLocalState === "pending" || sorting ?
                <Spinner text="Cargando Diccionarios ..."/>
            :
                <motion.section className="dictionaries" transition={{delayChildren:20}} >
                    {
                        copyDiccionarios.map((item, index)=>{
                            if(item !== undefined){
                                return <Dictionary data={item} key={`dict-${item.id}`}/>
                            }
                            return null;
                        })
                    }
                    {Diccionarios.diccionarios.length === 0  ?
                        <NoneDiccionaries />
                    :
                    copyDiccionarios.length === 0  &&
                    <NoneDiccionaries text="El diccionario que buscas no existe."
                                      linkText="Agregalo, si quieres."  />
                    }
                    
                </motion.section>
            }

        </motion.main>
    );
}

const columns = [
    {
      field: 'name',
      headerName: 'Palabra',
      flex :1
    },
    {
        field: 'meaning',
        headerName: 'Significado',
        flex :1
    },
    {
        field: 'level',
        headerName: 'Nivel',
        type: 'number',
        flex :1
    },
];

const Dictionary = (props)=>{
    const DictionaryAnimation = {
        in:{ translateY:"10em",opacity : 0 },
        while:{ translateY:"0em",opacity : 1 },
        view:{ once: true },
        tran:{delay:0.1}
    }

    const navigate = useNavigate();

    const [data] = useState({...props.data, 
                             numberWords: props.data.words.filter(item=>item.state !== "delete").length,
                             numWordsComplete : props.data.words.filter(item=>item.state !== "delete").filter((item)=>{return item.level===10}).length,
                             numWordsStudying : props.data.words.filter(item=>item.state !== "delete").filter((item)=>{return item.level > 0 && item.level < 10}).length,
                             numWordsIncomplete : props.data.words.filter(item=>item.state !== "delete").filter((item)=>{return item.level===0}).length,
                            });
    const [animate, setAnimate] = useState(false);
    
    const [openVisualizacion, setOpenVisualizacion] = useState(false);

    const handleIn = ()=>{
        setAnimate(true);
    }
    const handleOut = ()=>{
        setAnimate(false);
    }

    const getLanguageFlag=(str="")=>{
        if(str===""){
            return;
        }

        return flags.find((item)=>{
            return item.name===str
        }).flag;
    }
   
    const showListWordsDialog = ()=>{
        setOpenVisualizacion(true);
    }

    const getDateLastPlay=(strDate)=>{
        return strDate.split(" ")[0];
    }

    const handleStartPractice = ()=>{
        navigate(`/practica/${data.name}`, {state: data})
    }

    const show = ()=>{
        console.log(JSON.stringify(data, null, 2))
    }

    return(
        <motion.article variants={DictionaryAnimation} initial="in" whileInView="while" viewport="view" transition="tran" className="dictionary" tabIndex="0" onClick={handleIn} onMouseEnter={handleIn} onMouseLeave={handleOut}>
            
            <div className="info">
                <div className="registro" onClick={show}>
                    <b>{data.numberWords}</b>
                    <time>{getDateLastPlay(data.lastPlay)}</time>
                </div>

                <div className="title">
                    <picture className="info-logo">
                        <img className="info-img" src={getLanguageFlag(data.language)} alt="bandera"/>
                        <TittleArticle eventFlag={animate} title={data.name}/>
                    </picture>

                    <div className="list-status">
                        <div className="item-status">
                            {animate
                                ? <motion.img animate={{scale:[1,1.1,0.9,1.1,1.05,1,1]}} transition={{repeat: Infinity, duration: 2, delay:0.5, repeatDelay: 4}} className="item-img" src={AprendidasIMG} alt="logo para las palabras aprendidas"/>
                                : <img className="item-img" src={AprendidasIMG} alt="logo para las palabras aprendidas" />
                            }
                            <span className="number">{data.numWordsComplete}</span>
                        </div>
                        <div className="item-status">
                            {animate
                                ? <motion.img animate={{scale:[1,1.1,0.9,1.1,1.05,1,1]}} transition={{repeat: Infinity, duration: 2, delay:2.5, repeatDelay: 4}} className="item-img" src={PracticeIMG} alt="logo para las palabras aprendidas"/>
                                : <img className="item-img" src={PracticeIMG} alt="logo para las palabras aprendidas" />
                            }
                            <span className="number">{data.numWordsStudying}</span>
                        </div>
                        <div className="item-status">

                            {animate
                                ? <motion.img animate={{scale:[1,1.1,0.9,1.1,1.05,1,1]}} transition={{repeat: Infinity, duration: 2, delay:4.5, repeatDelay: 4}} className="item-img" src={DesconocidoIMG} alt="logo para las palabras aprendidas"/>
                                : <img className="item-img" src={DesconocidoIMG} alt="logo para las palabras aprendidas" />
                            }
                            <span className="number">{data.numWordsIncomplete}</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="action-buttons">

                <div className="action-part">
                    <button className="action-button bg-yellow" onClick={showListWordsDialog}>
                        <img className="logo-button" src={ButtonVisualizar} alt="bandera de boton a accionar la visualizacion del diccionario" />
                        <span className="title-button">Visualizar</span>
                    </button>

                    <ListWordsDialog title={data.name}
                                     open={openVisualizacion}
                                     setOpen={setOpenVisualizacion}
                                     rows={data.words.filter(item=>item.state !== "delete")}
                                     columns={columns}
                                     >
                    </ListWordsDialog>
                </div>

                <div className="action-part">
                    <button className="action-button bg-blue" onClick={handleStartPractice}>
                        <img className="logo-button" src={ButtonPractice2} alt="bandera de boton a accionar una practica" />
                        <span className="title-button">Practicar</span>
                    </button>
                </div>
                
            </div>


            <MenuOpciones data={data} />

        </motion.article>
    );
}

const TittleArticle = (props)=>{
    const title = useRef();
    const text = useRef();

    const [play, setPlay] = useState();
    const [space, setspace] = useState(0);
    const [duration, setDuration] = useState(1);

    useEffect(()=>{
        let TitleWidth = title.current.offsetWidth;
        let TextWidth = text.current.offsetWidth;

        if(TitleWidth < TextWidth){
            setspace((TextWidth-TitleWidth+7)*-1);
            let duration = (TextWidth-TitleWidth+7)/20;
            duration = duration<2? 2 : duration; 
            setDuration(duration);
        }
        setPlay(props.eventFlag);
    },[props.eventFlag])

    let confi = {
        ini:{
            x : 0
        },
        in:{
            x:[0,space,space,0]
        },
        tran: {
            repeat: Infinity,
            duration: duration,
            repeatDelay: 2 
        }
    }

    if(play){
        return(
            <h3 className="info-title" ref={title}>
                <motion.span initial="ini" animate="in" transition={confi.tran} variants={confi} ref={text}>
                    {props.title}
                </motion.span>
            </h3>
        )
    }
    return(
        <h3 className="info-title" ref={title}>
            <span ref={text}> {props.title} </span>
        </h3>
    )
}