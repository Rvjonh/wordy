import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SessionActions from './../../Store/Session-Slice';
import GlobalNotificationsActions from './../../Store/GlobalNotification-Slice'

import { useNavigate } from 'react-router-dom';

import { useNotLogged } from './../../Hooks/useNotLogged';
import { isEmailValid } from './../../Hooks/Functions/isEmailValid';
import { useNotification } from './../../Hooks/useNotification';
import { useInternetDetector } from './../../Hooks/useInternetDetector'

import './VerificarCorreStyle.scss'

import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Spinner from './../../ComunComponents/spinnerImg/spinnerComponent';

import topImage from './assets/wordy-top-icon2.png';

import WordyDataService from './../../Services/API-gateaway';

import ComfirmFieldModal from './../../components/ComfirmFieldModal/ComfirmFieldModal';

export default function ImgMediaCard() {
    useNotLogged("/iniciar-sesion");
    const [isOnline] = useInternetDetector();


    const STATE = useSelector(state => state.session);
    const dispach = useDispatch();
    const navigate = useNavigate()
    const [notificar] = useNotification()

    const [data, setData] = useState({ code: "", status: 0 })
    const [popup, setPopup] = useState(false);
    const [Tempemail, setTempemail] = useState(STATE.email)
    const [newCodeStatus, setNewCodeStatus] = useState(0);


    useEffect(() => {
        if (STATE.emailverification === "true") {
            navigate('/perfil');
        }
    }, [STATE.emailverification, navigate])

    const handleCodeInput = (e) => {
        setData({ ...data, code: e.target.value, status: 0 })
    }

    const handleVerificarEmail = () => {
        if (data.code.length > 0) {
            setData({ ...data, status: 100 })

            WordyDataService.verifyEmail(data, STATE.token).then(res => {
                dispach(SessionActions.Login({ ...STATE, emailverification: "true" }))
                dispach(GlobalNotificationsActions.desactivateEmailVerification())
                setData({ ...data, code: "", status: 200 })

            }).catch(err => {
                if (err.response.status === 0) {
                    setData({ ...data, status: 500 })
                } else {
                    setData({ ...data, status: 400 })
                }
            })

        } else {
            setData({ ...data, status: 300 })
        }

    }

    const getColorStatus = (status = 0) => {
        switch (status) {
            case 0:
                return "info";
            case 100:
                return "info";
            case 200:
                return "success";
            default:
                return "primary";
        }
    }

    const getWhenError = (status = 0) => {
        return [300, 400, 500].includes(status);
    }

    const getHelperMessage = (status = 0) => {
        switch (status) {
            case 0:
                return "";
            case 100:
                return "Se esta comprobando tu codigo";
            case 200:
                return `Tu Correo Fue Verificado`;
            case 300:
                return "Ingresa un codigo";
            case 400:
                return "Codigo Incorrecto";
            case 500:
                return "Sin conexion a internet";
            default:
                return "";
        }
    }

    const handleSendCode = () => {
        setPopup(true);
    }

    const handleSendNewCode = () => {
        if (!isOnline) {
            notificar({
                title: "Sin conexion de internet",
                message: "No se puede realizar la siguiente accion porque no hay conexion a internet",
                severity: "warning"
            })
            return;
        }

        if (!isEmailValid(Tempemail)) {
            notificar({
                message: "Ingresa un correo electronico valido para poder enviar un codigo de verificacion",
                title: "Correo electronico no valido",
                severity: "error",
                preventDuplicate: false
            })
            return
        }

        setPopup(false);
        setNewCodeStatus(100)

        const data = {
            email: Tempemail,
        }
        WordyDataService.getNewVerifyEmailCode(data, STATE.token).then(res => {
            dispach(SessionActions.Login({ ...STATE, email: res.data.email }))

            notificar({
                title: "Codigo enviado",
                message: "El codigo de verificacion ya ha sido enviado al correo asignado",
                severity: "success",
            })

            setNewCodeStatus(200)

        }).catch(err => {
            setNewCodeStatus(400)

            notificar({
                title: "Error al enviar el codigo de verificacion",
                message: `No se ha podido enviar el nuevo codigo de verificacion, ${err.response.data.Error}`,
                severity: "error"
            })

        })
    }

    return (
        <Container>

            <Card elevation={10} sx={{ maxWidth: 500, margin: "auto", my: 2 }} >

                <div className='image-card-container'>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        width="200"
                        image={topImage}
                        className="image-card"
                        draggable="false"
                    />
                </div>

                <CardContent >
                    <Typography gutterBottom variant="h5" component="h5" sx={{ fontWeight: 700 }}>
                        Verifica tu correo electronico
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Hola {STATE.name}. <br />
                        Verifica tu cuenta para tener acceso a más funcionalidades en Wordy.
                    </Typography>
                    <Typography variant="body2" color="text.info">
                        Te hemos enviado un codigo a tu correo electronico
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ingresalo y verifiquemos que eres tu:
                    </Typography>

                    <TextField id="outlined-basic"
                        label="Codigo"
                        variant="outlined"
                        color={getColorStatus(data.status)}
                        defaultValue={data.code}
                        onChange={handleCodeInput}
                        margin="dense"
                        fullWidth
                        error={getWhenError(data.status)}
                        helperText={getHelperMessage(data.status)}
                    />
                </CardContent>
                <CardActions sx={
                    {
                        display: "flex",
                        justifyContent: "space-around",
                        marginBottom: "1em"
                    }} >

                    <Button variant="contained" color="primary" size="medium" onClick={handleVerificarEmail}>
                        Verificar
                        {data.status === 200 && <span> &#9989;</span>}
                    </Button>
                    <Button variant="contained" color="warning" size="medium" onClick={handleSendCode}>
                        Reenviar
                        {newCodeStatus === 100 && <Spinner />}
                        {newCodeStatus === 400 && <span>&#10060;</span>}
                    </Button>

                </CardActions>

                <ComfirmFieldModal title="¿Quieres enviar un nuevo codigo a tu correo?"
                    message="Enviaremos un nuevo codigo a este correo, puedes cambiarlo si quieres"
                    activated={popup}
                    onActivated={setPopup}
                    typefield="email"
                    typefieldtitle="Tu correo electronico"
                    valueField={Tempemail}
                    setValueField={setTempemail}
                    onAcepted={handleSendNewCode}
                />
            </Card>

        </Container>
    );
}