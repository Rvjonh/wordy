import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { useState } from 'react';

import './headerStyle.scss';

import Logo from './../../../components/Logo/Logo';


import aprenderLogo from './assets/aprender-logo.png';
import profileLogo from './assets/cuenta-icon.png';

import LoginButton from './../../../components/loginButton/loginButton'
import RegistrarButton from './../../../components/registroButton/registrarButton'
import ButtonLogout from './../../../components/ButtonLogout/ButtonLogout';

export default function Header (){
    const STATE = useSelector(state => state.session);

    const [isActive, setActive] = useState(false);

    const handleMenuPopup = () => {
        setActive(!isActive);
    };

    const keepNormal = () =>{
        //when the menu is not need; desactivated
    }
    return (
        <div className="back-header">
            <header className="header-index">

            <Link to="/" tabIndex="0">
                <Logo />
            </Link>

            <nav className={`header-menu ${isActive ? "active" : ""}`}>
                <div tabIndex="0" className="container-button" onClick={handleMenuPopup}>
                    <h2>Menu</h2>
                    <div className={`container ${isActive ? "change" : ""}`}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>  
                </div>

                <div className={`block-menu ${isActive ? "active" : ""}`}>
                    <ul>
                        <li onClick={isActive? handleMenuPopup : keepNormal} className="hover-selected"> <Link to="/aprender">Aprender<img src={aprenderLogo} alt="imagen de referencia hacia la seccion de aprender" draggable="false" /></Link></li>
                        
                        {!STATE.token && 
                            <>
                                <li onClick={isActive? handleMenuPopup : keepNormal} className=""> <LoginButton /> </li>
                                <li onClick={isActive? handleMenuPopup : keepNormal} className=""> <RegistrarButton/> </li>
                            </>
                        }

                        {STATE.token &&
                        <>
                            <li onClick={isActive? handleMenuPopup : keepNormal} className="hover-selected"> <Link to="/perfil">Perfil<img src={profileLogo} alt="imagen de referencia hacia el pefil de usuario" draggable="false" /></Link> </li>
                            <li onClick={isActive? handleMenuPopup : keepNormal} className="hover-selected to-bottom">
                                <ButtonLogout />
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>

            </header>
        </div>
    );
}