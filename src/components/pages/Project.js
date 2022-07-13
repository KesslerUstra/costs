import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {v4 as uuidv4} from 'uuid'

function Project(){

    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);

    const [messageProject, setMessageProject] = useState();
    const [typeProject, setTypeProject] = useState();

    const [messageService, setMessageService] = useState();
    const [typeService, setTypeService] = useState();

    useEffect(()=>{
        async function pegarProjeto(){
            const dados = await fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await dados.json();
            setProject(data);
            setServices(data.services);
        }
        pegarProjeto();
    }, [id]);

    async function editPost(project){
        setMessageProject('');
        if(project.budget < project.cost){
            const msg = 'O orçamento esta abaixo do custo do projeto!';
            if(messageProject === msg){
                setMessageProject(msg + ' ');
            }else{
                setMessageProject(msg);
                setTypeProject('error');
            }
            return false;
        }
        try {
            const data = await fetch(`http://localhost:5000/projects/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            const dados = await data.json();
            setProject(dados);
            setShowProjectForm(false);
            setMessageProject('Projeto atualizado');
            setTypeProject('success');
        } catch (error) {
            console.log(error);
        }
    }

    async function createService(project){
        setMessageService('');
        const lastService = project.services[project.services.length -1];
        lastService.id = uuidv4();
        const newCost = (parseFloat(project.cost) + parseFloat(lastService.cost));

        if(newCost > parseFloat(project.budget)){
            const msg = 'Orçamento ultrapassado, verifique o custo do serviço';
            if(messageService === msg){
                setMessageService(msg + ' ');
            }else{
                setMessageService(msg);
            }
            setTypeService('error');
            project.services.pop();
            return false;
        }
        project.cost = newCost;
        try {
            const data = await fetch(`http://localhost:5000/projects/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            const dados = await data.json();
            setProject(dados);
            setServices(dados.services);
            setShowServiceForm(false);  
            setMessageService('Serviço criado');
            setTypeService('success');
        } catch (error) {
            console.log(error);
        }
    }

    async function removeService(id, cost){
        const servicesUpdate = project.services.filter((service) => service.id !== id);
        const projectUpdate = project;
        projectUpdate.services = servicesUpdate;
        projectUpdate.cost = (parseFloat(projectUpdate.cost) - parseFloat(cost));
        try {
            const data = await fetch(`http://localhost:5000/projects/${projectUpdate.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectUpdate)
            });
            await data.json();
            setProject(projectUpdate);
            setServices(servicesUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass = 'column'>
                        <div className={styles.details_container}>
                            <div className={styles.header_info}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ?'Editar Projeto':'Fechar'}
                                </button>
                            </div>
                            <Message type={typeProject} msg={messageProject} />
                            {!showProjectForm ? (
                                <div className={styles.project_infos}>
                                    <p>
                                        {project.category?(
                                            <><span>Categoria:</span> {project.category.name}</>
                                        ):(
                                            <><span>Categoria:</span> Indefinido</>
                                        )}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ):(
                                <div className={`${styles.form_project}`}>
                                    <ProjectForm  handleSubmit={editPost} btnText='Concluir edição' projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <div className={styles.header_info}>
                                <h2>Adicone um serviço</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ?'Adicionar Serviço':'Fechar'}
                                </button>
                            </div>
                            <Message type={typeService} msg={messageService} />
                            {showServiceForm &&(
                                <div className={`${styles.form_project}`}>
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <h2 className={styles.servico_titulo}>Serviços</h2>
                        <Container customClass={'start'}>
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <ServiceCard key={service.id} id={service.id} name={service.name} cost={service.cost} description={service.description} hangleRemove={removeService} />
                                ))
                            ):(
                                <p className={styles.msg_project_none}>Não há serviços cadastrados</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ):(
                <Loading />
            )}
        </>
    );
}

export default Project