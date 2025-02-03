import react from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Resume(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    console.log(resumeId)

    const [resumeData, setData] = useState(null);
    useEffect(()=>{
        if (resumeId){
            fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/all`)
            .then((res)=>{
                return res.json();

            })
            .then((data)=>{
                setData(data);
                console.log(resumeData.contactInfo.f_name)
            })
    }

    }, [resumeId])
    return(
        <div>
            <h1>{resumeData.contactInfo.f_name} {resumeData.contactInfo.l_name} </h1>
            <hr></hr>
            <p>{resumeData.contactInfo.city}, {resumeData.contactInfo.province}, {resumeData.contactInfo.postal_code} 
                 | {resumeData.contactInfo.email} | {resumeData.contactInfo.phone_number}
            </p>
            <h3>Objective</h3>
            <p>{resumeData.summary.summary}</p>
            <hr></hr>
            <h3>Education</h3>
            <p>{resumeData.education.map((edu, index)=>(
                <p key = {index}>
                    {edu.school_name}   {edu.location}<br></br>
                    {edu.degree} in {edu.study_feild}<br></br>
                    {edu.start_month}, {edu.start_year} - {edu.graduation_month}, {edu.graduation_year}
                </p>
            

            ))}</p>
            <hr></hr>
            <h3>Work Experience</h3>
            <p>{resumeData.workExperience.map((work, index)=>(
                <p key = {index}>
                    <strong>{work.employer} </strong>  {work.location}<br></br>
                    {work.position}<br></br>
                    {work.start_month}, {work.start_year} - {work.end_month}, {work.end_year}
                    <ul>
                        {work.description.description.split("\n").map((exp, index)=>(
                            <li key={index}>{exp}</li>
                        ))}
                    </ul>
                </p>
              ))}</p>
              <hr></hr>
              <h3>Skills</h3>
              <p>
                {resumeData.skills.skills.split("\n").map((skill, i)=>(
                    <li key ={i}>{skill}</li>
                ))}
              </p>

        </div>
    )
}
export default Resume;