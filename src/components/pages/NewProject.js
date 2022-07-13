import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'

function NewProject(){

    const navigate = useNavigate()

    async function createPost(project){
        project.cost=0;
        project.services =[];
        let dados = await fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        await dados.json();
        navigate('/projects',{state:{mensagem:'Projeto criado com sucesso'}})
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projetos</h1>
            <p>Crie seus projetos para depois adicionar os serviços</p>
            <ProjectForm handleSubmit ={createPost} btnText ='Criar Projeto' />
        </div>
    );
}

export default NewProject