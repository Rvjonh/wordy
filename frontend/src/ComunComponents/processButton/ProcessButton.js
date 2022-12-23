
export default function ProcessButton(props){
    return(
        <button className={props.className+` ${props.state? 'clicked': ""}`}
                disabled={props.state? "disabled": ""}>
            {props.message}
        </button>
    );
}