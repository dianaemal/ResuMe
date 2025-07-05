import react from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResumePreview from './ResumePreview';
import "../CSS/FormStyles.css";
import SideBar from './SideBar';


function WorkDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
    console.log(location);
    const [workDescription, setDescription] = useState(null);
    
    console.log(workDescription)
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
        <div className='gridContainer'>
            <div className='progression'>
                <SideBar prop={{page: 'work'}}/>
            </div>
            <div className='container3'>
                <h3 className="h3">Job Description</h3>
                <p className="contact-description">Describe your responsibilities, achievements, and key contributions in this role. Use action verbs and quantify your accomplishments when possible.</p>
                <form className="form" onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                }}>
            <div style={{marginTop: '20px'}}>
            <ReactQuill className="my-editor"
                
                
                value={workDescription}
                onChange={(value)=> {
                    if (value === '<p><br></p>'){
                        setDescription('')
                    }
                    else{
                        setDescription(value)
                    }
                }}
                    
                    
            />
            </div>
            <div className="buttonContainer">
                <div></div>
                <button className="button2" type="submit"><span>Next</span> &rarr;</button>
            </div>
        </form>
            </div>
            <div className="container4" style={{marginTop: "0", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
                <ResumePreview prop={{description: workDescription, identity: 'exp', workId: workId, id:resumeId}}/>
            </div>
        </div>
    )
}
export default WorkDescription;
