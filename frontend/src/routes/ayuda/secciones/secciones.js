import Logo from './../../../components/Logo/Logo';

import ImgExample from './ImgExample';
import DispositivosImg from './../assets/multiples-dispositivos.png'
import { NAVEGADORES_ASSETS } from './../../../Assets/Controlador';
import Container from './../../../components/Container/Container';

import HowItWorksImg from './../assets/howWorks.png';
import SMlogo from './../assets/SM.png';

import { EJERCICIOS_ASSETS } from './../../../Assets/Controlador';

export function Acerca(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Acerca de la aplicación</h3>

            <Logo />

            <p className="section-ayuda-p">
                Es una aplicacion web progresiva (PWA) la cual te ayudara a practicar
                las palabras que registres, en el idioma que estes estudiando, totalmente
                gratis, solo tienes que guardar las palabras que deseas aprender y empezar a hacer
                los ejercicios que wordy tiene.
            </p>

            <p className="section-ayuda-p">
                Al ser una PWA puedes instalarla y utilizarla en cualquier dispositivo, no te olvides
                de registrarte para poder tener tus palabras en otros dispositivos, tambien puedes 
                instalar la aplicacion y seguir practicando offline.
            </p>

            <div className="space-block"></div>
        </div>
    );
}

export function Plataformas(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Plataformas</h3>

            <ImgExample img={DispositivosImg} />

            <p className="section-ayuda-p">
                Wordy esta pensado para funcionar en cualquier dispositivo que posea un navegador web,
                ya que se utilizan tecnologias web para poder crear esta aplicacion.
            </p>

            <p className="section-ayuda-p">
                Por ende, si quieres utilizar wordy solo tienes que ingresar al enlace oficial de wordy.
                Una vez en el sitio web puedes utilizar la aplicacion de manera normal y sencilla.
                Esperamos ser de ayuda.
            </p>

            <h3 className="section-ayuda-title">
                Nevegadores Recomendados
            </h3>

            <p className="section-ayuda-p">
                Existen una gran variedad de navegadores de internet en el mundo. 
                Lo cual lleva a que la apliacion se vea de diferente manera en distintos dispositivos o navegadores
                (o en casos muy extremos a que no funcionen ciertos algoritmos de nuestra plataforma).
                Eso depende mucho del navegador que utilizas.
            </p>
            <p className="section-ayuda-p">
                Wordy al ser una aplicacion pequeña no puede cubrir todos los navegadores.
            </p>

            <p className="section-ayuda-p">
                Por eso te recomendamos que mantengas alguno de estos navegadores, y totalmente actualizado.
            </p>
            
            <Container>
                <ImgExample className='img-small' header='v:103.0'  img={NAVEGADORES_ASSETS.ChromeImg} />
                <ImgExample className='img-small' header='v:103.0'  img={NAVEGADORES_ASSETS.EdgeImg} />
                <ImgExample className='img-small'   img={NAVEGADORES_ASSETS.FirefoxImg} />
                <ImgExample className='img-small'   img={NAVEGADORES_ASSETS.SafariImg} />
            </Container>

            <div className="space-block"></div>
        </div>
    );
}

