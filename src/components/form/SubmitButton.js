import styles from './SubmitButton.module.css'

function SubmitButton({text}){
    return(
        <div className={styles.form_control}>
            <button>{text}</button>
        </div>
    );
}

export default SubmitButton