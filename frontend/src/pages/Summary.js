import react from "react"
import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResumePreview from "./ResumePreview";
import { ResumeContext } from "../ResumeContext";
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
function Summary(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const {resume, setResume} = useContext(ResumeContext)
    const [summary, setSummary] = useState(null)
    const [summaryExit, setExist] = useState(false);

    const handleSubmit = async ()=>{
        const response = summaryExit? await axiosInstance.put(`/api/resumes/${resumeId}/summary`, {summary: summary})
        : await axiosInstance.post(`/api/resumes/${resumeId}/summary`, {summary: summary})
        if (response.status === 201 || response.status === 200){
            navigate('/resume', {state: {id:resumeId}})
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/summary`, {
            method: summaryExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({summary})

        })
        if (response.ok){
            navigate('/resume', {state: {id:resumeId}})
        }*/
    }
    useEffect(()=>{
        if (resumeId){

            axiosInstance.get(`/api/resumes/${resumeId}/summary`)
            .then((res)=>{
                if(res.status === 200 || res.status === 201){
                    if (res.data){
                        setExist(true)
                        setSummary(res.data.summary)
                    }
                    

                }
            })
            .catch((error) =>{
                setExist(false)
                console.error('Error fetching resume:', error)
            });
            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/summary`)
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
            .catch((error) => console.error('Error fetching resume:', error));*/
        }
    }, [resumeId])
    useEffect(()=>{
        setResume((prev)=>({
            ...prev,
            summary: {summary}
    }))

    },[summary])


    return (
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'summary'}}/>
            </div>
            <div className="container3">
                <h3 className="h3">Professional Summary</h3>
                <p className="contact-description">Write a compelling summary that highlights your key qualifications, experience, and career objectives. This is often the first thing employers read.</p>
                <form className="form" onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                }}>
            <div style={{marginTop: '20px'}}>
            <ReactQuill className="my-editor"
               
                value={summary}
                onChange={(value)=> {
                    if (value === '<p><br></p>'){
                        setSummary(null)
                    }
                    else{
                        setSummary(value)
                    }
                }
                }
             />
             </div>

            <div className="buttonContainer">
                <button className="button2" type="button" onClick={ () => navigate("/skills", {state: {id:resumeId}})}> &larr; <span>Back</span></button>
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
export default Summary;