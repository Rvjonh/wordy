import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNotification } from './../../../Hooks/useNotification';

import './../stylies/stylies.scss';

import MainWraper from './../../../components/MainWraper/Main';

import Fab from '@mui/material/Fab';



export default function SelectWords({allWords=[], onAccept=f=>f}){
    const configuracion = useSelector(state=>state.practiceConfi)
    const [ notificar ] = useNotification();

    const [words, setWords] = useState(
        allWords
        .sort((a,b)=>a.level - b.level)
        .map((item, index)=>{
            if(index < configuracion.numeroWords){
                return { ...item, selected:true}
            }
            return { ...item, selected:false}
        })
    );
    const [wordsCopy, setWordsCopy] = useState(words);
    const [page, setPage] = useState({start : 0, end: wordsCopy.length>=10? 9 : wordsCopy.length-1});

    const [sorting, setSorting] = useState({type:"level-up"})

    const getSortSymbol=(local)=>{
        const type = sorting.type.split("-")
        if(type[0] !== local){
            return null;
        }else if(type[1] === "up"){
            return <span>&#11014;</span>;
        }else if(type[1] === "down"){
            return <span>&#11015;</span>;
        }
    }

    const handleSelection = (row)=>{
        
        let newWords = words.map((item)=>{
            if(item.id === row.id){
                return {...item, selected: !item.selected}
            }
            return item;
        })

        let numWordsSelected = newWords.filter((item)=>item.selected===true).length;
        
        if(numWordsSelected <= configuracion.numeroWords){
            setWords(newWords)
            setWordsCopy(newWords)
        }else{
            notificar({
                title : "Numero mayor al permitido",
                message : `No puedes seleccionar mas que ${configuracion.numeroWords} palabras`,
                severity : "info",
                preventDuplicate: true
            })
        }

    }
    
    const handleSorting = (type="none")=>{

        let sortedWords = []

        if(type+"-down" === sorting.type){

            if(type === "level"){
                sortedWords = words.sort((a , b)=> a[type] - b[type])
            }else{
                sortedWords = words.sort((x, y)=>{
                    if (x[type].toLowerCase() < y[type].toLowerCase()) {return -1;}
                    if (x[type].toLowerCase() > y[type].toLowerCase()) {return 1;}
                    return 0;
                })
            }

            setSorting({type: `${type}-up`})
        }else{

            if(type === "level"){
                sortedWords = words.sort((a , b)=> b[type] - a[type])
            }else{
                sortedWords = words.sort((x, y)=>{
                    if (x[type] > y[type]) {return -1;}
                    if (x[type] < y[type]) {return 1;}
                    return 0;
                })
            }

            setSorting({type: `${type}-down`})
        }

        setWordsCopy(sortedWords)

    }

    const setLastPage = ()=>{
        if(page.start === 0){
            return;
        }

        let newStart = page.start - 10; 
        let newEnd = 0;

        if( (page.end+1)%10 === 0 ){
            newEnd = page.end - 10;
        }else{
            newEnd = page.start - 1;
        }
    
        setPage({start: newStart, end : newEnd})
    }

    const setNextPage = ()=>{
        if(page.end === wordsCopy.length-1){
            return;
        }

        let newStart = page.end + 1; 
        let newEnd = page.end + 10;

        if(newEnd >= wordsCopy.length){
            setPage({start: newStart, end : wordsCopy.length-1})
        }else{
            setPage({start: newStart, end : newEnd})
        }
    }

    useEffect(()=>{
        document.addEventListener("keypress",pressEnterButton);
        return()=>{
            document.removeEventListener("keypress",pressEnterButton);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const pressEnterButton =(e)=>{
        if(e.keyCode === 13){
            handleSelectedWords()
        }
    }

    const handleSelectedWords = ()=>{

        const isThereAnySelected = words.some((item)=>item.selected===true)

        if(!isThereAnySelected){
            notificar({
                title : "No hay palabras seleccionadas",
                message : `Debes seleccionar al menos 1 palabra para practicar`,
                severity : "error",
                preventDuplicate: true
            })

            return;
        }

        onAccept(words.filter((item)=>{
            return item.selected
        }).map((item)=>{
            delete item.selected;
            return item;
        }))
    }


    return(
        <MainWraper>
            <header className='header'>
                <h2 className="title-selection">Selecciona {configuracion.numeroWords} Palabras</h2>
            </header>
            
            <section className='words-panel'>
                <table className='words-table'>

                    <thead>
                        <tr>
                            <th className='txt-centered column-small'>&#9989;</th>
                            <th onClick={()=>handleSorting("name")}>Palabra {getSortSymbol("name")}</th>
                            <th onClick={()=>handleSorting("meaning")}>Significado {getSortSymbol("meaning")}</th>
                            <th onClick={()=>handleSorting("level")} className='txt-centered column-small'>Nivel {getSortSymbol("level")}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {  wordsCopy.filter((item, index)=>{
                            return index >= page.start && index <= page.end;
                        }).map((item)=>{
                            return <tr key={`word-${item.id}`} 
                                        onClick={()=>handleSelection(item)}
                                        className="row">

                                <td className='txt-centered column-small'>
                                    <input type="checkbox"
                                            className='checkebox size-medium'
                                            checked={item.selected} 
                                            onChange={()=>handleSelection(item)}
                                             />
                                </td>

                                <td>{item.name}</td>
                                <td>{item.meaning}</td>
                                <td className='txt-centered column-small'>{item.level}</td>

                            </tr>
                            })
                        }
                    </tbody>

                </table>

            </section>

            <section className="pagination">
                <div className='indexing'>
                    <button onClick={setLastPage} className='indexing-item btn-index' >&#9194;</button>
                    <span className='indexing-item'>{page.start+1}-{page.end+1} de {wordsCopy.length}</span>
                    <button onClick={setNextPage} className='indexing-item btn-index' >&#9193;</button>
                </div>
            </section>

            <div className="float-container">
                <Fab onClick={handleSelectedWords} variant="extended" color="success" aria-label="add" className="button-save-confi">
                    Siguiente
                </Fab>
            </div>
        </MainWraper>
    )
}