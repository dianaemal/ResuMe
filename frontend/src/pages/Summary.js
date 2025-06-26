import react from "react"
import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResumePreview from "./ResumePreview";
import { ResumeContext } from "../ResumeContext";
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
        <div className="gridContainer" style={{gap: '20px'}}>
            <div className="progression"></div>
        <div style={{width: '600px', }}>
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
        }}>
            <h3>Write a Summary of your resume:</h3>
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

            <div className="buttonContainer"  style={{ marginTop: '20px' }}>
            <button className="button4" onClick={ () => navigate("/skills", {state: {id:resumeId}})}>Back</button>
            <button style={{ marginLeft: 'auto',   }} className="button4"  type="submit" >Next</button>
            
            </div>
        </form>
        </div>
        <div className="resumePreview'">
                <ResumePreview prop={{id:resumeId}}/>
        </div>
        </div>
    )
}
export default Summary;