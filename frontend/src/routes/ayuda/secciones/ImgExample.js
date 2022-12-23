


export default function ImgExample({img=null, className="", header=""}){
    return(
        <div className={"img-example "+className}>
            <picture className="img-block">
                <img className="img-route" width="80px" height="50" src={img} alt="logo de la aplicación wordy" draggable="false" />
            </picture>
            {header!== "" &&
                <h4 className="img-header">{header}</h4>
            }
        </div>
    )
}