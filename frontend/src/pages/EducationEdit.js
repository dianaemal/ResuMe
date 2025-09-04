import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ResumePreview from './ResumePreview'
import { useState, useEffect} from 'react';
import axiosInstance from '../axios';
import SideBar from './SideBar';
import "../CSS/FormStyles.css";
import Footer from '../components/Footer';

function EducationEdit(){
    const location = useLocation();
    const resumeId = location.state.id ;
    const educationId = location.state.E_id;
    const [error, setError] = useState(false)
    const [otherDegree, setOtherDegree] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    //console.log(idObject)
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

const fetchEducation = () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    if(resumeId){
        axiosInstance.get(`/api/resumes/${resumeId}/education/${educationId}`)
        .then((res)=>{
            if (res.status === 200 || res.status === 201){
                const data = res.data
                setEducation({
                    school_name : data.school_name,
                    location : data.location,
                    degree : data.degree,
                    study_feild: data.study_feild,
                    start_month : data.start_month,
                    start_year : data.start_year,
                    graduation_month : data.graduation_month,
                    graduation_year : data.graduation_year
                })
                if (data.degree && !degrees.includes(data.degree)) {
                    setOtherDegree(true);
                } else {
                    setOtherDegree(false);
                }
                setIsLoading(false);
            }
        })
        .catch((err)=> {
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
            console.error(err)
        })
    } else {
        setIsLoading(false);
    }
}

useEffect(() =>{
    fetchEducation();
}, [resumeId, educationId]);



const handleSubmit = async () =>{
    console.log(`hey ${education.degree}`)
    if (otherDegree && (!education.degree || education.degree.trim() === '')){
        setError(true)
        return
    }

    const response = await axiosInstance.put(`/api/resumes/${resumeId}/education/${educationId}`, education)
    if (response.status === 200 || response.status === 201){
        navigate('/education', {state: {id: resumeId}});
    }
        
    /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
            },
        body: JSON.stringify(education)
    })
    if (response.ok){
        navigate('/education', {state: {id: resumeId}});
    }*/
}


const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when editing degree field
    if (name === 'degree') {
        setError(false);

        // If user selects "custom"
        if (value === 'custom') {
            setOtherDegree(true);
            setEducation((prev) => ({
                ...prev,
                degree: ''
            }));
            return;
        }

        // If it's a known degree like "High school diploma"
        if (value === 'High school diploma') {
            setOtherDegree(false);
            setEducation((prev) => ({
                ...prev,
                degree: value,
                study_feild: null // clear field of study if not applicable
            }));
            return
            
        }

        // If it's any known degree
        if (degrees.includes(value)) {
            setOtherDegree(false);
            setEducation((prev) => ({
                ...prev,
                degree: value
            }));
            return;
        }
    }

    // Handle custom degree input field
    if (otherDegree && name === 'degree') {
        setEducation((prev) => ({
            ...prev,
            degree: value
        }));
        return;
    }

    // For all other fields
    const finalValue = value === '' ? null : value;
    setEducation((prev) => ({
        ...prev,
        [name]: finalValue
    }));
};


const navigate = useNavigate();

if (isLoading) {
    return (
        <div className='gridContainer' >
            <div className='progression'><SideBar/></div>
            <div className='container3' >
                <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="loading-spinner"></div>
                    <p>Loading education information...</p>
                </div>
            </div>
            <div className="container4"onClick={()=> navigate('/resume', {state: {id: resumeId}})} >
                <ResumePreview prop={{...education, eduId: educationId, identity: 'edu', id:resumeId}}/>
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
            <button className="create-first-btn" onClick={fetchEducation} style={{marginTop: '12px'}}>Try Again</button>
        </div>
         
    );
}

return(
    <>
    <div className='gridContainer' >
        <div className='progression'><SideBar/></div>
        <div className='container3' >
            <h3 className='h3'>Edit Education Information</h3>
            <p className="contact-description">Update your educational background with accurate information about your degree, field of study, and graduation details.</p>
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
                                    style={{border: error ? "2px solid red" : undefined}}
                                    value={education.degree ||''}
                                    onChange={handleChange}
                                />
                                {error && (
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
                        <button  className="button2" type="submit"><span>Save</span> &rarr;</button>
                    </div>
                </form>
                <Footer/>
            </div>
            <div className="container4"onClick={()=> navigate('/resume', {state: {id: resumeId}})} >
                <ResumePreview prop={{...education, eduId: educationId, identity: 'edu', id:resumeId}}/>
            </div>
        </div>
  
        </>
        
    
    
)
}
export default EducationEdit;