import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import "../CSS/ContactInfo.css"

function EducationView(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [educationList, setEducationList] = useState([]);
   
   
    useEffect(() =>{
        if (resumeId) {
            axiosInstance.get(`/api/resumes/${resumeId}/education`)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        if (res.data) {
                            setEducationList(res.data);
                        }
                    }
                })
                .catch((err) => console.error("Error fetching education data:", err));
        }
        
        }, [resumeId]);
            
 
           /* fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education`)
            .then((res)=>{
                if(res.ok){
                    
                    return res.json();
                }
               
                
            })
            .then((data)=>{
                if(data){
                    setEducationList(data);
                }
            })
            .catch((err)=> console.error("Error fetching education data:", err));*/
        
      
    console.log(educationList)
    const handleEdit = (educationId) =>{
        navigate('/edit-education', {state: {id: resumeId, E_id : educationId}});
        
    }
    const handleDelete = (educationId) =>{
        axiosInstance.delete(`/api/resumes/${resumeId}/education/${educationId}`)
        .then((res)=>{
            if (res.status === 200 || res.status === 201){
                setEducationList((prev)=> prev.filter((edu)=> edu.id !== educationId));
            }
        })
       /* fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if (res.ok){
                setEducationList((prev)=> prev.filter((edu)=> edu.id !== educationId));
            }
        })*/
    }

    
   
   
    
    const navigate = useNavigate();
   
    return (
        <div className='gridContainer'
            style={
                { gridTemplateColumns: '0.5fr 3fr',
                   
                }
            }
        
        >
          <div className='progression'></div>
          <div className='container3'
             style={
                {  marginTop: '0',
                    height: '100%',
                    backgroundColor: 'white'

                }
            }
          
          >
            <h3>Education Summary</h3>
            <div>Enter your education experience so far, even if you are a current student or did not graduate.</div>

              {educationList.map((education) => (
                <div 
                    style={
                        {
                            border: '3px solid rgb(94, 20, 132)',
                            borderRadius: '10px',
                            marginTop: "20px",
                            padding: '25px',
                            backgroundColor: '#f2ddf7'
                            
                        }
                    }
                
                key={education.id}>
                    <div
                        style={{
                            display: 'flex',

                        }}
                    >
                        <div
                            style={
                                {
                                    lineHeight: '0.2',
                                   
                                }
                            }
                        >
                            <h5>{education.school_name}</h5>
                            <p>{education.degree} in {education.study_feild}</p>
                            <p>{education.location}</p>
                            <p><small>{education.start_month}, {education.start_year} - {education.graduation_month}, {education.graduation_year}</small></p>
                       
                        </div>
                        <div style={{marginLeft: "auto",
                           
                        }}>
                            <button className='button3' style={{border: 'none',
                                backgroundColor: '#f2ddf7',
                                marginRight: '10px'
                            }}
                            onClick={() => handleEdit(education.id)}><FontAwesomeIcon icon={faEdit}/></button>
                            <button  className='button3'
                                style={{border: 'none',
                                    backgroundColor: '#f2ddf7',
                                    
                                    
                                }}
                            onClick={() => handleDelete(education.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
              ))}
          
            
            
            
              
            <div 
                style={{
                    border: '3px dashed rgb(94, 20, 132)',
                    marginTop: '20px',
                    padding: '10px',
                    textAlign: 'center',
                    
                }}
            >
            <button className='button2'
                style={{
                   border: 'none',
                   backgroundColor: 'white',
                   color: 'rgb(94, 20, 132)',
                   fontStyle: 'bold',
                   width: '200px'
                }} 
                onClick={() => navigate('/educationForm', { state: { id: resumeId } })}>
             +<span> Add Education</span>
            </button>
            </div>
            <div className="buttonContainer" style={{marginTop: '20px',}}>
            <button className="button4"  onClick={() => navigate('/contact-info/', { state: { id: resumeId } })} >
              Back
            </button>
            <button style={{ marginLeft: 'auto',}} className="button4" onClick={() => navigate('/work-experience', { state: { id: resumeId } })}  
            >
              Next
            </button>
            </div>
          </div>
        </div>
      )
    }
export default EducationView