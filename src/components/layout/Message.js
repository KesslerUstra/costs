import styles from './Message.module.css'
import { useState, useEffect } from "react";

function Message({type, msg}){

    const [classe, setClasse] = useState();

    useEffect(()=>{

        const timer = setTimeout(() => {
            setClasse('');
        }, 3000);

        if(!msg){
            return;
        }
        setClasse('ativada');

        return () => clearTimeout(timer)
    }, [msg])

    return(
        <>
            <div className={`${styles.message} ${styles[type]} ${styles[classe]}`}>{msg}</div>
        </>
    );
}

export default Message