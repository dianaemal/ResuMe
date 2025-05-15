import react from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../CSS/Resume.css'; 
import axiosInstance from "../axios";

function Resume(){
    const location = useLocation();
    const navigate = useNavigate()
    const resumeId = location.state?.id || null;
    console.log(resumeId)

    const[infoHover, setInfoHover] = useState(false)

    const [resumeData, setData] = useState(null);
    useEffect(()=>{
        if (!resumeId) return;

            axiosInstance.get(`/api/resumes/${resumeId}/all`)
            .then((res)=>{
                setData(res.data);
            })
            .catch((err)=> console.error("Error fetching education data:", err));
            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/all`)
            .then((res)=>{
                return res.json();

            })
            .then((data)=>{
                setData(data);
                console.log(resumeData.contactInfo.f_name)
            })
            .catch((err)=> console.error("Error fetching education data:", err));*/
    

    }, [resumeId])
    if (!resumeData) {
        return <p>Loading resume...</p>;
    }
    return(
        <div class="main_container">
            <div onClick={()=>  navigate(`/contact-info/`, {state: {id: resumeId}}) } class="infoBox"
               
            >
            <h1>{resumeData.contactInfo?.f_name} {resumeData.contactInfo?.l_name} </h1>
            
            <p  id="info">{resumeData.contactInfo?.city}, {resumeData.contactInfo?.province}, {resumeData.contactInfo?.postal_code} 
                 | {resumeData.contactInfo?.email} | {resumeData.contactInfo?.phone_number}
            </p>
            </div>
            <div class="infoBox">
            
            <h3>Objective</h3>
            <hr></hr>
            <p>{resumeData.summary?.summary}</p>
            </div> 

            <div class="infoBox">
            <h3>Education</h3>
            <hr></hr>
            <p>{resumeData.education.map((edu, index)=>(
                <p key = {index}>
                    
                    
                    <span class="strong">{edu.school_name} </span> <span  class="float strong">{edu.location}</span><br></br>
                    <span class="italic">{edu.degree} in {edu.study_feild} </span>
                    <span class="float italic">{edu.start_month}, {edu.start_year} - {edu.graduation_month}, {edu.graduation_year}</span>
                </p>
            

            ))}</p>
            </div>

            <div class="infoBox">
           
            <h3>Work Experience</h3>
            <hr></hr>
            <div>{resumeData.workExperience.map((work, index)=>(
                <p key = {index}>
                    
                    
                    <span class="strong">{work.employer}</span> <span class="float strong">{work.location}</span><br></br>
                    
                    <span class="italic">{work.position}</span>
                    <span class="float italic" >{work.start_month}, {work.start_year} - {work.end_month}, {work.end_year}</span>
                    <ul>
                        {work.description?.description.split("\n").map((exp, index)=>(
                            <li key={index}>{exp}</li>
                        ))}
                    </ul>
                </p>
              ))}</div>
             </div>
             <div class="infoBox">
              <h3>Skills</h3>
              <hr></hr>
              <p>
                {resumeData.skills?.skills.split("\n").map((skill, i)=>(
                    <li key ={i}>{skill}</li>
                ))}
              </p>
              </div>


        </div>
            
    )
}
export default Resume;