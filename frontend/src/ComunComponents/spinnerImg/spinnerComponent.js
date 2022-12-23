
import './spinnerStyle.scss';

export default function Spinner({text=""}){
    return(
        <>
            {text && <h4 style={{margin:"1em 0"}}>{text}</h4>}
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </>
    )
}