import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function EducationView(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [educationList, setEducationList] = useState([]);

   
    useEffect(() =>{
        if(resumeId){
            fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education`)
            .then((res)=>{
                if(res.ok){
                    
                    return res.json();
                }
               
                
            })
            .then((data)=>{
                if(data){
                    setEducationList(data);
                }
            })
            .catch((err)=> console.error("Error fetching education data:", err));
        }
    }, [resumeId]);
    
    const handleEdit = (educationId) =>{
        navigate('/edit-education', {state: {id: resumeId, E_id : educationId}});
        console.log(educationId)
        console.log(resumeId)
    }
    const handleDelete = (educationId) =>{
        fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if (res.ok){
                setEducationList((prev)=> prev.filter((edu)=> edu.id !== educationId));
            }
        })
    }

    
   
   
    
    const navigate = useNavigate();
    
    return(
        <div>
            <h5>Now we are going to add Education summary to our resume.</h5>
            {educationList.map((education)=>(
                <li key={education.id}>
                    <h2>{education.school_name}</h2>
                    <p>{education.degree} in {education.study_feild}</p>
                    <small>{education.start_month}, {education.start_year} - {education.graduation_month}, {education.graduation_year}</small>
                    <button onClick={()=> handleEdit(education.id)}>Edit</button>
                    <button onClick={() => handleDelete(education.id)}>Delete</button>

                </li>
            ))}
            <button onClick={()=>{
                navigate('/educationForm', {state: {id: resumeId}});
            }

            }>Add Education</button>
            <button onClick={() =>{
                navigate(`/contact-info/`, { state: { id: resumeId } });
            }}>Back</button>
             <button onClick={() =>{
                navigate(`/work-experience`, { state: { id: resumeId } });
            }}>Next</button>


        </div>
        
    )
}
export default EducationView;