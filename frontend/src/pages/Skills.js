import react from "react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Skills(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const [skills, setSkills] = useState("")
    const [skillsExit, setExist] = useState(false);

    const handleSubmit = async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/skills`, {
            method: skillsExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({skills})

        })
        if (response.ok){
            navigate('/summary', {state: {id:resumeId}})
        }
    }
    useEffect(()=>{
        if (resumeId){
            fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/skills`)
           .then((res)=>{
                if (res.ok){
                    setExist(true);
                    console.log(skillsExit)
                    return res.json();
               }
                setExist(false);
            })
            .then((data)=>{
                if(data){
                    setSkills(data.skills)
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
            <label htmlFor="skills">Write your Skills:</label>
            <textarea 
                id="skills"
                name="skills"
                value={skills}
                onChange={(e)=> setSkills(e.target.value)}
             ></textarea>

            <button type="submit" >Next</button>
            <button onClick={ () => navigate("/work-experience", {state: {id:resumeId}})}>Back</button>
        </form>
    )
}
export default Skills;