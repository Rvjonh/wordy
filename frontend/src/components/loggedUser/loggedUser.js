import { useSelector } from "react-redux"

import './loggedUser.scss';

export default function LoggedUser(){
    const STATE = useSelector(state => state.session);

    return(
        <span className="logged-icon">
            {STATE.name}
        </span>
    )
}