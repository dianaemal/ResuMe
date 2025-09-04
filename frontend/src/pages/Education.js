import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ResumeContext } from '../ResumeContext';
import ResumePreview from './ResumePreview'
import axiosInstance from '../axios';
import SideBar from './SideBar';
import "../CSS/FormStyles.css";

function Education(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [otherDegree, setOtherDegree] = useState(false)
    const [degreeError, setDegreeError] = useState(false)
    const {resume} = useContext(ResumeContext)
    const [education, setEducation] = useState({
        school_name : null,
        location : null,
        degree : null,
        study_feild: null,
        start_month : null,
        start_year : null,
        graduation_month : null,
        graduation_year : null

    })
   
    const handleSubmit = async () =>{

       
        // Validate degree input
        if (otherDegree && (!education.degree || education.degree.trim() === '')) {
            setDegreeError(true)
            return
        }

        if (Object.values(education).every(value => value === null)){
            navigate('/education', {state: {id: resumeId}});
            return
        }
        
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
        
        // Clear error when user starts typing
        if (name === 'degree') {
            setDegreeError(false)
        }
        
        // Handle degree selection logic
        if (name === 'degree') {
            if (value === 'custom') {
                setOtherDegree(true)
                setEducation(prev => ({ ...prev, degree: '' }))
                return
            }

        else if (value === 'High school diploma'){
            setEducation((prev)=>({
                ...prev,
                degree: value,
                study_feild: null
            }))
                
        }

              
             else if (degrees.includes(value)) {
                setOtherDegree(false)
                setEducation(prev => ({ ...prev, degree: value }))
                return
                
            }
            
        }
        
        // Handle empty values
        const finalValue = value === '' ? null : value
        
        setEducation((prev) =>({
            ...prev,
            [name]: finalValue
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
    console.log(education.degree)
    return(
        
        <div className='gridContainer'>
        <div className='progression'> <SideBar prop={{page: 'edu'}}/></div>
        <div className='container3' >
            <h3 className='h3'>Education Information</h3>
            <p className='contact-description'>Tell us about your educational background. Include your degree, field of study, and graduation details to showcase your academic achievements.</p>
            <form className="form" onSubmit={(e) =>{
            e.preventDefault();
            handleSubmit();
        }}>
            <div className='flexRow1'>
                <div>
                    <label htmlFor="school ">School Name</label><br/>
                    <input type="text"
                        name='school_name' 
                        id="school"
                        value={education.school_name}
                        onChange={handleChange}
                
                    /> 
                </div>
                <div>
                    <label htmlFor="location" >Location</label><br/>
                    <input type="text"
                        name='location' 
                        id="location"
                        placeholder='Abbotsford, BC'
                        value={education.location}
                        onChange={handleChange}
                    /> 
                </div>
            </div>
            <div className='flexRow1'>
                <div >
                    <div className="select-selected">
                        <label htmlFor="degree" >Degree</label><br/>
                        <select 
                            id="degree" 
                            name="degree" 
                            value={otherDegree ? 'custom' : (education.degree || '')}  
                            onChange={handleChange}
                        >
                            <option value="">--Select a Degree--</option>
                            {degrees.map((degree, index) =>(
                                <option key={index} value={degree}>{degree}</option>
                            ))}
                            <option value="custom">Enter another Degree</option>
                        </select>
                    </div>
                    {otherDegree && (
                        <div style={{marginTop: '25px'}}>
                            <label htmlFor="customDegree">Enter another Degree</label><br/>
                            <input 
                                id="customDegree"
                                name="degree"
                                placeholder="e.g. Bachelor of Engineering"
                                style={{border: degreeError ? "2px solid red" : undefined}}
                                value={education.degree || ''}
                                onChange={handleChange}
                            />
                            {degreeError && (
                                <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>
                                    Please enter a degree
                                </span>
                            )}
                        </div>
                    )}
                    </div>

                    <div>

                        <label htmlFor="FOS">Feild of Study</label><br/>
                        <input type="text"
                            name='study_feild' 
                            id="FOS"
                            placeholder='e.g. Computer Science'
                            value={education.study_feild}
                            onChange={handleChange}
                            disabled = {education.degree === 'High school diploma'}
                        /> 
                    </div>
                </div>
                <div className='flexRow1'>
                    <div className="select-selected">
                        <label htmlFor="s_month">Start Month</label><br/>
                        <select id="s_month" value={education.start_month} name="start_month"  onChange={handleChange}> 
                            <option value="">--Select Month--</option>
                            {months.map((month, index) =>(
                                <option key={index} value={month}> {month}</option>
                            ))};
                            
                        </select>
                    </div>
                    <div className="select-selected">
                        <label htmlFor="s_year"> Start Year</label><br/>
                        <select id="s_year" value={education.start_year} name="start_year"  onChange={handleChange}>
                            <option value="">--Select Year--</option>
                            {years.map((year, index) =>( 
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flexRow1'>
                
                    <div className="select-selected">
                        <label htmlFor="g_month">Graduation Month</label><br/>
                        <select id="g_month" value={education.graduation_month} name="graduation_month"  onChange={handleChange}>
                            <option value="">--Select Month--</option>
                            {months.map((month, index) =>(
                                <option key={index} value={month}> {month}</option>
                            ))};
                            
                        </select>
                    </div>
                    <div className="select-selected">
                        <label htmlFor="g_year">Graduation Year</label><br/>
                        <select id="g_year" value={education.graduation_year} name="graduation_year"  onChange={handleChange}>
                            <option value="">--Select Year--</option>
                            {years.map((year, index) =>(
                                
                                <option  key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

            
                <div className='buttonContainer'>
                    <button className="button2" type="button" onClick={() => navigate('/education', {state: {id: resumeId}})}> &larr; <span>Back</span></button>
                    <button  className="button2" type="submit"><span>Next </span>&rarr;</button>
                </div>
            </form>
        </div>
        <div className='container4' onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
            <ResumePreview prop={{...education, identity: 'edu', id:resumeId}}/>
        </div>
    </div>
    


    )
}
export default Education;