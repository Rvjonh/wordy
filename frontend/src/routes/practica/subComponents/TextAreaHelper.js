import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PracticeConfigurationActions from './../../../Store/Practice-slice';

import { motion, useAnimation } from "framer-motion"

import getRandomArray from './../../../Functions/getRandomArray';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function TextAreaHelper({word="", onPress=f=>f}){
    const SHOW_HELPER = useSelector(state=>state.practiceConfi.helper)
    const dispatch = useDispatch();

    const BoxShasked = useAnimation()

    const [parts, setParts] = useState([])

    useEffect(()=>{
        let words = word.split(" ");
        getRandomArray(words)
        setParts(words)
    },[word])

    const handleActiveHelper =()=>{
        dispatch(PracticeConfigurationActions.setHelper(!SHOW_HELPER))
    }

    const handleReturnWord = (item)=>{
        if(!onPress){
            BoxShasked.start({ 
                x : [0,-7,7,-7,7,0,0],
                y : [0,1,0,-1,0],
                opacity : [1,0.7,0.5]
            })
            return;
        }
        onPress(item)
    }
    
    return(
        <div className='text-area-helper'>
 
            <FormControlLabel
                    sx={{
                    display: 'block',
                    }}
                    control={
                    <Switch
                        checked={SHOW_HELPER}
                        onChange={handleActiveHelper}
                        name="Ayuda"
                        color="primary"
                    />
                    }
                    label="Ayuda"
                />

            {SHOW_HELPER &&
                <motion.div animate={BoxShasked} className="text-area-helper-items">
                    {
                        parts.map((item, index)=>{
                            return <button onClick={()=>handleReturnWord(item)}
                            className="item-helper"
                            key={index+item}
                            >
                                            {item}
                                    </button>
                        })
                    }
                </motion.div>
            }
        </div>
    )
}