export function Ejercicios (){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Ejercicios de Wordy</h3>
            <p className="section-ayuda-p">
                Wordy es una aplicación de aprendizaje de vocabulario que te llevara a aprender
                las palabras que quieras, cuando quieras rápidamente! Los ejercicios de Wordy
                se desempeñan en las cuatro ramas del aprendizaje de un idioma, que con unas cuantas
                practicas te sentirás familiarizado. 
            </p>

            <Container>
                <ImgExample className='img-medium img-Neumorphism'   img={HowItWorksImg} />
                <ul className="section-ayuda-lista">
                    <li className="item" >Agrega decenas de palabras que quieras aprender en el lenguaje que estas aprendiendo.</li>
                    <li className="item" >Práctica ejercicios de distintas maneras ofrecidos por algoritmos.  </li>
                    <li className="item" >Con pruebas divertidas como juegos que te entrenaran en tu lenguaje.</li>
                </ul>
            </Container>

            <h3 className="section-ayuda-title">Areas de los Ejercicios</h3>

            <Container>
                <ImgExample className='img-logo'   img={EJERCICIOS_ASSETS.ESCRIBIR} />
                <p className="item-logo"> <span className="title-logo">Escritura: </span>
                    Donde tendrás que escribir el significado de la palabra, la palabra, o cuando se requiera escribir. Se puede hacer a través de un teclado normal.
                </p>
            </Container>
            <Container>
                <ImgExample className='img-logo'   img={EJERCICIOS_ASSETS.LEER} />
                <p className="item-logo"> <span className="title-logo">Lectura: </span>
                    Donde tendrás que identificar a la palabra y reforzar tu memoria, puede variar, pero se resuelve seleccionando la palabra correctamente, asegúrate de leer correctamente.
                </p>
            </Container>
            <Container>
                <ImgExample className='img-logo'   img={EJERCICIOS_ASSETS.ESCUCHAR} />
                <p className="item-logo"> <span className="title-logo">Escuchar: </span>
                    Presta atención a la palabra que suena, y escríbela o selecciónala para poder mejorar tu comprensión de como suenan las palabras que estas aprendiendo. (Parlantes necesarios).
                </p>
            </Container>
            <Container>
                <ImgExample className='img-logo'   img={EJERCICIOS_ASSETS.PRONUNCIAR} />
                <p className="item-logo"> <span className="title-logo">Pronunciación: </span>
                Pronuncia tus palabras y familiarízate a utilizarlas en el mundo real, graba tu voz y compara si es correcta la manera en la que la pronuncias. (Micrófono necesario).
                </p>
            </Container>

            <div className="space-block"></div>
        </div>
    );
}

export function Creador(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Creación</h3>

            <ImgExample className='img-medium' img={SMlogo} />

            <p className="section-ayuda-p">
                Wordy es una aplicación de tipo recreativo la cual tiene la misión de ayudar a 
                aprender y mejorar a sus usuarios en idiomas, permitiendo aprender
                 el vocabulario que se desee.
            </p>

            <p className="section-ayuda-p">
                Wordy al momento de publicación es una aplicación sin fines de lucro y siendo
                 evaluado como un pequeño proyecto de educación.
            </p>

            <p className="section-ayuda-p">
                El funcionamiento de Wordy es meramente de propósito educativo, por ende, 
                siempre está bajo el análisis investigativo del instituto politécnico Santiago Mariño.
                 Con el propósito de evaluar el desempeño, calidad y valor de este proyecto.
            </p>

            <Logo />

            <p className="section-ayuda-p">
                El proyecto está desarrollado por un estudiante de esta faculta de ingeniería,
                que busca demarcar las posibilidades de las nuevas tecnologías al ofrecer experiencias
                similares de aplicaciones del mercado con técnicas de aprendizaje de idiomas.
                Wordy es un proyecto de investigación con el cual busca obtener información por
                parte de los usuarios para llevar a cabo su propósito de cumplir con sus expectativas
                planteadas.
            </p>

            <div className="space-block"></div>
        </div>
    );
}

export function Legal(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Información legal</h3>

            <h5 className="section-ayuda-subtitle">
                Bases legales aplicadas en Wordy 
            </h5>
            <p className="section-ayuda-p">
                Al estar conectado a un proyecto educativo tiene como principio seguir normas y reglas para su funcionamiento, en su mayoría se basa en los estándares nacionales de Venezuela, específicamente en la Constitución de la República Bolivariana de Venezuela - sección Ciencia y tecnología. La cual se trata de usar el conocimiento y el desarrollo científico y tecnológico, para ponerlo al servicio de la población, logrando un mejoramiento en su calidad de vida.
            </p>

            <h5 className="section-ayuda-subtitle">
                Ley de Ciencia, Tecnología e Innovación de Venezuela (1984)
            </h5>

            <p className="section-ayuda-p">
                El presente decreto-Ley tiene por objeto, desarrollar los principios orientados que en materia de ciencia, tecnología e innovación establece la constitución Bolivariana de Venezuela, organizar el sistema nacional de ciencia, tecnología e innovación, definir los lineamientos que orientan las políticas estratégicas para la actividad científica, tecnológica y de innovación, con la implementación de mecanismos institucionales y operativos para la promoción, estudio y fomento de la investigación científica, la apropiación social del conocimiento y la transferencia e innovación tecnológica a fin de fomentar la capacidad para la generación, uso y circulación del conocimiento y de impulsar el desarrollo nacional.
            </p>

            <div className="space-block"></div>

        </div>
    );
}

