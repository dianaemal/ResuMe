import react from "react";
import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axiosInstance from "../axios";
import styles from "../CSS/Login.css"

function WorkEdit(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
   

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
    useEffect(()=>{
        if(resumeId){

            axiosInstance(`/api/resumes/${resumeId}/work/${workId}`)
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
                            still_working: data.still_working
                        })
                    }
                }
            })

            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}`)
            .then((res)=>{
                if (res.ok){
                    
                    return res.json();
                }
            })
            .then((data)=>{
                
                if (data){
                    setWork({
                        position: data.position,
                        employer: data.employer,
                        location: data.location,
                        start_month: data.start_month,
                        start_year: data.start_year,
                        end_month: data.end_month,
                        end_year: data.end_year,
                        still_working: data.still_working
                    })
                }
            })*/
        }
       
    }, [resumeId, workId])

    const handleSubmit = async ()=>{
        const response = await axiosInstance.put(`/api/resumes/${resumeId}/work/${workId}`, workExperience)
        if (response.status === 200 || response.status === 201){
            const data = response.data
            const workId = data.id;
            navigate('/edit-description', {state: {id: resumeId, work: workId}})
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
        setWork((prev) =>({
            ...prev,
            [name]: type === "checkbox"? checked : value,

        }))
    }
    
  


    return(
        <div className="gridContainer">
            <div className="progression">

            </div>
            <div className="container3" style={{height: '100%'}}>
                <h3 className='h3'>Write your Contact information!</h3>
                <form onSubmit={(e) =>{
                    e.preventDefault();
                
                    handleSubmit();
                }}>
                    <div className="flexRow1">
                        <div>
                            <label htmlFor="position">Position</label><br/>
                            <input type="text"
                                id="position"
                                name="position"
                                value={workExperience.position}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="employer">Employer</label><br/>
                            <input type="text"
                                id="employer"
                                name="employer"
                                value={workExperience.employer}
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
                            value={workExperience.location}
                            onChange={handleChange}
                        ></input>
                    </div>
                    </div>
                    <div className="flexRow1">
                        
                        <div className="select-selected">
                            <label htmlFor="s_month">Start Month</label><br/>
                            <select  name="start_month" id="s_month" value={workExperience.start_month}  onChange={handleChange}>
                                <option value="">--Select--</option>

                                {months.map((month, index)=>(
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        
                        </div>
                        <div className="select-selected">
                       
                            <label htmlFor="s_year">Start Year</label><br/>
                            <select id="s_year" name="start_year" value={workExperience.start_year}  onChange={handleChange}>
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
                            <select name="end_month" id="e_month" value={workExperience.end_month}
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
                            <select id="e_year" name="end_year" value={workExperience.end_year}
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

                    <button className="button2" type="button"> &larr; <span>Back</span></button>
                    <button  className="button2" type="submit"><span>Next </span>&rarr;</button>
          
                    </div>
                </form>
                
            </div>
            <div className='resumePreview'>
                

            </div>
        </div>

    )

}
export default WorkEdit;