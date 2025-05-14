import react from "react";
import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axiosInstance from "../axios";

function Work(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const[workExperience, setWork] = useState(
        {
            position: "",
            employer: "",
            location: "",
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
            still_working: false
        }
    )
    const handleSubmit = async ()=>{
        const response = await axiosInstance.post(`/api/resumes/${resumeId}/work`, workExperience)
        if (response.status === 200 || response.status === 201){
            const data = response.data
            const workId = data.id;
            console.log(response.data)
            navigate('/work-description', {state: {id: resumeId, work: workId}})
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
        setWork((prev) =>({
            ...prev,
            [name]: type === "checkbox"? checked : value,

        }))
    }
    
  


    return(
        <form onSubmit={(e) =>{
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="position">Position</label>
            <input type="text"
                id="position"
                name="position"
                value={workExperience.position}
                onChange={handleChange}
            ></input><br/>
            <label htmlFor="employer">Employer</label>
            <input type="text"
                id="employer"
                name="employer"
                value={workExperience.employer}
                onChange={handleChange}
            ></input><br/>
            <label htmlFor="location">Location</label>
            <input type="text"
                name="location"
                id="location"
                value={workExperience.location}
                onChange={handleChange}
            ></input><br/>
            <label htmlFor="s_month">Start Month</label>
            <select name="start_month" id="s_month" value={workExperience.start_month}  onChange={handleChange}>
                <option value="">--Select--</option>

                {months.map((month, index)=>(
                    <option key={index} value={month}>{month}</option>
                ))}
            </select><br/>
            <label htmlFor="s_year">Start Year</label>
            <select id="s_year" name="start_year" value={workExperience.start_year}  onChange={handleChange}>
                <option value="">--Select--</option>
                {years.map((year, index)=>(
                    <option key={index} value={year}>{year}</option>
                ))}
            </select><br/>

            <label htmlFor="e_month">End Month</label>
            <select name="end_month" id="e_month" value={workExperience.end_month}
                disabled = {workExperience.still_working}
                onChange={handleChange}>
                <option value="">--Select--</option>

                {months.map((month, index)=>(
                    <option key={index} value={month}>{month}</option>
                ))}
            </select><br/>
            <label htmlFor="e_year">End Year</label>
            <select id="e_year" name="end_year" value={workExperience.end_year}
                disabled = {workExperience.still_working} 
                onChange={handleChange}
            >
                <option value="">--Select--</option>
                {years.map((year, index)=>(
                    <option key={index} value={year}>{year}</option>
                ))}
            </select><br/>
            <input 
            type="checkbox"
            id="current"
            name="still_working"
            onChange={handleChange}
            checked = {workExperience.still_working}
            ></input>
            <label htmlFor="current">I am currently working here.</label>

            <button>Next</button>
        </form>

    )

}
export default Work;