export function Terminos(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">Términos y condiciones</h3>

            <h5 className="section-ayuda-subtitle">Wordy es una aplicación pequeña para estudiantes de idiomas</h5>

            <p className="section-ayuda-p">
                Estudiar idiomas es de gran ayuda para las personas que quieres mejorar su estilo de
                vida o por recreación, Creemos que todo el mundo debe tener acceso a la educación
                gratuita de idiomas. Nuestras normas tienen como objetivo establecer un acuerdo
                mutuo sobre lo que significa ser parte de esta comunidad. Te pedimos que las
                leas con atención.

            </p>

            <h5 className="section-ayuda-subtitle">
                El respeto, ante todo
            </h5>
            <p className="section-ayuda-p">
                Todos venimos de diferentes partes del mundo y tenemos diferentes niveles de
                conocimiento del idioma, pero compartimos la misma meta: aprender.
                Por eso celebramos la curiosidad, las preguntas y el entendimiento cultural. 
            </p>

            <h5 className="section-ayuda-subtitle">
                Piensa antes de compartir
            </h5>

            <p className="section-ayuda-p">
                Tu seguridad nos preocupa. Hablar otro idioma es inherentemente social,
                pero ten cuidado de compartir o publicar información privada que pueda usarse
                indebidamente. Esto incluye, por ejemplo, tu número de teléfono,
                tu edad, tu dirección, la hora que llegas a tu casa, el nombre de tu
                escuela, tu correo electrónico y cualquier otra información personal
                que puede poner tu privacidad en riesgo. Es decir, no compartas de más.
                Compartir y motivar a otros a compartir información personal puede llevar
                a que tu publicación, y posiblemente tu cuenta, sean eliminados.
            </p>


            <h3 className="section-ayuda-title">Por favor no uses Wordy para...</h3>


            <h5 className="section-ayuda-subtitle">
                Atacar a una persona o grupo de personas con palabras y acciones
            </h5>
            <p className="section-ayuda-p">
                Wordy es un lugar seguro para todo tipo de estudiantes. El acoso y el contenido hiriente no será tolerado. Usar símbolos, nombres y textos que promuevan el odio, el acoso o el acecho, así como el uso de comentarios sexuales hacia otros y la usurpación de identidad de otros usuarios, serán considerados abusivos. Lo mismo aplica para el nudismo y las fotos de perfil o nombres de usuario perturbadores. Wordy se reserva el derecho de reemplazar o remover imágenes o cuentas a su discreción.
            </p>

            <h5 className="section-ayuda-subtitle">
                Usar secuencias de comandos y hacer trampa
            </h5>
            <p className="section-ayuda-p">
                En Wordy creemos en un aprendizaje honesto. Si estás escribiendo fragmentos de código con el propósito de hacer trampa o compartir información e instrucciones acerca de cómo usar Wordy de una forma que pueda impactar negativamente en el sistema, la comunidad, el aprendizaje, los datos o la experiencia de uso, tu cuenta y tus publicaciones pueden ser eliminadas de la plataforma.
            </p>

            <h5 className="section-ayuda-subtitle">
                Escribir comentarios provocativos
            </h5>
            <p className="section-ayuda-p">
                Las obscenidades y los comentarios fuera de lugar que incitan al odio no contribuyen al aprendizaje. Las groserías tampoco ayudan a nadie (deja que los usuarios aprendan esas por sí mismos). Mantén este tipo de mensajes fuera de los debates en el foro.
            </p>

            <h5 className="section-ayuda-subtitle">
                En resumen
            </h5>
            <p className="section-ayuda-p">
                No será tolerado contenido que sea:
            </p>
            
            <ul className="section-ayuda-lista">
                <li className="item" >Ilegal</li>
                <li className="item" >Pornográfico</li>
                <li className="item" >Excesivamente profano o violento</li>
                <li className="item" >Mensajes no deseados</li>
                <li className="item" >Amenazante, acosador o intimidante</li>
                <li className="item" >Asociado al racismo o la intolerancia</li>
                <li className="item" >Personificación de otra persona de una manera engañosa o falsa</li>
                <li className="item" >Información personal confidencial</li>
            </ul>
            <p className="section-ayuda-p">
                Por favor no pierdas tu tiempo buscando formas de engañarnos. Vamos a remover cualquier contenido que viole el espíritu de estas reglas y correrás el riesgo de perder acceso parcial o completo a Wordy sin advertencia. 
            </p>

            <div className="space-block"></div>

        </div>
    );
}

