import MainWraper from './../../components/MainWraper/Main';

import './style.scss';

import Logo from './../../components/Logo/Logo';

export default function EncuestaPanel(){
    return(
        <MainWraper>
            <h2 className='title-header spacing'>Ayuda a wordy</h2>

            <Logo />

            <h3 className='title-attractive'>
                Nos importa tu opinion.
            </h3>

            <p className='text-msj'>
                Por eso nos gustaria que nos 
                compatieras tu experiencia sobre la aplicación.
                Participa en la cuesta de satisfaccion para ayudarnos a mejorar.
            </p>

            <p className='text-msj'>
                Nos permite medir y gestionar
                la calidad de las funcionabilidades de cada uno de los apartados brindados.
                Las Respuestas exploran puntos como:
            </p>

            <ul className='lista-msj'>
                <li>Respuestas de valor</li>
                <li>Objetivo compartido</li>
                <li>Comunicación horizontal</li>
            </ul>

            <a href='https://forms.gle/NV8VzmqTCDTeCLvBA' 
                rel='noreferrer' target="_blank" 
                className='button-encuesta'>
                Encuesta Wordy
            </a>

        </MainWraper>
    )
}