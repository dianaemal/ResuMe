import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ResumePreview from './ResumePreview'
import { useState, useEffect, useContext} from 'react';
import axiosInstance from '../axios';
import { ResumeContext } from '../ResumeContext';
import SideBar from './SideBar';

function EducationEdit(){
    const location = useLocation();
    const resumeId = location.state.id ;
    const educationId = location.state.E_id;
    //console.log(idObject)
    const {resume, updateResume} = useContext(ResumeContext)
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
     const [otherDegree, setOtherDegree] = useState(false)


useEffect(() =>{
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
                if (!degrees.includes(data.degree)){
                    setOtherDegree(true)
                }
                
            }
        })
        .catch((err)=> console.error(err))
        /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`)
        .then((res)=>{
            if(res.ok){
               
                return res.json();
            }
           
        })
        .then((data)=>{
            if(data){
                console.log(data);
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
            }
        })*/
    }
}, [resumeId, educationId]);

useEffect(()=>{
    
},[education])
console.log(otherDegree)


const handleSubmit = async () =>{

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


const handleChange = (e) =>{
    const {name, value} = e.target;
        if (name === 'degree' && value === "  "){
            setOtherDegree(true)
        }
        else if(degrees.includes(value)){
            setOtherDegree(false)
        }
        setEducation((prev) =>({
            ...prev,
            [name]: value

        }))
        console.log(value)
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
    
    <div className='gridContainer'>
        <div className='progression'><SideBar/></div>
        <div className='container3' style={{height: '100%', marginTop: '0'}}>
            <h3 className='h3'>Write your Contact information!</h3>
            <form onSubmit={(e) =>{
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
                            <select id="degree" name="degree" value={education.degree}  onChange={handleChange}>
                                <option value="">{ otherDegree? 'Enter another Degree' : '__ Select__'}</option>
                                {degrees.map((degree, index) =>(
                                    <option key={index} value={degree}>{degree}</option>
                                        
                                ))}
                                <option value="  ">Enter another Degree</option>
                            </select>
                        </div>
                        {otherDegree && (
                            <div style={{marginTop: '25px'}}>
                                <label htmlFor="another">Enter another Degree</label><br/>
                                <input id="another"
                                    name="degree"
                                    value={education.degree}
                                    onChange={handleChange}
                                    />
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

                        <button className="button2" type="button"> &larr; <span>Back</span></button>
                        <button  className="button2" type="submit"><span>Next </span>&rarr;</button>

                    </div>
                </form>
            </div>
            <div>
                <ResumePreview prop={{...education, eduId: educationId, identity: 'edu', id:resumeId}}/>
            </div>
        </div>
        
    
    
)
}
export default EducationEdit;