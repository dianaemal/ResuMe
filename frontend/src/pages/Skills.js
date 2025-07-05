import react from "react"
import { useState, useEffect,useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../axios";
import { ResumeContext } from "../ResumeContext";
import ResumePreview from "./ResumePreview";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "../CSS/FormStyles.css";
import SideBar from './SideBar';


function Skills(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const [skills, setSkills] = useState("")
    const [skillsExit, setExist] = useState(false);
    const {resume, setResume} = useContext(ResumeContext)
    const handleSubmit = async ()=>{
        console.log(skills);
        const response = skillsExit? await axiosInstance.put(`/api/resumes/${resumeId}/skills`,{skills: skills} )
        : await axiosInstance.post(`/api/resumes/${resumeId}/skills`, {skills: skills})
        if (response.status === 201 || response.status === 200){
            navigate('/summary', {state: {id:resumeId}})
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/skills`, {
            method: skillsExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({skills})

        })
        if (response.ok){
            navigate('/summary', {state: {id:resumeId}})
        }*/
    }
    useEffect(()=>{
        if (resumeId){

            axiosInstance.get(`/api/resumes/${resumeId}/skills`)
            .then((res)=>{
                if(res.status === 200 || res.status === 201){
                    if (res.data){
                        setExist(true)
                        setSkills(res.data.skills)
                    }
                    

                }
            })
            .catch((error) =>{
                setExist(false)
                console.error('Error fetching resume:', error)
            });


           /* fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/skills`)
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
            .catch((error) => console.error('Error fetching resume:', error));*/
        }
    }, [resumeId])
    useEffect(()=>{
        setResume((prev)=>({
            ...prev,
            skills: {skills}
        }))
    }, [skills])


    return (
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'skills'}}/>
            </div>
            <div className="container3">
                <h3 className="h3">Skills & Expertise</h3>
                <p className="contact-description">List your key skills and areas of expertise. Include both technical and soft skills that are relevant to your target position.</p>
                <form className="form" onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                }}>
            <div style={{marginTop: '20px'}}>
            <ReactQuill 
                className="my-editor"
                value={skills}
                onChange={(value)=>{
                    if (value === '<p><br></p>'){
                        setSkills(null)
                    }
                    else{
                        setSkills(value)
                    }
                }
                } 
             />
             </div>

            <div className="buttonContainer">
                <button className="button2" type="button" onClick={ () => navigate("/work", {state: {id:resumeId}})}> &larr; <span>Back</span></button>
                <button className="button2" type="submit"><span>Next</span> &rarr;</button>
            </div>
        </form>
            </div>
            <div className="container4" style={{marginTop: "0", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
                <ResumePreview prop={{id:resumeId}}/>
            </div>
        </div>
    )
}
export default Skills;