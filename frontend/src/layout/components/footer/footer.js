import {Link} from "react-router-dom";

import './footerStyle.scss'

export default function Footer (){
    return (
        <footer className="footer-class">
            <div className='information-block'>
                <ul className='footer-list'>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Acerca de"}} >
                            Acerca de
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Plataformas"}} >
                            Plataformas
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Ejercicios aplicados"}} >
                            Ejercicios aplicados
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Creador"}} >
                            Creador
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    
                </ul>
            </div>
            <div className='information-block'>
                <ul className='footer-list'>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Informacion legal"}} >
                            Informacion legal
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Terminos y condiciones"}} >
                            Terminos y condiciones
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                    <li className='footer-item'>
                        <Link to="/ayuda" state={{section:"Politica y protección de datos"}} >
                            Politica y protección de datos
                        </Link>
                        <span className='flat-block'></span>
                    </li>
                </ul>
            </div>
        </footer>
    );
}