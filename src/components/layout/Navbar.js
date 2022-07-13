import {Link} from 'react-router-dom'
import logo from '../../img/costs_logo.png'
import Container from './Container';
import styles from './Navbar.module.css'

function Navbar(){
    return(
        <nav className={styles.nav}>
            <Container>
                <Link to='/'><img src={logo} alt="Logo Costs" /></Link>

                <ul className={styles.list}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/projects">Projetos</Link></li>
                    <li><Link to="/contact">Contato</Link></li>
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar