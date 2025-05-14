import react from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';


function WorkView() {
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [workExperiences, setWork] = useState([]);
    useEffect(()=>{
        if (resumeId){

            axiosInstance.get(`/api/resumes/${resumeId}/work`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    setWork(res.data)
                }
            })
            .catch((err)=>console.error("Error fetching education data:", err)) 

            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work`)
            .then((res)=>{
                if (res.ok){
                    return res.json();
                    
                }
            })
            .then((data)=>{
                if(data){
                    
                    setWork(data);
                    
                }
            })
            .catch((err)=> console.error("Error fetching education data:", err));*/
        }
    }, [resumeId]);
    console.log(workExperiences);
    const navigate = useNavigate();
    return (
        <div>
        {workExperiences.map((experience) => (
            <div key={experience.id}>
                <h3>{experience.position}, {experience.employer}</h3>
                <p>{experience.location} | {experience.start_month} {experience.start_year} - 
                {experience.still_working ? "Current" : `${experience.end_month} ${experience.end_year}`}</p>
                <ul>
                    {experience.description.description.split("\n").map((exp, index) => (
                        <li key={index}>{exp}</li>
                    ))}
                    <button onClick={() => navigate("/edit-description", {state: {id: resumeId, work: experience.id}})} ><small>Edit description</small></button>
                </ul>
                <button onClick={()=> navigate("/edit-workExperience", {state: {id: resumeId, work: experience.id}})}>Edit</button>
                
                <button>Delete</button>
            </div>
           
        ))}
        <button onClick={() => navigate("/Work-experienceForm", {state: {id : resumeId}})}>Add a work experience</button>
        <button onClick={() =>  navigate('/education', {state: {id: resumeId}})}>Back</button>
        <button onClick={()=> navigate('/skills', {state: {id:resumeId}})}>Next</button>
        </div>)
}

export default WorkView;