export function Politica(){
    return(
        <div className='section-ayuda'>
            <h3 className="section-ayuda-title">
                Política y protección de datos
            </h3>
            <p className="section-ayuda-p">
                Wordy es una aplicación de servicio de aprendizaje de vocabulario. Se ofrecen una selección de ejercicios para el aprendizaje de un idioma a través de contenido y diccionarios de palabras. Este contenido esta disponible en aplicaciones para varios sistemas operativos disponibles para descargar en dispositivos como teléfonos inteligentes, portátiles y/o tabletas, y todo esto a través de un navegador web moderno.
            </p>

            <p className="section-ayuda-p">
                Al ingresar con tu información personal y utilizar la aplicación, te haces consiente de que esta aplicación es un proyecto pequeño y puede tener dificultades para poder manejar una gran cantidad de estándares de protección.
            </p>

            <p className="section-ayuda-p">
                El propósito de esta aplicación es registrar el correcto funcionamiento de sus pequeñas partes para sus usuarios. Ayudaría mucho el que compartas tu experiencia vivida al usar esta aplicación.
            </p>

            <h5 className="section-ayuda-subtitle">
                Cookies
            </h5>
            <p className="section-ayuda-p">
                Al tratarse de una aplicación web, Wordy recolecta o genera información para funcionar y mejorar la experiencia del usuario, siendo necesario el uso de algunos aspectos privados del dispositivo en el cual se esta utilizando. Los cuales son:
            </p>
            <ul className="section-ayuda-lista">
                <li className="item" >El almacenamiento de información en el dispositivo para mantener información.</li>
                <li className="item" >Periféricos del dispositivo para hacer uso de todas sus funcionabilidades, como son el grabar audios y poder reproducirlos.</li>
                <li className="item" >Información del tipo de dispositivo, navegador y sistema operativo para desplegar las funcionabilidades en base al mismo.</li>
            </ul>

            <h5 className="section-ayuda-subtitle">
                Seguridad
            </h5>
            <p className="section-ayuda-p">
                Tomamos razonable administración y pasos técnicos para proteger la información personal ante cualquier perdida, extravió y acceso no autorizado, alteración, o destrucción. Sin embargo, ningún método de transmisión a través del internet es 100% seguro. Por lo tanto, mientras nos enfocamos en proteger tu información, no podemos garantizar su absoluta seguridad. 
            </p>

            <h5 className="section-ayuda-subtitle">
                Contáctanos
            </h5>
            <p className="section-ayuda-p">
                Si tienes alguna pregunta sobre la política de protección de datos o sobre nuestras prácticas, por favor contáctanos a appwordy@gmail.com.
            </p>

            <div className="space-block"></div>

        </div>
    );
}