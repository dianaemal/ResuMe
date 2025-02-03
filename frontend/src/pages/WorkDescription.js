import react from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function WorkDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
    console.log(location);
    const [workDescription, setDescription] = useState("");
    

    const handleSubmit = async()=>{
        const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}/description`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({ description: workDescription })
        })
        if(response.ok){
            
            navigate(`/work-experience`, { state: { id: resumeId } });
        }
        
    }
    const navigate = useNavigate();

    



    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="des">Write discription for your job:</label>
            <textarea
                name="description"
                id="des"
                value={workDescription}
                onChange={(e) => setDescription(e.target.value)}
            >

            </textarea>
            <button type="submit">Next</button>
        </form>
    )
}
export default WorkDescription;
