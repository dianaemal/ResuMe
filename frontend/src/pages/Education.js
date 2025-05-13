import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
function Education(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [education, setEducation] = useState({
        school_name : "",
        location : "",
        degree : "",
        study_feild: "",
        start_month : "",
        start_year : "",
        graduation_month : "",
        graduation_year : ""

    })
   
    const handleSubmit = async () =>{
        
        const response = await axiosInstance.post(`/api/resumes/${resumeId}/education`, education)
        if (response.status === 200 || response.status === 201){
            navigate('/education', {state: {id: resumeId}});
        }
       /* const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify(education)
        })
        if (response.ok){
            navigate('/education', {state: {id: resumeId}});
        }*/
    }


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEducation((prev) =>({
            ...prev,
            [name]: value

        }))
    }
   
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = []
    for (let i = 0; i < 46; i++){
        let year = 2025 - i
        years.push(`${year}`)
    }
    const degrees = [
        "High school diploma",
        "Associate of Arts",
        "Associate of Science",
        "Bachelor of Science",
        "Bachelor of Arts",
        "BBA",
        "Master of Arts",
        "Master of Science",
        "MBA",
        "M.D.",
        "Ph.D.",
        "No degree",
      ];
    
    const navigate = useNavigate();
    
    return(
        
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit();
            }}>
                <label htmlFor="school ">School Name</label>
                <input type="text"
                    name='school_name' 
                    id="school"
                    value={education.school_name}
                    onChange={handleChange}
        
                /> 
                <label htmlFor="location" >Location</label>
                <input type="text"
                    name='location' 
                    id="location"
                    placeholder='Abbotsford, BC'
                    value={education.location}
                    onChange={handleChange}
                /> 
                <label htmlFor="degree" >Degree</label>
                <select id="degree" name="degree" value={education.degree}  onChange={handleChange}>
                    <option value="">--Select--</option>
                    {degrees.map((degree, index) =>(
                        <option key={index} value={degree}>{degree}</option>
                        
                    ))}
                    <option value="  ">Enter another Degree</option>
                </select>
                {education.degree === "  " && (
                    <div>
                        <label htmlFor="another">Enter another Degree</label>
                        <input id="another"
                            name="degree"
                            value={education.degree}
                            onChange={handleChange}
                        />
                    </div>
                    
                )}

                <label htmlFor="FOS">Feild of Study</label>
                <input type="text"
                    name='study_feild' 
                    id="FOS"
                    placeholder='e.g. Computer Science'
                    value={education.study_feild}
                    onChange={handleChange}
                    disabled = {education.degree === 'High school diploma'}
                /> 
                <label htmlFor="s_month">Start Month</label>
                <select id="s_month" value={education.start_month} name="start_month"  onChange={handleChange}> 
                    <option value="">--Select Month--</option>
                    {months.map((month, index) =>(
                        <option key={index} value={month}> {month}</option>
                    ))};
                    
                </select>
                <label htmlFor="s_year"> Start Year</label>
                <select id="s_year" value={education.start_year} name="start_year"  onChange={handleChange}>
                    <option value="">--Select Year--</option>
                    {years.map((year, index) =>( 
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
                <label htmlFor="g_month">Graduation Month</label>
                <select id="g_month" value={education.graduation_month} name="graduation_month"  onChange={handleChange}>
                    <option value="">--Select Month--</option>
                    {months.map((month, index) =>(
                        <option key={index} value={month}> {month}</option>
                    ))};
                    
                </select>
                <label htmlFor="g_year">Graduation Year</label>
                <select id="g_year" value={education.graduation_year} name="graduation_year"  onChange={handleChange}>
                    <option value="">--Select Year--</option>
                    {years.map((year, index) =>(
                        
                        <option  key={index} value={year}>{year}</option>
                    ))}
                </select>

               
               
                <button type="submit">Save</button>
            </form>
            
        
        
    )
}
export default Education;