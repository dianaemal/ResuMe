import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import "../CSS/FormStyles.css"
import SideBar from './SideBar';
import { ResumeContext } from "../ResumeContext";
function EducationView(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [educationList, setEducationList] = useState([]);
    const {complete, setComplete} = useContext(ResumeContext)

   
   
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
        
      
    let flag = false
    const handleEdit = (educationId) =>{
        navigate('/edit-education', {state: {id: resumeId, E_id : educationId}});
        
    }
    const handleDelete = (educationId) =>{
        axiosInstance.delete(`/api/resumes/${resumeId}/education/${educationId}`)
        .then((res) => {
            if (res.status === 200 || res.status === 204) {
                setEducationList((prev) => {
                    if (prev.length === 1) {
                        flag = true;
                    }
                    return prev.filter((edu) => edu.id !== educationId);
                }); 
            }
        });
      
       /* fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if (res.ok){
                setEducationList((prev)=> prev.filter((edu)=> edu.id !== educationId));
            }
        })*/
    }
    /* since this page doest have a resume preview, we will have to update the complete object seperatly:*/
    useEffect(() => {
        if (educationList.length > 0) {
            setComplete(prev => {
                if (!prev.education) {
                    return { ...prev, education: true };
                }
                return prev;
            });
        } else {
            setComplete(prev => {
                if (prev.education) {
                    return { ...prev, education: false };
                }
                return prev;
            });
        }
    }, [educationList]);
   

    
   
   
    
    const navigate = useNavigate();
   
    return (
        <div className='gridContainer education-view-grid'
        
        >
          <div className='progression'> <SideBar /></div>
          <div className='container3'
             style={
                {  marginTop: '0',
                    height: '100%',
                   

                }
            }
          
          >
            <h3 className='h3' style={{textAlign: 'left'}}>Education Summary</h3>
            <div className='contact-description' style={{textAlign: 'left', marginLeft: '0', maxWidth: '100%'}}>Enter your education experience so far, even if you are a current student or did not graduate.</div>

              {educationList && educationList.map((education) => (
                <div 
                    className="education-card"
                    style={
                        {
                            border: '3px solid  #667eea  ',
                            borderRadius: '10px',
                            marginTop: "20px",
                            padding: '25px',
                            backgroundColor: 'white'
                            
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
                              <button className='edit-button'
                             onClick={() => handleEdit(education.id)}><FontAwesomeIcon icon={faEdit}/></button>
                             <button  className='delete-button'
                                 
                                 onClick={()=> handleDelete(education.id)}
                             ><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
              ))}
          
            
            
            
              
            <div 
                style={{
                    border: '3px dashed  #764ba2 ',
                    marginTop: '20px',
                    padding: '10px',
                    textAlign: 'center',
                    
                }}
            >
                    <button className='button-underline'
                 
                 onClick={() => navigate('/educationForm', { state: { id: resumeId } })}>
              + <span className='button-underline-span'>Add Education</span>
              </button>
            </div>
            <div className="buttonContainer" style={{marginTop: '20px',}}>
                         <button className="button2" 
             onClick={() => navigate('/contact-info', { state: { id: resumeId } })} >
              <span>&larr; Back</span>
              </button>
             <button  className="button2" onClick={() => navigate('/work-experience', { state: { id: resumeId } })}  
             >
              <span>Next</span> &rarr;
              </button>
            </div>
          </div>
        </div>
      )
    }
export default EducationView