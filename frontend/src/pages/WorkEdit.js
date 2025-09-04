import React from "react";
import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axiosInstance from "../axios";
import ResumePreview from "./ResumePreview";
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
function WorkEdit(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
   

    const[workExperience, setWork] = useState(
        {
            position: null,
            employer: null,
            location: null,
            start_month: null,
            start_year: null,
            end_month: null,
            end_year: null,
            still_working: false,
            description: null
        }
    )
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const fetchWork = () => {
        setIsLoading(true);
        setErrorMessage(null);
        
        if(resumeId && workId){
            axiosInstance.get(`/api/resumes/${resumeId}/work/${workId}`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    const data = res.data
                    if (data){
                        setWork({
                            position: data.position,
                            employer: data.employer,
                            location: data.location,
                            start_month: data.start_month,
                            start_year: data.start_year,
                            end_month: data.end_month,
                            end_year: data.end_year,
                            still_working: data.still_working,
                            description: data.description || null
                        })
                    }
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                if (err.code === 'ERR_NETWORK') {
                    setErrorMessage("Network error: Please check your internet connection and try again.");
                } else if (err.code === 'ECONNABORTED') {
                    setErrorMessage("Request timed out: The server is taking too long to respond. Please try again later.");
                } else if (err.response) {
                    setErrorMessage(`Failed to process your request: (status ${err.response.status}). Please try again later.`);
                } else if (err.message) {
                    setErrorMessage(err.message);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
                console.error("Error fetching work experience:", err);
            })
        } else {
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        fetchWork();
    }, [resumeId, workId])

    const handleSubmit = async ()=>{
        try {
            const response = await axiosInstance.put(`/api/resumes/${resumeId}/work/${workId}`, workExperience)
            if (response.status === 200 || response.status === 201){
                const data = response.data
                const workId = data.id;
                navigate('/work-experience', {state: {id: resumeId}})
            }
        } catch (error) {
            console.error("Error updating work experience:", error);
        }

        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify(workExperience)
        })
        if(response.ok){
           
            const data = await response.json();
            const workId = data.id;
            navigate('/edit-description', {state: {id: resumeId, work: workId}})
            
       }*/
    }
    const navigate = useNavigate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = []
    for (let i = 0; i < 46; i++){
        let year = 2025 - i;
        years.push(`${year}`);


    }
    const handleChange = (e) =>{
        const {name, value, type, checked} = e.target;
        
        // Handle empty values as null
        const finalValue = type === "checkbox" ? checked : (value === "" ? null : value);
        
        setWork((prev) =>({
            ...prev,
            [name]: finalValue,
        }))
    }
    
    if (isLoading) {
        return (
            <div className="gridContainer">
                <div className="progression">
                    <SideBar prop={{page: 'work'}}/>
                </div>
                <div className="container3" style={{height: '100%'}}>
                    <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="loading-spinner"></div>
                        <p>Loading work experience...</p>
                    </div>
                </div>
                <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                    <h3 className='h3' style={{textAlign: 'center', fontSize: '20px', textDecoration: 'underline'}}>Preview</h3>
                    <ResumePreview prop={{...workExperience, identity: 'work', workId:workId, id:resumeId}}/>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            
            <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchWork} style={{marginTop: '12px'}}>Try Again</button>
            </div>
                   
               
        );
    }

    return(
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'work'}}/>
            </div>
            <div className="container3" style={{height: '100%'}}>
                <h3 className='h3'>Edit Work Experience</h3>
                <p className="contact-description">Update your work experience details including position, employer, and employment dates.</p>
                <form className="form" onSubmit={(e) =>{
                    e.preventDefault();
                
                    handleSubmit();
                }}>
                    <div className="flexRow1">
                        <div>
                            <label htmlFor="position">Position</label><br/>
                            <input type="text"
                                id="position"
                                name="position"
                                value={workExperience.position || ""}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="employer">Employer</label><br/>
                            <input type="text"
                                id="employer"
                                name="employer"
                                value={workExperience.employer || ""}
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="flexRow1">
                        <div>
                        <label htmlFor="location">Location</label><br/>
                        <input 
                        type="text"
                            name="location"
                            id="location"
                            value={workExperience.location || ""}
                            onChange={handleChange}
                        ></input>
                    </div>
                    </div>
                    <div className="flexRow1">
                        
                        <div className="select-selected">
                            <label htmlFor="s_month">Start Month</label><br/>
                            <select  name="start_month" id="s_month" value={workExperience.start_month || ""}  onChange={handleChange}>
                                <option value="">--Select--</option>

                                {months.map((month, index)=>(
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="select-selected">
                       
                            <label htmlFor="s_year">Start Year</label><br/>
                            <select id="s_year" name="start_year" value={workExperience.start_year || ""}  onChange={handleChange}>
                                <option value="">--Select--</option>
                                {years.map((year, index)=>(
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                      
                    </div>
                    <div className="flexRow1">
                        <div className="select-selected">
                            <label htmlFor="e_month">End Month</label><br/>
                            <select name="end_month" id="e_month" value={workExperience.end_month || ""}
                                disabled = {workExperience.still_working}
                                onChange={handleChange}>
                                <option value="">--Select--</option>

                                {months.map((month, index)=>(
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                      
                        <div className="select-selected">
                            <label htmlFor="e_year">End Year</label><br/>
                            <select id="e_year" name="end_year" value={workExperience.end_year || ""}
                                disabled = {workExperience.still_working} 
                                onChange={handleChange}
                            >
                                <option value="">--Select--</option>
                                {years.map((year, index)=>(
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                      <div >
                        
                            <input 
                                type="checkbox"
                                id="current"
                                name="still_working"
                                onChange={handleChange}
                                checked = {workExperience.still_working}
                            ></input>
                            <label  htmlFor="current">I am currently working here.</label>
                        </div>
                      
                    <div className='buttonContainer'>
                        <button className="button2" type="button" onClick={() => navigate('/work-experience', {state: {id: resumeId}})}> &larr; <span>Back</span></button>
                        <button  className="button2" type="submit"><span>Next</span> &rarr;</button>
                    </div>
                </form>
                
            </div>
            <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                <h3 className='h3' style={{textAlign: 'center', fontSize: '20px', textDecoration: 'underline'}}>Preview</h3>
                <ResumePreview prop={{...workExperience, identity: 'work', workId:workId, id:resumeId}}/>
            </div>
        </div>

    )

}
export default WorkEdit;