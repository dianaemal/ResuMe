import react from "react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Summary(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const [summary, setSummary] = useState("")
    const [summaryExit, setExist] = useState(false);

    const handleSubmit = async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/summary`, {
            method: summaryExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({summary})

        })
        if (response.ok){
            navigate('/resume', {state: {id:resumeId}})
        }
    }
    useEffect(()=>{
        if (resumeId){
            fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/summary`)
            .then((res)=>{
                if (res.ok){
                    setExist(true);
                    return res.json();
                }
                setExist(false);
            })
            .then((data)=>{
                if(data){
                    setSummary(data.summary)
                }
            })
            .catch((error) => console.error('Error fetching resume:', error));
        }
    }, [resumeId])



    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="summary">Write a Summary of your resume:</label>
            <textarea 
                id="summary"
                name="summary"
                value={summary}
                onChange={(e)=> setSummary(e.target.value)}
             ></textarea>

            <button type="submit" >Next</button>
            <button onClick={ () => navigate("/skills", {state: {id:resumeId}})}>Back</button>
        </form>
    )
}
export default Summary;