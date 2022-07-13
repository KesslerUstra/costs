import { useEffect, useState } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    async function resgatarCategorias(){
        let dados = await fetch("http://localhost:5000/categories",{
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });
        let data = await dados.json();
        setCategories(data);
    }

    useEffect(()=>{
        resgatarCategorias();
    }, [])

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleSelect(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }});
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type='text' handleOnChange={handleChange} text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' value={project.name ? project.name : ''} />
            <Input type='number' handleOnChange={handleChange} text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' value={project.budget ? project.budget : ''} />
            <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm