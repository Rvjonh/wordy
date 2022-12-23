import getRandomArray from "./getRandomArray";

export default function getRandomWords(numero=2){
    let aux = [
        {
          "name": "World",
          "meaning": "Mundo",
        },{
          "name": "Astronauta",
          "meaning": "Astronauta",
        },{
          "name": "Novela",
          "meaning": "Tres",
        },{
          "name": "小说",
          "meaning": "Novela",
        },{
          "name": "Goverment",
          "meaning": "सरकार",
        },{
          "name": "Téléphone",
          "meaning": "Telefono",
        },{
          "name": "Actor",
          "meaning": "Actor",
        },{
          "name": "Molecule",
          "meaning": "Molecule",
        },{
          "name": "Book",
          "meaning": "livre",
        },{
          "name": "application",
          "meaning": "aplicacion",
        }
    ]
    getRandomArray(aux)

    return aux.slice(0, numero);
}