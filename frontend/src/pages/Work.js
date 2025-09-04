import React from "react";
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axiosInstance from "../axios";
import ResumePreview from "./ResumePreview";
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
function Work(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
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
    
    const handleSubmit = async ()=>{
        // Check if all required fields are null/empty
        const hasData = workExperience.position || workExperience.employer || 
                       workExperience.location || workExperience.start_month || 
                       workExperience.start_year || workExperience.end_month || 
                       workExperience.end_year;
        
        if (!hasData) {
            // If no data, just navigate to next page
            navigate('/work-experience', {state: {id: resumeId}})
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/resumes/${resumeId}/work`, workExperience)
            if (response.status === 200 || response.status === 201){
                const data = response.data
                const workId = data.id;
                console.log(response.data)
                navigate('/work-description', {state: {id: resumeId, work: workId}})
            }
        } catch (error) {
            console.error("Error creating work experience:", error);
        }

        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify(workExperience)
        })
        if(response.ok){
            const data = await response.json();
            const workId = data.id;
            navigate('/work-description', {state: {id: resumeId, work: workId}})
            
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
    
  


    return(
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'work'}}/>
            </div>
            <div className="container3" style={{height: '100%'}}>
                <h3 className='h3'>Work Experience</h3>
                <p className='contact-description'>Tell us about your work experience. Include your job title, employer, and employment dates to showcase your professional background.</p>
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
                        <button className="button2" type="button" onClick={() => navigate('/education', {state: {id: resumeId}})}> &larr; <span>Back</span></button>
                        <button  className="button2" type="submit"><span>Next </span>&rarr;</button>
                    </div>
                </form>
                
            </div>
            <div className='container4'onClick={()=> navigate('/resume', {state: {id: resumeId}})} >
                <ResumePreview prop={{...workExperience, identity: 'work', id:resumeId}} />
            </div>
        </div>

    )

}
     
export default Work;