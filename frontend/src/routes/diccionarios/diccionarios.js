import { useState, useEffect } from 'react';

import { motion } from "framer-motion";

import { useInternetDetector } from './../../Hooks/useInternetDetector';
import WordyDataService from './../../Services/API-gateaway';

import './diccionariosStyle.scss';
import { flags } from './../../Assets/Controlador';

import MainWraper from './../../components/MainWraper/Main';
import NoInternetPanel from './../../components/NoInternetPanel/NoInternetPanel';
import Dictionary from './components/diccionario';
import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import NoneDiccionaries from './../aprender/components/MessageNoneDictionaries';
import ServerErrorPanel from './../../components/ServerErrorPanel/ServerErrorPanel';

function Diccionarios (){

  const [isOnline] = useInternetDetector();
  const [language, setLanguage] = useState("");
  const [request, setRequest] = useState("pending");
  const [dicts, setDicts] = useState([]);

    useEffect(() => {
        document.title = "Wordy - Diccionarios";
        handleLanguageSelection(flags[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLanguageSelection=(valor)=>{
      if(valor!==language){
        setLanguage(valor);
        setRequest("pending");
        requestDictsByLanguage(valor)
      }
    }

    const requestDictsByLanguage=(idioma)=>{
      WordyDataService.getAllSharedDiccionaries(idioma).then((res)=>{
        setDicts(res.data.data);
        setRequest("loaded");
      
      }).catch((err)=>{
        setRequest("error");
      })
    }

    if(!isOnline){
      return(
        <MainWraper>
            <NoInternetPanel />
        </MainWraper>
      )
    }
    
    return(
        <MainWraper >
          <header className='dicts-header'>
            <h2 className='title'>
              Agregar diccionarios
            </h2>
            <p className='text'>
              Puedes revisar algunos diccionarios con listas preestablecidas para empezar con Wordy … sin embargo puedes también editarlos.
            </p>
          </header>

          
          <section className='language-selection'>
            <h2 className='title'>
              Idioma:
            </h2>
            <ul className='list-selection'>
              {
              flags.map((item, index)=>{
                return <li className={`img-item ${language===item.name? "selected" : ""}`} 
                          key={`${index}-${item.name}`}
                          onClick={()=>handleLanguageSelection(item.name)}>
                  <img src={item.flag} alt={`idioma ${item.name}`} />
                </li>
              })
              }
            </ul>
          </section>

          <div className="section-title">
            <h3 className="title">Diccionarios</h3>
          </div>

          <motion.section className="dictionaries" transition={{delayChildren:20}}>

            {request==="pending" &&
              <Spinner text="Descargando Diccionarios ..."/>
            }

            {request==="loaded" &&
                dicts.map((item)=>{
                  return <Dictionary data={item} key={`dict-${item.id}`} />
                })
            }

            {(dicts.length === 0 && request==="loaded") &&
                <NoneDiccionaries text="Actualmente no hay diccionarios para este idioma, Tambien puedes crear uno."
                                  linkText="Crear diccionario para ti"
                                  />
            }

            {request==="error" &&
              <ServerErrorPanel />
            }

          </motion.section>

        </MainWraper>
    );
}

export default Diccionarios;