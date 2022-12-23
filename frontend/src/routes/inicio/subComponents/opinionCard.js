import React from "react";

export default class OpinionCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            img :props.data.img,
            author : props.data.author,
            text : props.data.text
        }

    }

    render(){
        return (
        <article className="opinion-block">
            <picture className='opinion-block-img'>
                <img className='opinion-img' src={this.state.img} draggable="false" alt="Imagen del author de una opinion sobre la aplicación" />
            </picture>
            <h3 className='opinion-autor'>
                - {this.state.author}
            </h3>
            <p className='opinion-text'>
                {this.state.text}
            </p>
        </article>
        )
    }
}