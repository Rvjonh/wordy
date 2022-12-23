import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useIfUserLogged(redirectTo='/aprender'){

    const STATE = useSelector(state => state.session)
    const navegate = useNavigate();
    const [logged, setLogged] = useState(false);

    useEffect(()=>{
        if(STATE.email!=="" || STATE.token!==""){
            setLogged(true)
        }
    },[STATE])

    useEffect(()=>{
        if(logged){
            navegate(redirectTo);
        }
    },[logged, navegate, redirectTo])

    return
}