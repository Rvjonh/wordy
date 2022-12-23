import { useRef, useState } from 'react';
import leftArrow from  './../assets/left-arrow.png';
import rightArrow from './../assets/right-arrow.png';

import { annonimousUser } from './../../../Assets/Controlador';

import OpinionCard from './../subComponents/opinionCard.js';

let opinionesArrays = [
    {
        img : annonimousUser,
        author: "Usuario de la app 1",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 2",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 3",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 4",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 5",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 6",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    },
    {
        img : annonimousUser,
        author: "Usuario de la app 7",
        text : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quia amet nemo modi omnis repellat facilis enim magni soluta quae hic tenetur, animi eius ut esse deserunt eligendi rerum officia non harum sunt quisquam. Obcaecati nesciunt consequatur quas repellat ea! Ipsum unde aperiam iste quaerat sint expedita. Labore, architecto quisquam!"
    }

]

const OpinionesSlider = () => {
    const [indexArray, setIndex] = useState({items:[0,1,2]});
    const sliderBlock = useRef(null);

    let opiniones = opinionesArrays.map((item, index)=>{
        let p = {
            img : item.img,
            author : item.author,
            text : item.text
        }
        return <OpinionCard data={p} key={index}/>
    })

    const handlePassItemRight = ()=>{

        let indices = indexArray.items.map((i)=>{
            if(i < opinionesArrays.length-1){
                return i+1;
            }else{
                return 0;
            }
        })
        setIndex({items: indices});
    }
    const handlePassItemLeft = ()=>{
        
        let indices = indexArray.items.map((i)=>{
            if(0 < i){
                return i-1;
            }else{
                return opinionesArrays.length-1;
            }
        })

        setIndex({items: indices});
    }

    return(
        <div className='block-opiniones' id="pollo" ref={sliderBlock} >
            <div onClick={handlePassItemLeft} className='block-button left' >
                <img src={leftArrow} draggable="false" alt="pasar a opinion anterior" />
            </div>
            <div onClick={handlePassItemRight} className='block-button right' >
                <img src={rightArrow} draggable="false" alt="pasar a siguiente opinion" />
            </div>

           {
               indexArray.items.map((i)=>{
                    return opiniones[i];
               })
           }
            
        </div>
    );
}

export default OpinionesSlider;