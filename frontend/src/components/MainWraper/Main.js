import { motion } from 'framer-motion'


export default function MainWraper({children, className=""}){
    const PageAnimation = {initial:{opacity:1}, out:{opacity:0}}

    return(
        <motion.main className={`main-aprender ${className}`} initial="out" animate="initial" exit="end" variants={PageAnimation}>
            {children}
        </motion.main>
    )
}