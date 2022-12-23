import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import STORE from './Store/Store';
import DiccionariosActions from './Store/Diccionarios-Slice';
import LocalDB from './Store/LocalStorage/LocalDB';
import WordyDataService from './Services/API-gateaway';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import { SnackbarProvider } from 'notistack';
import { useInternetDetector } from './Hooks/useInternetDetector';

import Layout from "./layout/layout";

import Inicio from "./routes/inicio/inicio";
import Aprender from "./routes/aprender/aprender";
import AgregarDiccionario from './routes/aprender-routes/AgregarDiccionario';
import Diccionarios from "./routes/diccionarios/diccionarios";
import Iniciar from "./routes/iniciarSesion/iniciar";
import RecuperacionPassword from "./routes/recuperarContraseña/recuperarPass";
import {NuevaContrasenaToken, NuevaContrasena} from './routes/recuperarNuevaContraseña/NuevaContrasena';
import RegistroUsuario from "./routes/registrarUsuario/registrarUsuario"; 
import Perfil from "./routes/perfil/perfil";
import ConfiguracionPanel from './routes/configuracion/configuracion';
import EncuestaPanel from './routes/encuesta/encuesta';
//import NotificacionPanel from  './routes/notificaciones/Notificacion';
import VerificarCorreo from './routes/verificarCorreo/VerificarCorreo';
import Ayuda from "./routes/ayuda/ayuda"; 

import NoPage from "./routes/noPage/error404";

import LayoutPractica from "./layoutPracticar/layoutPracticar";
import Practica from './routes/practica/practica';


export default function App(){

  return(
    <Provider store={STORE}>
      <SnackbarProvider maxSnack={3}>
        <RoutingApp />
      </SnackbarProvider>
    </Provider>
  )
}

