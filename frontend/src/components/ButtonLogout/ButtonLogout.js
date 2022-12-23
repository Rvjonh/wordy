import { useDispatch } from 'react-redux';
import SessionActions from './../../Store/Session-Slice';
import GlobalNotificationsActions from './../../Store/GlobalNotification-Slice';
import DiccionariosActions from './../../Store/Diccionarios-Slice';
import LocalDB from './../../Store/LocalStorage/LocalDB';

import './ButtonLogoutStyle.scss';

export default function ButtonLogout({onClick=f=>f}){
    const dispach = useDispatch();

    const handleCloseSession =()=>{
        onClick();
        dispach(SessionActions.Logout());
        dispach(GlobalNotificationsActions.desactivateEmailVerification());

        dispach(DiccionariosActions.clearDiccionarios());

        LocalDB.withDB((db)=>{
          let transaction = db.transaction("Diccionario", "readwrite");
          let store = transaction.objectStore("Diccionario");
          store.clear();
        });
  
        LocalDB.withDB((db)=>{
          let transaction = db.transaction("Operations", "readwrite");
          let store = transaction.objectStore("Operations");
          store.clear();
        });
    }

    return(
        <div className='cerrar-sesion'>
            <button className="closed-button" onClick={handleCloseSession}>
                Cerrar Sesión
            </button>
        </div>
    )
}