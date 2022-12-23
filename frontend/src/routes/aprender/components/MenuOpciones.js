import { motion } from "framer-motion";
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiccionariosActions from './../../../Store/Diccionarios-Slice';
import { useNavigate } from 'react-router-dom';

import { useNotification } from './../../../Hooks/useNotification';
import { useInternetDetector } from './../../../Hooks/useInternetDetector';

import LocalDB from './../../../Store/LocalStorage/LocalDB';
import WordyDataService from './../../../Services/API-gateaway';
import keepIntoOperations from './../../../Store/LocalStorage/PersistanOperations';


import popupImg1 from './../assets/dictionary-component/popup1.png';
import popupImg2 from './../assets/dictionary-component/x.png';
import editarImg from './../assets/dictionary-component/editar.png';
import eliminarImg from './../assets/dictionary-component/delete.png';

import ComfirmFieldModal from './../../../components/ComfirmFieldModal/ComfirmFieldModal';


export default function MenuOpciones({data}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ notificar ] = useNotification();
    const [isOnline] = useInternetDetector();
    const SESSION = useSelector(state=>state.session);



    const menuRef = useRef(null);
    const [isOpen, setisOpen] = useState(false);

    const [popup, setPopup] = useState(false);
    const [TempNameDic, setTempNameDic] = useState("");

    const handleShowMenu=()=>{
        setisOpen(!isOpen);
    }
    let animation = {
        open: {
            width : "9em",
            height : "10.5em",
            top : "0.2em",
            right : "0.2em",
            borderRadius : "0.2em",
            border : "0.2em solid rgba(128, 128, 128, 0.5)",
            backgroundColor : "rgb(233, 233, 233)"
        },
        closed: { 
            top : "0em",
            right : "0em",
            borderRadius : "0em",
            backgroundColor : "rgba(233, 233, 233, 0)"
        }
    }

    let appearIcon = {
        hidden : {
            display: "none",
            opacity : 0
        },
        show : {
            display: "block",
            opacity : 1
        }
    }
    

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event) => {
        if (menuRef && menuRef !== null) {
          const cur = menuRef.current;
          if (cur && !cur.contains(event.target)) {
            setisOpen(false);
          }
        }
    }

    const handleEditDict =()=>{
        navigate(`/editar/${data.id}`, {
            state:data
        });
    }

    const handleDeleteDictionary = ()=>{
        //Comprobar que se desea eliminar ...
        if(data.name !== TempNameDic){
            notificar({
                title:"El nombre no coincide",
                message : "Si el nombre no coincide no se eliminara.",
                severity : "error"
            })
            setPopup(false);
            setTempNameDic("");
            return;   
        }

        //if the user is using an account (logged)

        deleteFromState();
        deleteFromIndexDB();

        if(SESSION.token!==""){
            if(isOnline){
                deleteOnCloud();
            }else{
                keepOnLocalToDeleteOnCloud();
            }   
        }

        setPopup(false);
        setTempNameDic("");
    }
    const deleteFromState=()=>{
        dispatch(DiccionariosActions.eliminarDiccionario(data.id));
    }
    const deleteFromIndexDB = ()=>{
        LocalDB.withDB((db)=>{
            let transaction = db.transaction("Diccionario", "readwrite");
            let store = transaction.objectStore("Diccionario");
            let r = store.delete(data.id)

            r.onsuccess = ()=>{
                notificar({
                    title:"Eliminado Exitosamente",
                    message : "El diccionario se ha eliminado del almacenamiento local...",
                    severity : "success"
                })
                //eliminar del estado (redux)
            }

            r.onerror = ()=>{
                notificar({
                    title:"Error al eliminar",
                    message : "No se pudo eliminar, tu almacenamiento local fallo.",
                    severity : "error"
                })
            }
        })
    }
    const deleteOnCloud=()=>{
        WordyDataService.deleteGroup({"id":data.id}, SESSION.token).then((res)=>{
            notificar({
                title:"Eliminado Exitosamente",
                message : "El diccionario se ha eliminado de tu cuenta.",
                severity : "success"
            })

        }).catch(err=>{

            notificar({
                title:"Error al Eliminar en tu cuenta",
                message : "No se ha podido eliminar, se intentara mas tarde.",
                severity : "warning"
            })

            keepIntoOperations({
                type : "delete",
                data : {"id":data.id}
            });
        })
    }

    const keepOnLocalToDeleteOnCloud=()=>{
        notificar({
            title:"Error al Eliminar",
            message : "No tienes conexion, se intentara mas tarde eliminar de tu cuenta.",
            severity : "warning"
        })

        keepIntoOperations({
            type : "delete",
            data : {"id":data.id}
        });
    }

    return(
        <motion.div 
            animate={isOpen ? "open" : "closed"}
            variants={animation}
            transition={{duration:0.25}}
            ref={menuRef}
            className="menu-dic">
            
            <button onClick={handleShowMenu} className="button-popup">
                {!isOpen
                    ? <motion.img initial="in" animate="out" variants={appearIcon} src={popupImg1} alt="icono para abrir el menu en el diccionario" />
                    : <motion.img initial="in" animate="out" variants={appearIcon} src={popupImg2} alt="icono para cerrar el menu en el diccionario" />
                }
            </button>
            
            <motion.ul 
                animate={isOpen ? "show" : "hidden"}
                variants={appearIcon}
                transition={{duration:0.25}}
                className="list-options">

                    <li className="item-options edit" onClick={handleEditDict} >
                        <img className="img-icon" src={editarImg} alt="imagen de icono"/>
                        Editar
                    </li>
                    <li className="item-separator" ></li>
                    <li className="item-options delete" onClick={()=>setPopup(true)}>
                        <img className="img-icon" src={eliminarImg} alt="imagen de icono"/>
                        Eliminar
                    </li>
            </motion.ul>

            <ComfirmFieldModal title="Confirma para eliminar el diccionario"
                                message={`Ingresa el nombre del diccionario para eliminarlo:`}
                                messageBold={`${data.name}`}
                                activated={popup}
                                onActivated={setPopup}
                                typefield="email"
                                typefieldtitle="Nombre del diccionario"
                                valueField={TempNameDic}
                                setValueField={setTempNameDic}
                                onAcepted={handleDeleteDictionary}/>
        </motion.div>
    );
}