function RoutingApp() {
  const dispatch = useDispatch();
  const [isOnline] = useInternetDetector();
  const SESSION = useSelector(state=>state.session);

  //Load the diccionaries from local IndexedDB if isOnline do persistance data, then load data... from cloud
  useEffect(()=>{
    if (isOnline && SESSION.token!==""){
      //console.log("Ejecutar operaciones persistencia de datos");

      LocalDB.withDB((db)=>{
        let transaction = db.transaction("Operations", "readwrite");
        let store = transaction.objectStore("Operations");
        let r = store.getAll();

        r.onsuccess = ()=>{

          if(r.result.length > 0){
            //console.log("Ejecutando cada operacion")

            dispatch(DiccionariosActions.loadLocalDiccionaries({
              loadLocalState : "synchronization",
              diccionarios: []
            }))

            //agregar promesas de fetch ...
            let OperacionesArray = getArrayOperations(r.result);

            Promise.all(OperacionesArray).then(values => {
              //console.log("Operaciones realizadas")
              loadLocalDicts();
              
            })
            
          }else{
            loadLocalDicts();
          }
        }
      })
    }else{
      loadLocalDicts();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOnline, SESSION.token])

  const loadLocalDicts=()=>{
    if(isOnline){
      loadFromCloud();
    }else{
      loadIndexedElements();
    }
    
  }
  
  const loadIndexedElements = ()=>{
    LocalDB.withDB((db)=>{
      let transaction = db.transaction("Diccionario");
      let store = transaction.objectStore("Diccionario");
      let r = store.getAll();

      r.onerror=()=>{
        dispatch(DiccionariosActions.loadLocalDiccionaries({
          loadLocalState : "loaded",
          diccionarios: []
        }))
      }

      r.onsuccess = ()=>{
        dispatch(DiccionariosActions.loadLocalDiccionaries({
          loadLocalState : "loaded",
          diccionarios: r.result
        }))
      }
    })
  }

  const loadFromCloud = ()=>{
    if(SESSION.token===""){
      loadIndexedElements();
      return;
    }

    WordyDataService.getAllDiccionaries(SESSION.token).then((res)=>{

      LocalDB.withDB((db)=>{
        let transaction = db.transaction("Diccionario", "readwrite");
        let store = transaction.objectStore("Diccionario");
        let r = store.clear();

        r.onsuccess = ()=>{
          
          dispatch(DiccionariosActions.loadLocalDiccionaries({
            loadLocalState : "loaded",
            diccionarios: res.data.data
          }))
          
          for(let dict of res.data.data){
            store.put(dict);
          }

        }

      });

    }).catch(err=>{
      loadIndexedElements();
    })

  }

  const getArrayOperations = (arr)=>{
    let arrayPromises = [];

    for (let ope of arr){
      if(ope.type === "post"){
        arrayPromises.push(
          WordyDataService.postNewGroup(ope.data, SESSION.token).then((res)=>{

              LocalDB.withDB((db)=>{
                let transaction = db.transaction("Operations", "readwrite");
                let store = transaction.objectStore("Operations");
                let deleted = store.delete(ope.id);
                
                deleted.onsuccess=()=>{

                  LocalDB.withDB((db)=>{
                    let transaction = db.transaction("Diccionario", "readwrite");
                    let store = transaction.objectStore("Diccionario");
                    let deletedLocal = store.delete(ope.data.id);
                    
                    deletedLocal.onsuccess = ()=>{
                      store.put(res.data.data)
                    }

                  })

                }
              });

          }).catch(err=>{
              console.log(err)
          })
        )
      }  
      if(ope.type === "put"){
        arrayPromises.push(
          WordyDataService.putNewGroup(ope.data, SESSION.token).then((res)=>{

              LocalDB.withDB((db)=>{
                let transaction = db.transaction("Operations", "readwrite");
                let store = transaction.objectStore("Operations");
                let deleted = store.delete(ope.id);
                
                deleted.onsuccess=()=>{

                  LocalDB.withDB((db)=>{
                    let transaction = db.transaction("Diccionario", "readwrite");
                    let store = transaction.objectStore("Diccionario");
                    let deletedLocal = store.delete(ope.data.id);
                    
                    deletedLocal.onsuccess = ()=>{
                      store.put(res.data.data)
                    }

                  })

                }
              });

          }).catch(err=>{
              console.log(err)
          })
        )
      }  
      if(ope.type === "delete"){
        arrayPromises.push(
          WordyDataService.deleteGroup(ope.data, SESSION.token).then((res)=>{
              LocalDB.withDB((db)=>{
                let transaction = db.transaction("Operations", "readwrite");
                let store = transaction.objectStore("Operations");
                store.delete(ope.id);
              });

          }).catch(err=>{
              //console.log(err)
          })
        )
      }
    }

    return arrayPromises;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <BrowserRouter>
          <Routes>

            <Route path="/" element={<Layout />}>
              <Route index element={<Inicio />} />

              <Route path="/aprender" element={<Aprender />} />
              <Route path="/agregar-diccionario" element={<AgregarDiccionario />} />
              <Route path="/editar/:id" element={<AgregarDiccionario />} />

              <Route path="/diccionarios" element={<Diccionarios />} />

              <Route path="/iniciar-sesion" element={<Iniciar />} />
              <Route path="/recuperar-contrasena" element={<RecuperacionPassword />} />
              <Route path="/registro" element={<RegistroUsuario />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/configuracion" element={<ConfiguracionPanel />} />
              <Route path="/encuesta" element={<EncuestaPanel />} />
              {/* <Route path="/notificacion" element={<NotificacionPanel />} /> */}
              <Route path="/verificar-correo" element={<VerificarCorreo />} />

              <Route path="/ayuda" element={<Ayuda />}/>

            </Route>
            
            <Route path="/recuperar-contrasena/user/:token" element={<NuevaContrasenaToken />} />
            <Route path="/recuperar-contrasena/user" element={<NuevaContrasena />} />

            <Route path='/practica' element={<LayoutPractica />}>
              <Route path="/practica/:name" element={<Practica />}/>
            </Route>

            <Route path="*" element={<NoPage />} />

          </Routes>
       </BrowserRouter>
    </AnimatePresence>
  );
}