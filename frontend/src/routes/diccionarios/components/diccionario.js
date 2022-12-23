import { useState, useRef, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import DiccionariosActions from './../../../Store/Diccionarios-Slice';

import { flags} from './../../../Assets/Controlador';
import { DICTIONARY_ASSETS } from './../../../Assets/Controlador';

import Tooltip from '@mui/material/Tooltip';
import ListWordsDialog from './../../aprender/components/ListWordsDialog';
import ComfirmProcessModal from './../../../components/ComfirmProcessModal/ConfirmProcessModal';
import Spinner from './../../../ComunComponents/spinnerImg/spinnerComponent';

import { getDateTime } from './../../../Functions/getDateTime';
import LocalDB from './../../../Store/LocalStorage/LocalDB';
import { useNotification } from './../../../Hooks/useNotification';
import WordyDataService from './../../../Services/API-gateaway';

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
    }
];

const DictionaryAnimation = {
    in:{ translateY:"10em",opacity : 0 },
    while:{ translateY:"0em",opacity : 1 },
    view:{ once: true },
    tran:{delay:0.1}
}
export default function Dictionary(props){
    const SESSION = useSelector(state=>state.session);
    const dispatch = useDispatch();
    const [ notificar ] = useNotification();



    const [data] = useState({...props.data, 
                             numberWords: props.data.words.length,
                            });
    const [animate, setAnimate] = useState(false);
    
    const [openVisualizacion, setOpenVisualizacion] = useState(false);
    const [openAgregarPanel, setOpenAgregarPanel] = useState(false);
    const [processState, setProcessState] = useState("null");

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
   
    const getMsjTooltip=()=>{
        if(processState==="null"){
            return "";
        }else if(processState === "running"){
            return "Espere por favor ...";
        }else if(processState === "success"){
            return "Agregador exitosamente";
        }else if(processState === "error"){
            return "No se ha podido efectuar la operacion";
        }else{
            return "";
        }
    }

    const getStateButton=()=>{
        if(processState==="null"){
            return false;
        }else if(processState === "running"){
            return true;
        }else if(processState === "success"){
            return true;
        }else if(processState === "error"){
            return false;
        }else{
            return false;
        }
    }

    const showListWordsDialog = ()=>{
        setOpenVisualizacion(true);
    }

    const handleAddDiccionary=()=>{
        setOpenAgregarPanel(false);
        setProcessState("running");

        let dict = getNewDict();
        SetLastIdLocal(dict);
    }

    const getNewDict = ()=>{
        let newDict = {
            id : "setting",
            language : data.language,
            lastPlay : getDateTime(),
            name : data.name,
            words: []
        }

        let count = 0
        for(let word of data.words){
            newDict.words.push({
                id: `${count++}-local`,
                lastPlay: getDateTime(),
                level: 0,
                meaning: word.meaning,
                name: word.name,
            });
        }

        return newDict;
    }

    const SetLastIdLocal=(newDict)=>{
        LocalDB.withDB((db)=>{
            let transaction = db.transaction("Diccionario");
            transaction.onerror=()=>{
                notificar({title:"Error al guardar ",
                        message:"Revisa tu almacenamiento y/o configuracion.",
                        severity:"error",
                        })
                setProcessState("error")
            }

            let store = transaction.objectStore("Diccionario");
            let r = store.getAll();

            r.onerror=()=>{
                newDict.id = "0-local";

                handleProcessAddtion(newDict)
            }
            
            r.onsuccess = ()=>{
                let idDic = 0;
                try{
                    let numero = r.result[r.result.length-1].id.split("-")[0]
                    idDic = parseInt(numero)+1;
                }catch{
                    idDic = 0;
                }
                newDict.id = `${idDic}-local`;

                handleProcessAddtion(newDict)
            }
        })
    }

    const handleProcessAddtion = (newDict)=>{
        if(SESSION.token){
            keepOnCloud(newDict);
        }else{
            addDiccionarytoState(newDict);
            keepLocally(newDict, ifSuccess ,ifError);
        }
    }

    const ifError = ()=>{
        notificar({title:"Error al guardar ",
            message:"Revisa tu almacenamiento y/o configuracion.",
            severity:"error",
        })
        setProcessState("error")
    }

    const ifSuccess = ()=>{
        notificar({title:"Guardado Local",
                        message:"Se ha guardado el diccionario en tu dispositivo.",
                        severity:"success",
                        })
        setProcessState("success")
    }

    const addDiccionarytoState=(dictToKeep)=>{
        dispatch(DiccionariosActions.agregarDiccionario({diccionario: dictToKeep}));
    }

    const keepLocally= (dictToKeep, onSuccess=f=>f, onError=f=>f)=>{
        let r = LocalDB.addDiccionary(dictToKeep);

        r.onerror = ()=>{
            onError();
        }
        r.onsuccess = ()=>{
            onSuccess();
        }
    }

    const keepOnCloud=(dict)=>{
        WordyDataService.postNewGroup(dict, SESSION.token).then((res)=>{
            //Se actualiza con la informacion del servidor
            addDiccionarytoState(res.data.data);
            keepLocally(res.data.data, ifSuccess , ifError);

            notificar({title:"Guardado en la nube",
                    message:"Se ha guardado el diccionario en tu cuenta.",
                    severity:"info",
                    })
        }).catch(err=>{
            notificar({title:"Error al guardar en la nube",
                        message:"Intentalo mas tarde ...",
                        severity:"error",
                    })
            setProcessState("error")
        })
    }

    return(
        <motion.article variants={DictionaryAnimation} initial="in" whileInView="while" viewport="view" transition="tran" className="dictionary" tabIndex="0" onClick={handleIn} onMouseEnter={handleIn} onMouseLeave={handleOut}>
            
            <div className="info">
                <div className="registro">
                    <b>{data.numberWords}</b>
                </div>

                <div className="title">
                    <picture className="info-logo">
                        <img className="info-img" src={getLanguageFlag(data.language)} alt="bandera"/>
                        <TittleArticle eventFlag={animate} title={data.name}/>
                    </picture>
                    <p className='info-description'>
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="action-buttons">

                <div className="action-part">
                    <button className="action-button bg-yellow" onClick={showListWordsDialog}>
                        <img className="logo-button" src={DICTIONARY_ASSETS.visualizar} alt="bandera de boton a accionar la visualizacion del diccionario" />
                        <span className="title-button">Visualizar</span>
                    </button>

                    <ListWordsDialog title={data.name}
                                     open={openVisualizacion}
                                     setOpen={setOpenVisualizacion}
                                     rows={data.words}
                                     columns={columns}
                                     >
                    </ListWordsDialog>
                </div>

                <div className="action-part">
                    <Tooltip title={getMsjTooltip()} arrow>
                        <span>
                            <button disabled={getStateButton()} className={`action-button bg-blue ${getStateButton()? "clicked": ""}`} onClick={()=>setOpenAgregarPanel(true)}>
                                <img className="logo-button" src={DICTIONARY_ASSETS.agregar} alt="bandera de boton a accionar una practica" />
                                <span className="title-button">Agregar</span>
                                {processState==="running" && <Spinner />}

                                {processState==="error" && <span>&#10060;</span>}

                                {processState==="success" && <span>&#9989;</span>}
                            </button>
                        </span>
                    </Tooltip>
                </div>
                
            </div>

            <ComfirmProcessModal title={"¿Quieres agregar este diccionario a tu lista?"}
                            message={`" ${data.name} "`}
                            activated={openAgregarPanel}
                            onActivated={setOpenAgregarPanel}
                            onAcepted={handleAddDiccionary}
                            />

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