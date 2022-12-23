import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DiccionariosActions from './../../Store/Diccionarios-Slice';

import { useNavigate, useLocation } from 'react-router-dom';

import { useNotification } from './../../Hooks/useNotification';
import { useInternetDetector } from './../../Hooks/useInternetDetector';

import { getDateTime } from './../../Functions/getDateTime';

import './styles/AgregarDiccionarios.scss';

import { flags } from './../../Assets/Controlador';

import Fab from '@mui/material/Fab';

import MainWraper from './../../components/MainWraper/Main';
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import deleteImg from './../../Assets/controls/delete.png';
import guardarImg from './../../Assets/controls/guardar.png';
import ComfirmProcessModal from './../../components/ComfirmProcessModal/ConfirmProcessModal';

import LocalDB from './../../Store/LocalStorage/LocalDB';
import keepIntoOperations from './../../Store/LocalStorage/PersistanOperations';
import WordyDataService from './../../Services/API-gateaway';

export default function AgregarDiccionario(){
    const [ notificar ] = useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SESSION = useSelector(state=>state.session);
    const [isOnline] = useInternetDetector();

    const location = useLocation();

    const [inputs, setInputs] = useState({  id:"0-local",
                                            name: "", 
                                            lastPlay: getDateTime(),
                                            language:"Inglés",
                                            words:[
                                                {
                                                    id:"0-local",
                                                    name: "",
                                                    meaning:"",
                                                    lastPlay:getDateTime(),
                                                    level:0,
                                                    state : ""
                                                }
                                            ]}
                                            )

    const idiomaRef = useRef(null)

    const [editing, setEditing] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [processState, setProcessState] = useState("stop");

    //get the ID for the dictionary syncronyced with Local indexedDB
    useEffect(()=>{
        if(location.state !== null){
            setEditing(true);
            let actualDict = {...location.state};
            delete actualDict.numWordsComplete;
            delete actualDict.numWordsIncomplete;
            delete actualDict.numWordsStudying;
            delete actualDict.numberWords;

            setInputs({...actualDict})
        }else{
            LocalDB.withDB((db)=>{
                let transaction = db.transaction("Diccionario");
                let store = transaction.objectStore("Diccionario");
                let r = store.getAll();
    
                r.onerror=()=>{
                    setInputs({...inputs, id:"0-local"})
                }
                r.onsuccess = ()=>{
                    let idDic = 0;
                    try{
                        let numero = r.result[r.result.length-1].id.split("-")[0]
                        idDic = parseInt(numero)+1;
                    }catch{
                        idDic = 0;
                    }
    
                    setInputs({...inputs, id:`${idDic}-local`})
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

    const handleIdioma =(e)=>{
        setInputs({...inputs, language:e.target.value})
    }

    const handleClickImg=()=>{
        idiomaRef.current.focus()
    }

    const getFlagImg=(nameFlag="")=>{
        const flag = flags.find((item)=>{
            return item.name === nameFlag
        })
        return flag.flag
    }

    const handleNameChange =(e)=>{
        setInputs({...inputs, name:e.target.value})
    }

    const handleUpdatePalabra =(e, id, valor)=>{
        let newPalabras = inputs.words

        newPalabras.map((item)=>{
            if (item.id===id){
                item[valor] = e.target.value;
                if(editing && item["state"] !=="post"){
                    item["state"] = "update";
                }
            }

            return item
        })
        setInputs({...inputs, words:newPalabras})
    }

    const AgregarPalabra=()=>{
        let newPalabras = inputs.words
        const index = parseInt(newPalabras[newPalabras.length-1].id.split("-")[0])+1;

        newPalabras.push({
            id:`${index}-local`,
            name: "",
            meaning:"",
            lastPlay: getDateTime(),
            level:0,
            state : editing? "post":""
        })
        setInputs({...inputs, words:newPalabras})
    }

    const EliminarItem=(e, id)=>{
        if(inputs.words.filter(item=>item.state !== "delete").length <= 1){
            notificar({title:"No permitido",
                        message:"No se permiten diccionarios sin palabras",
                        severity:"error",
                        preventDuplicate:true})
            return;
            
        }else{

            if(editing){
                let newPalabras = []
                
                inputs.words.forEach((palabra)=>{
                    let temp = palabra;

                    if(temp.id === id){
                        if(temp.state !== "post"){
                            temp["state"] = "delete";
                            newPalabras.push(temp);
                        }
                    }else{
                        newPalabras.push(temp);
                    }
                })

                setInputs({...inputs, words:newPalabras}) 

            }else{

                let newPalabras = inputs.words.filter((item)=>{
                    return item.id !== id;
                })
                newPalabras = newPalabras.map((palabra, index)=>{
                    palabra.id = `${index}-local`
                    return palabra
                })
        
                setInputs({...inputs, words:newPalabras})
            }
        }
    }

    const validInputs=()=>{
        if(inputs.name.length <= 0){
            notificar({title:"Diccionario sin Nombre",
                        message:"Debes darle un nombre unico a tu diccionario",
                        severity:"warning",
                        preventDuplicate:true})
            return false;
        }

        if(inputs.language.length <= 0){
            notificar({title:"El Diccionario no tiene idioma definido",
                        message:"El diccionario debe tener un idioma definido para mejorar la experiencia",
                        severity:"warning",
                        preventDuplicate:true})
            return false;
        }

        if(inputs.words.length <=0){
            notificar({title:"No permitido",
                        message:"No se permiten diccionarios sin palabras",
                        severity:"error",
                        preventDuplicate:true})
            return false;
        }

        let flag = false;
        inputs.words.forEach((palabra)=>{
            if(palabra.name.length <=0){
                notificar({title:`La palabra ${parseInt(palabra.id)+1} no tiene nombre`,
                        message:"No se permiten palabras sin nombre",
                        severity:"error",
                        preventDuplicate:true})
                flag = true;
            }
            if(palabra.meaning.length <=0){
                notificar({title:`La palabra ${parseInt(palabra.id)+1} no tiene significado`,
                        message:"No se permiten palabras sin significado",
                        severity:"error",
                        preventDuplicate:true})
                flag = true;
            }
        })
        if(flag){
            return false;
        }
        return true;
    }

    const confirmProcess = ()=>{
        if(!validInputs()){
            return;
        }
        //show dialong to confirm save or edit the diccionari ...

        setConfirmPopup(true);
    }
    
    const handleKeepDiccionary =()=>{
        setConfirmPopup(false);

        setProcessState("pending")

        if(editing){
            dispatch(DiccionariosActions.eliminarDiccionario(inputs.id));
        }
        
        //if the user is using an account (logged)
        if(SESSION.token){
            if(editing){
                updateOnCloud();
            }else{
                keepOnCloud();
            }
            
        }else{
            const filteredDict = {...inputs, words : inputs.words.filter((item)=>item.state!=="delete")}
            addDiccionarytoState(filteredDict);
            keepLocally(filteredDict);
        }
    }

    const addDiccionarytoState=(dictToKeep)=>{
        dispatch(DiccionariosActions.agregarDiccionario({diccionario: dictToKeep}));
    } 
    

    const keepLocally= (dictToKeep)=>{
        let r = LocalDB.addDiccionary(dictToKeep);

        r.onerror = ()=>{
            notificar({title:"Error al guardar ",
                        message:"Revisa tu almacenamiento y/o configuracion.",
                        severity:"error",
                        })
            setProcessState("stop")
        }
        r.onsuccess = ()=>{
            notificar({title:"Guardado Local",
                        message:"Se ha guardado el diccionario en tu dispositivo.",
                        severity:"success",
                        })
            setProcessState("stop")
            navigate('/aprender')
        }
    }

    const updateOnCloud = ()=>{
        if (isOnline){
            WordyDataService.putNewGroup(inputs, SESSION.token).then((res)=>{

                //Se actualiza con la informacion del servidor
                addDiccionarytoState(res.data.data);
                keepLocally(res.data.data);

                setProcessState("stop");
                notificar({title:"Guardado en la nube",
                    message:"Se ha guardado el diccionario en tu cuenta.",
                    severity:"info",
                    })
                navigate('/aprender');

            }).catch(err=>{
                //agregar a operaciones
                //guardar en operaciones de segundo plano, para ejecutar cuando se tenga internet...
                isLocalOnly()
            })
        }else{
            isLocalOnly()
        }
    }

    const isLocalOnly=()=>{
        if(!inputs.id.includes("local")){
            addDiccionarytoState(inputs);
            keepLocally(inputs);
            notificar({title:"No tienes conexion de internet",
                        message:"No podemos editar en tu cuenta, cuando se tenga conexion se intentara de nuevo.",
                        severity:"error",
                        })
            keepIntoOperations({
                type : "put",
                data : inputs
            });
            navigate("/aprender");
        }else{
            let operations = LocalDB.getOperations();

            operations.onsuccess = ()=>{
                let newPost = operations.result.filter((item)=>item.data.id===inputs.id)[0]
                newPost.data = inputs;
                addDiccionarytoState(inputs);
                keepLocally(inputs);
                LocalDB.addOperations(newPost)
            }

            operations.onerror = ()=>{
                notificar({title:"Error al guardar ",
                        message:"Revisa tu almacenamiento y/o configuracion.",
                        severity:"error",
                        })
            }

            notificar({title:"No tienes conexion de internet",
                        message:"No podemos editar en tu cuenta, cuando se tenga conexion se intentara de nuevo.",
                        severity:"warning",
                        })
        }
    }

    const keepOnCloud = ()=>{
        if (isOnline){
            WordyDataService.postNewGroup(inputs, SESSION.token).then((res)=>{

                //Se actualiza con la informacion del servidor
                setInputs(res.data.data)
                addDiccionarytoState(res.data.data);
                keepLocally(res.data.data);
                setProcessState("stop");
                notificar({title:"Guardado en la nube",
                    message:"Se ha guardado el diccionario en tu cuenta.",
                    severity:"info",
                    })
                
                navigate('/aprender');

            }).catch(err=>{
                //agregar a operaciones
                //guardar en operaciones de segundo plano, para ejecutar cuando se tenga internet...
                addDiccionarytoState(inputs);
                keepLocally(inputs);
                notificar({title:"Error al guardar en la nube",
                            message:"No hemos podido guardarlo en la nube, lo intentaremos mas tarde.",
                            severity:"error",
                        })

                keepIntoOperations({
                    type : "post",
                    data : inputs
                });
            })
        }else{
            addDiccionarytoState(inputs);
            keepLocally(inputs);
            notificar({title:"No tienes conexion de internet",
                        message:"No podemos guardarlo en tu cuenta, cuando se tenga conexion se intentara de nuevo.",
                        severity:"info",
                        })
            keepIntoOperations({
                type : "post",
                data : inputs
            });
            navigate("/aprender");
        }
    }

    const handleCancelEditing =()=>{
        navigate("/aprender");
    }

    return(
        <MainWraper>
            <h2 >
                {editing ? "Editar ": "Agregar " }
                Diccionario
            </h2>

            <form className='form-data' onSubmit={(e)=>{e.preventDefault()}}>

                <label className='campo-input'>
                    Nombre:
                    <input type="text" value={inputs.name} onChange={handleNameChange} maxLength="100" tabIndex="0" pattern="[A-Za-z\s]{1,40}" required="required" />
                </label>

                <label className='campo-idioma'>
                    Idioma:
                    <select name='idioma' value={inputs.language} className='input-idioma' onChange={handleIdioma} ref={idiomaRef} tabIndex="0">
                        {
                            flags.map((item, index)=>{
                     
                                return <option value={item.name} key={index+item.name} >
                                    {item.name}
                                </option>
                                
                            })
                        }
                    </select>

                    <picture className='img-state' onClick={handleClickImg}>
                        <img src={getFlagImg(inputs.language)} alt="imagen de idioma para diccionario" />
                    </picture>
                </label>

            </form>

            <h3 className='title-form'>Palabras</h3>

            <form className='form-palabras' onSubmit={(e)=>{e.preventDefault()}}>
                {
                    inputs.words.filter(item=>item.state !== "delete").map((palabra, i)=>{
                        return <div className='palabra' key={`palabra-${i}`}>
                            <span className="palabra-id">
                                {`${parseInt(i)+1}#`}
                            </span>
                            <div className="palabra-content">
                                <label>
                                    Nombre:
                                    <input type="text" maxLength="50" value={palabra.name} onChange={(e)=>handleUpdatePalabra(e, palabra.id, "name")} pattern="[A-Za-z\s]{1,40}" required="required" />
                                </label>
                                <label>
                                    Significado:
                                    <input type="text" maxLength="50" value={palabra.meaning} onChange={(e)=>handleUpdatePalabra(e, palabra.id, "meaning")} pattern="[A-Za-z\s]{1,40}" required="required" />
                                </label>
                            </div>
                            <div className='palabra-controls'>
                                <button onClick={(e)=>EliminarItem(e, palabra.id)} className='delete-word'>
                                    <img src={deleteImg} alt="icono para eleminiar palabra"/>
                                </button>
                            </div>
                        </div>
                    })
                }
            </form>

            <div className='controls-bottom'>
                <button onClick={AgregarPalabra} className='button-agregar'>
                    <span>&#10133;</span>
                </button>
            </div>

            <div className='controls-final'>
               
                <Fab onClick={handleCancelEditing} variant="extended" color="error" aria-label="add" className="button-guardar">
                    Cancelar
                    <span style={{fontSize:"2rem"}}>&#9995;</span>
                </Fab>

                <Fab onClick={confirmProcess} disabled={processState === "pending"} variant="extended" color="primary" aria-label="add" className="button-guardar" sx={{marginLeft:"auto"}}>
                    Guardar &nbsp;
                    {processState==="pending"? 
                        <Spinner /> 
                    :
                        <img src={guardarImg} alt="Guardar diccionario" />
                    }
                </Fab>

            </div>

            <ComfirmProcessModal title={`¿Quieres ${editing ? "editar ": "agregar " } el diccionario?`}
                                activated={confirmPopup}
                                onActivated={setConfirmPopup}
                                onAcepted={handleKeepDiccionary}/>

        </MainWraper>
    )
}
