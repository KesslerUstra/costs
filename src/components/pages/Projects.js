import {useLocation} from 'react-router-dom';
import { useState, useEffect } from "react";

import styles from './Projects.module.css';

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from '../layout/Loading';

function Projects(){

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [message, setMessage] = useState();
    const location = useLocation();

    async function pegarProjetos(){
        const dados = await fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await dados.json();
        setRemoveLoading(true);
        setProjects(data);
    }   

    useEffect(() =>{
        pegarProjetos();
        if(location.state){
        window.history.replaceState({}, document.title);
        setMessage(location.state.mensagem);
    }
    },[location]);

    async function removeProject(id){
        const dados = fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            (await dados).json();
            setProjects(projects.filter((project)=> project.id !== id));
            let msg = 'Projeto removido com sucesso';
            if(message === msg){
                setMessage(msg+' ');
            }else{
                setMessage(msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.projects_container}>
            <div className={styles.titulo_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to= '/newproject' text='Criar Projeto' />
            </div>
            <Message type='success' msg={message} />
            <Container customClass = 'start'>
                {projects.length > 0 &&
                    projects.map((project) =>(
                        <ProjectCard
                        id={project.id}
                        name={project.name}
                        cost={project.cost}
                        budget={project.budget}
                        category={project?.category}
                        key={project.id}
                        handleRemove ={removeProject}
                        />
                    ))
                }
                {!removeLoading &&
                    <Loading />
                }
                {removeLoading && projects.length === 0 &&(
                    <p className={styles.msg_project_none}>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    );
}

export default Projects