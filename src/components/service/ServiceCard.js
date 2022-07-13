import styles from '../project/ProjectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({id, name, cost, description, hangleRemove}){

    function remove(e){
        e.preventDefault();
        hangleRemove(id, cost);
    }

    return(
        <div className={`${styles.project_card} ${styles.maximo}`}>
            <div className={styles.info}>
                <h4>{name}</h4>
                <p className={styles.custos}>
                    <span>Custo:</span> R${cost}
                </p>
                <p className={styles.text}>
                    <span>Descrição:</span> {description}
                </p>
            </div>
            <div className={styles.project_card_actions}>
                <button className={styles.total} onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard