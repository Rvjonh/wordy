import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiccionariosActions from './../../Store/Diccionarios-Slice';
import { useNavigate } from 'react-router-dom';

import { DICTIONARY_ASSETS } from './../../Assets/Controlador';
import MainWraper from './../../components/MainWraper/Main';
import Button from '@mui/material/Button';
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import { getDateTime } from './../../Functions/getDateTime';

import LocalDB from './../../Store/LocalStorage/LocalDB';
import WordyDataService from './../../Services/API-gateaway';
import keepIntoOperations from './../../Store/LocalStorage/PersistanOperations';

import { useNotification } from './../../Hooks/useNotification';
import { useInternetDetector } from './../../Hooks/useInternetDetector';


import divesionLine from './../inicio/assets/ventajas-block/diversion-line.png';
import diversionLine2 from './../inicio/assets/ventajas-block/diversion-line2.png';
import diversionStars from './../inicio/assets/ventajas-block/diversion-stars.png';

export default function FinishedPractice({DiccionarioInfo={}, records=[]}){
    const SESSION = useSelector(state=>state.session)
    const DICCIONARIOS = useSelector(state=>state.diccionarios.diccionarios)
    const [isOnline] = useInternetDetector();

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [ notificar ] = useNotification();
    
    const [loading, setLoading] = useState(true);
    const [WordsData, setWordsData] = useState([])
    const [newDict, setNewDict] = useState({})

    const [keeping, setKeeping] = useState(false);
    
    useEffect(()=>{

        let auxRecord = records.map((item)=>{
            let auxItem = item;
            delete auxItem.type;
            let newLevel = item.level<10? item.level+1 : 10;

            return { ...auxItem, level: newLevel, lastPlay: getDateTime()}
        })
        setWordsData(auxRecord);

        let DictToUpdate = DICCIONARIOS.filter((item)=>item.id === DiccionarioInfo.id)[0]

        DictToUpdate = {
            ...DictToUpdate,
            lastPlay : getDateTime(),
            words : DictToUpdate.words.map((item)=>{
                if(!isWordPracticated(item, auxRecord)){
                    return {...auxRecord.filter((word)=>word.id===item.id)[0], state:"update"}
                }
                return {...item};
            })
        }
        setNewDict(DictToUpdate) 
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const isWordPracticated = (word, wordsUpdated)=>{
        let flag = true;
        for(let i=0 ; i<wordsUpdated.length ; i++){
            if(wordsUpdated[i].id === word.id){
                flag = false;
            }
        }
        return flag;
    }
    

    const handleSendToConfiguration=()=>{
        navigate("/configuracion")
    }

    const FinishReport = ()=>{
        navigate("/aprender")
    }
    

    const handleKeepData = ()=>{
        
        setKeeping(true);

        if(SESSION.token){
            updateOnCloud()
        }else{
            keepState(newDict);
            keepLocally(newDict);
            navigate("/aprender")
        }
    }

    const updateOnCloud = ()=>{
        if (isOnline){
            WordyDataService.putNewGroup(newDict, SESSION.token).then((res)=>{

                //Se actualiza con la informacion del servidor
                keepState(res.data.data);
                keepLocally(res.data.data);

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
        if(!newDict.id.includes("local")){
            keepState(newDict);
            keepLocally(newDict);
            notificar({title:"No tienes conexion de internet",
                        message:"No podemos editar en tu cuenta, cuando se tenga conexion se intentara de nuevo.",
                        severity:"error",
                        })
            keepIntoOperations({
                type : "put",
                data : newDict
            });
            navigate("/aprender");
        }else{
            let operations = LocalDB.getOperations();

            operations.onsuccess = ()=>{
                let newPost = operations.result.filter((item)=>item.data.id===newDict.id)[0]
                newPost.data = newDict;
                keepState(newDict);
                keepLocally(newDict);
                LocalDB.addOperations(newPost)
                navigate("/aprender");

                notificar({title:"No tienes conexion de internet",
                        message:"No podemos editar en tu cuenta, cuando se tenga conexion se intentara de nuevo.",
                        severity:"warning",
                        })
            }

            operations.onerror = ()=>{
                notificar({title:"Error al guardar ",
                        message:"Revisa tu almacenamiento y/o configuracion.",
                        severity:"error",
                        })
                navigate("/aprender");
            }
        }
    }

    const keepState=(newDictionary)=>{
        dispatch(DiccionariosActions.actualizarDiccionario({
            dictID : newDictionary.id,
            newDict : newDictionary
        }))
    }
    
    const keepLocally= (dictToKeep)=>{
        let r = LocalDB.addDiccionary(dictToKeep);

        r.onerror = ()=>{
            notificar({title:"Error al guardar",
                        message:"Revisa tu almacenamiento y/o configuracion.",
                        severity:"error",
                        })
        }
        r.onsuccess = ()=>{
            notificar({title:"Guardado Local",
                        message:"Se ha guardado el diccionario en tu dispositivo.",
                        severity:"success",
                        })
        }
    }


    if(records.length <= 0){
        return(
            <MainWraper>
                <TitleComun title="Practica Terminada" />

                <div className='container-view'>
                    <p className='extra-text extra-centered' >
                        Parece que no has podido realizar ningún ejercicio, no te preocupes.
                    </p>
                    <p className='extra-text extra-centered' >
                        Puedes cambiar la configuración y volver a intentarlo. Con ejercicios que funcionen a tu gusto.
                    </p>
                    
                    <div className='img-muestra'>
                        <picture className='img-object'>
                            <img src={DICTIONARY_ASSETS.editar} alt="editar configuracion" />
                        </picture>
                        <div>
                            <Button onClick={handleSendToConfiguration} variant="contained" size="large" color="info">
                                Configuracion
                            </Button>
                        </div>
                    </div>
                </div>
            
                <FooterComands onClick={FinishReport} title="Terminar" type="error" />
            </MainWraper>    
        )
    }
    
    return(
        <MainWraper>
            <TitleComun title="Practica Terminada" />

            <p className='extra-text extra-centered' >
                Has interactuado con estas palabras y subirán su nivel de confianza:
            </p>

            <section className='words-panel words-panel-edited'>
                <table className='words-table'>
                    <thead>
                        <tr>
                            <th>Palabra</th>
                            <th>Significado</th>
                            <th className='txt-centered column-small'>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  WordsData.map((item)=>{
                            return <tr key={`word-${item.id}`} 
                                        className="row">

                                <td>{item.name}</td>
                                <td>{item.meaning}</td>
                                <td className='txt-centered column-small'>{item.level} &#9195;</td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>

            {loading &&  <Spinner />}

            <FooterComands disabled={keeping} onClick={handleKeepData} title="Guardar y Salir" type="success"/>
        </MainWraper>
    )
}

const TitleComun=({title="Se ha terminado"})=>{
    return(
        <h2 className="title-e title-centered title-finish">
            <picture className="img-ejercicio">
                <img src={DICTIONARY_ASSETS.flame} draggable={false} alt="logo de representacion para ejercicios de escritura" />
            </picture>
            {title}
            <picture className="img-ejercicio">
                <img src={DICTIONARY_ASSETS.flame} draggable={false} alt="logo de representacion para ejercicios de escritura" />
            </picture>
        </h2>
    )
}

const FooterComands = ({disabled=null, onClick=f=>f, title="Terminar", type="success"})=>{
    return(
        <section className={`commands-section ${type}`}>
            {type==="success"?
                <picture className='list-icon'>
                    <img className='icon' src={divesionLine} draggable="false" alt="imagen animada sobre diversion en wordy" />
                    <img className='icon' src={diversionLine2} draggable="false" alt="imagen animada sobre diversion en wordy" />
                    <img className='icon' src={diversionStars} draggable="false" alt="imagen animada sobre diversion en wordy" />
                </picture>
            :
                <div></div>
            }

            <Button disabled={disabled} onClick={onClick} variant="contained" size="large" color={type}>
                {title}
                {disabled && <Spinner />}
            </Button>
        </section>
    )
}