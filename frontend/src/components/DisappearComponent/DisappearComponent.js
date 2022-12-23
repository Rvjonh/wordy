import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useInterval } from './../../Hooks/useInterval';

const PageAnimation = {
    in:{opacity:0},
    ani:{opacity:1},
    out:{opacity:0},
}

export default function DesappearComponent({time,  children}){
    const [show, setShow] = useState(true)

    useInterval(()=>{
        setShow(false)
    }, time)

    return(
        <AnimatePresence>
            {show && (
                <motion.div initial="in" animate="ani" exit="out" variants={PageAnimation}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}