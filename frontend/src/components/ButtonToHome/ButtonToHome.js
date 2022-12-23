import { Link } from 'react-router-dom'

import './ButtonToHome.scss';

let font_colors = {
    "black":"f-black",
    "white":"f-white"
}

let sizeButton = {
    "1":"",
    "2":"button-home_big"
}

export default function ButtonToDirection({ direction="/", texto="Ir a Inicio", bg="blue", fColor="black", size="1" , className, style}){

    return(
        <Link to={direction}><button className={`button-home ${bg} ${font_colors[fColor]} ${sizeButton[size]} ${className}`} style={style} >{texto}</button></Link>
    )
}