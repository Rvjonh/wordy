import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import './headerPracticeStyle.scss';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import SessionActions from './../../../Store/Session-Slice';

import LoggedUser from './../../../components/loggedUser/loggedUser.js';

import practicarLogo from './assets/practicar-icon.png';
import diccionariosLogo from './assets/diccionarios-icon.png';

import cuentaLogo from './assets/cuenta-icon.png';
import closeMenuLogo from './assets/close-menu-icon.png';
import ButtonLogout from "./../../../components/ButtonLogout/ButtonLogout";

export default function HeaderPractice(){
    const STATE = useSelector(state => state.session)

    const dispach = useDispatch()
    const navigate = useNavigate();

    const location = useLocation();
    const [isMenuActive, setMenuActive] = useState(false);

    const checkSelection = (sectionString)=>{
        return sectionString === location.pathname;
    }

    const handleShowMenu = ()=>{
        setMenuActive(!isMenuActive);
    }

    const handleCloseSession = ()=>{
        dispach(SessionActions.Logout())
        navigate('/iniciar-sesion');
        handleShowMenu();
    }

    return (
        <header className="header-main">

            <div className={`section ${checkSelection("/aprender")? 'active': ''}`}>
                <Link to="/aprender">
                    <h2 className="title-section">Practicar</h2>
                    <picture className="block-img-section">
                        <img className="img-section" src={practicarLogo} draggable="false"  alt="logo de practicar tus diccionarios"/>
                    </picture>
                </Link>
            </div>
            
            <div className={`section ${checkSelection("/diccionarios")? 'active': ''}`}>
                <Link to="/diccionarios">
                    <h2 className="title-section">Diccionarios</h2>
                    <picture className="block-img-section">
                        <img className="img-section" src={diccionariosLogo} draggable="false" alt="Diccionarios que puedes hacer tuyos para practicar"/>
                    </picture>
                </Link>
            </div>

            <button className="button-menu" onClick={handleShowMenu}>
                <img className="button-menu-img" src={cuentaLogo} draggable="false" alt="Logo de cuenta de usuario"/>
            </button>

            <nav className={`menu-screen ${isMenuActive? 'showMenu': ''}`} >
               
               <div className="back-block" onClick={handleShowMenu}></div>

               <div className="menu-block">

                    <button className="close-menu-button" onClick={handleShowMenu}>
                        <img src={closeMenuLogo} draggable="false" alt="logo de cerrar el menu de cuenta de usuario" />
                    </button>

                    <div className="menu-options">
                        <h2 className="title-options">Cuenta <LoggedUser /> </h2>
                        <ul className="list-options">
                            
                            {STATE.token && 
                                <li onClick={handleShowMenu}><Link to='/perfil'>Tu perfil</Link></li> 
                            }

                            {!STATE.token && 
                                <>
                                    <li onClick={handleShowMenu} className="iniciar-button"><Link to="/iniciar-sesion">Iniciar cuenta</Link></li>
                                    <li onClick={handleShowMenu} className="registrar-button"><Link to='/registro' >Registrarse</Link></li>
                                    <li className="separador"></li>
                                </>
                            }
                            
                            <li onClick={handleShowMenu}><Link to='/configuracion'>Configuración</Link></li> 
                            <li onClick={handleShowMenu}><Link to='/encuesta'>
                                <span className="showcase-animation" >&#11088;</span>
                                <span className="item-static" >Encuesta</span>
                                <span className="showcase-animation" >&#11088;</span>
                            </Link></li> 
                            {/* <li onClick={handleShowMenu}><Link to='/notificacion'>Notificacion</Link></li>  */}

                            <li className="separador"></li>

                            <li><Link to="/">Inicio</Link></li>
                            <li onClick={handleShowMenu}><Link to='/ayuda' state={{section:"Acerca de"}} >Ayuda</Link></li>
                            
                            {STATE.token && 
                                <ButtonLogout onClick={handleCloseSession} />
                            }
                            
                        </ul>
                    </div>

               </div>

            </nav>

        </header>
    );
}