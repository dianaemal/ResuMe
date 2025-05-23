import react from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WorkDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
    console.log(location);
    const [workDescription, setDescription] = useState("");
    

    const handleSubmit = async()=>{
        const response = await axiosInstance.post(`/api/resumes/${resumeId}/work/${workId}/description`, { description: workDescription })
        if (response.status === 200 || response.status === 201){
            navigate(`/work-experience`, { state: { id: resumeId } });
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}/description`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({ description: workDescription })
        })
        if(response.ok){
            
            navigate(`/work-experience`, { state: { id: resumeId } });
        }*/
        
    }
    const navigate = useNavigate();

    



    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="des">Write discription for your job:</label>
            <ReactQuill
                
                
                value={workDescription}
                onChange={setDescription}
            >

            </ReactQuill>
            <button type="submit">Next</button>
        </form>
    )
}
export default WorkDescription;
