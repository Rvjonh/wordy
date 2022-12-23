import { motion } from "framer-motion";
import { useState, useRef, useEffect } from 'react';



import { CONTROLS_ASSETS } from './../../../Assets/Controlador';
import popupImg2 from './../assets/dictionary-component/x.png';
import { flags } from './../../../Assets/Controlador';



export default function SortingButton({ selected="todos", setTypeSort=f=>f, typeDict=[]}){
    
    const menuRef = useRef(null);
    const [isOpen, setisOpen] = useState(false);

    const animation = {
        open: {
            width : "10em",
            height : `${7+(typeDict.length*2.13)}em`,
            border : "0.2em solid rgba(128, 128, 128, 0.5)",
            backgroundColor : "rgb(233, 233, 233)",
        },
        closed: { 
            borderRadius : "0em",
            backgroundColor : "rgba(233, 233, 233, 0)"
        }
    }
    
    const appearIcon = {
        hidden : {
            display: "none",
            opacity : 0
        },
        show : {
            display: "block",
            opacity : 1
        }
    }


    const handleShowMenu=()=>{
        setisOpen(!isOpen);
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

    const handleSelection=(valor)=>{
        setTypeSort(valor);
        handleShowMenu();
    }

    const showConfiguracionIcon=()=>{
        return selected!=="todos" && selected!=="fecha" && !isOpen ;
    }

    return(
        <motion.div 
            animate={isOpen ? "open" : "closed"}
            variants={animation}
            ref={menuRef}
            className="menu-dic sort-menu">
            
            <button onClick={handleShowMenu} className="button-popup sort-button">
                {!isOpen
                    ? <motion.img initial="in" animate="out" variants={appearIcon} src={CONTROLS_ASSETS.sort} className="sort-img" alt="icono para abrir el menu de ordenamiento" />
                    : <motion.img initial="in" animate="out" variants={appearIcon} src={popupImg2} alt="icono para cerrar el menu de ordenamiento" />
                }
                {showConfiguracionIcon() && <span className="sort-icon">&#9989;</span>}
            </button>
            
            <motion.ul 
                animate={isOpen ? "show" : "hidden"}
                variants={appearIcon}
                transition={{duration:0.25}}
                className="list-options list-sort">

                    <li className="item-options" onClick={()=>handleSelection("todos")}>
                        {selected==="todos" && <span>&#9989;</span>}
                        Todos
                    </li>
                    <li className="item-options" onClick={()=>handleSelection("fecha")}>
                        {selected==="fecha" && <span>&#9989;</span>}
                        Fecha
                    </li>
                    <li className="item-separator sort-edited"></li>

                    {typeDict.map((item)=>{
                        return <li className="item-options item-centered" key={`dict-${item}`} onClick={()=>handleSelection(item)}>
                                    {selected===item && <span>&#9989;</span>}
                                    {item}
                                    <img className="tiny-img"  src={flags.filter((flag)=>flag.name===item)[0].flag} alt={`bandera del diccionario en ${item}`}/>
                                </li>
                    })}
            </motion.ul>

        </motion.div>
    );
}