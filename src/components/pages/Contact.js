import styles from './Contact.module.css'

function Contact(){
    return (
        <div className={styles.links}>
            <a target='_blank' rel="noreferrer" href="https://www.youtube.com/c/MatheusBattisti/playlists" >Curso React deste Projeto</a>
            <a target='_blank' rel="noreferrer"  href="https://www.eduardokessler.com/">Quem sou eu ?</a>
        </div>
    );
}

export default Contact