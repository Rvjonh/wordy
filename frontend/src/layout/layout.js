import { useState, useEffect } from 'react';

import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import './layout.scss';

import Header from './components/header/header';
import HeaderPractice from './components/headerPractice/headerPractice';
import Footer from "./components/footer/footer";

import NotificacionesGlobales from './components/notificaciones/notificaciones';

//this the header, control which header type to show ...
// if the user is in the presentation
// if the user is in the practice (aprender) mode

let urlsToPractice =[
        '/aprender',
        '/diccionarios',
        '/perfil',
        '/configuracion',
        '/notificacion',
        '/verificar-correo',
        '/agregar-diccionario',
        '/editar/:id'
]

const ulrsToInitial = [
  '/',
  '/ayuda',
  '/recuperar-contrasena/user/:token'
]

export default function Layout(){

  const [isPractice, setPractice] = useState(false);
  const location = useLocation();

  useEffect(() => {

    if( urlsToPractice.includes( location.pathname ) ){
      setPractice(true);

    }else if( ulrsToInitial.includes( location.pathname ) ){
      setPractice(false);
    }

  }, [location]);

  return (
    <div className="layout-class">
      
      {isPractice? <HeaderPractice/> : <Header />}

      <NotificacionesGlobales />

      <Outlet />

      <Footer />

    </div>
  )
};