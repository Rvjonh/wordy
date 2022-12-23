
import { HEADER_ASSETS } from './../../Assets/Controlador';
import './LogoStyles.scss';

export default function Logo({className=""}){
    return(
        <div className={"header-logo "+className}>
            <picture className="block-img">
                <img className="img-logo" width="80px" height="50" src={HEADER_ASSETS.Logo} alt="logo de la aplicación wordy" draggable="false" />
            </picture>
            <h1 className="header-tittle" >Wordy</h1>
        </div>
    )
}