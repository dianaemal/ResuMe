import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import "../CSS/FormStyles.css"
import SideBar from './SideBar';
import { ResumeContext } from "../ResumeContext";
import ClipLoader from 'react-spinners/ClipLoader';
import Footer from '../components/Footer';
function EducationView(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);
    const {setComplete} = useContext(ResumeContext)
    const [flag, setFlag] = useState(false)



   
    const fetchEducation = () => {
        if (resumeId) {
            setLoading(true);
            setErrorMessage(null);
            
            axiosInstance.get(`/api/resumes/${resumeId}/education`)
                .then((res) => {
                    
                    if (res.status === 200 || res.status === 201) {
                        
                        const data = res.data || [];

                        setEducationList(data);
    
                        if (data.length !== 0) {
                            // If there's data, wait 3s before showing it
                            
                            const delay = setTimeout(() => {
                                setLoading(false);
                            }, 600);
    
                            return () => clearTimeout(delay);
                        } else {
                            const delay = setTimeout(() => {
                                setLoading(false);
                            }, 300);
                            return () => clearTimeout(delay);
                        }
                    }
                })
                .catch((err) => {
                    setLoading(false);
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
                    console.error("Error fetching education data:", err)
                });
        }
        
        }
        useEffect(() => {
            fetchEducation();
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
        
    
    const handleEdit = (educationId) =>{
        navigate('/edit-education', {state: {id: resumeId, E_id : educationId}});
        
    }
    const handleDelete = (educationId) =>{
        if (window.confirm('Are you sure you want to delete this education?')) {
            try{
                axiosInstance.delete(`/api/resumes/${resumeId}/education/${educationId}`)
                .then((res)=>{
                    if (res.status === 200 || res.status === 204){
                        setFlag(true)
                       
                        setEducationList((prev)=>{
                            return prev.filter((edu)=> edu.id !== educationId)
                        })
                    }
                })
            } catch (error) {
                console.error("Error deleting education:", error);
            }
        }
    }
    
      
       /* fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/education/${educationId}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if (res.ok){
                setEducationList((prev)=> prev.filter((edu)=> edu.id !== educationId));
            }
        })*/
    
    
            useEffect(() => {
                if (resumeId) {
                  axiosInstance.get(`/api/resumes/${resumeId}/all`)
                    .then(res => {
                      const data = res.data;
                      setComplete({
                        contactInfo: !!data.contactInfo,
                        education: data.education && data.education.length > 0,
                        workExperience: data.workExperience && data.workExperience.length > 0,
                        skills: !!data.skills,
                        summary: !!data.summary
                      });
                      setFlag(false)
                    })
                    .catch((err) => {
                      // fallback: mark only education as complete if fetch fails
                      setComplete(prev => ({ ...prev, education: true }));
                      console.error("Error fetching all resume data:", err);
                    });
                }
              }, [resumeId, setComplete, flag])


    
   
    
    
    const navigate = useNavigate();
    const formatDateRange = (startMonth, startYear, endMonth, endYear) => {
        const start = startMonth && startYear ? `${startMonth}, ${startYear}` : '';
        const end = endMonth && endYear ? `${endMonth}, ${endYear}` : '';
        return start && end ? `${start} - ${end}` : start || end;
      };

      if (errorMessage) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load dashboard</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchEducation} style={{marginTop: '12px'}}>Try Again</button>
            </div>
        );
    }
   
   
    return (
       
        <div className='gridContainer education-view-grid'
        
        >
          <div className='progression'> <SideBar /></div>
          <div className='container3' 
             style={
                { 
                    marginLeft: '0',
                    height: '100%',
                   

                }
            }
          
          >
            <h3 className='h3' style={{textAlign: 'left'}}>Education Summary</h3>
            <div className='contact-description' style={{textAlign: 'left', marginLeft: '0', maxWidth: '100%'}}>Enter your education experience so far, even if you are a current student or did not graduate.</div>
            {loading ? (
                    <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyItems: 'center',
                    gap: '10px',
                    marginTop: '20%'
                    }}
                >
                    <ClipLoader color="#667eea" size={80} />
                    <div style={{ color: '#667eea', fontWeight: 'bold' }}>Loading...</div>
                </div>
            ): (
                <>
                
            
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
                            <p>{education.degree} {education.study_feild && education.degree && "in" } {education.study_feild}</p>
                            <p>{education.location}</p>
                            <p><small>{formatDateRange(
                                education.start_month,
                                education.start_year,
                                education.graduation_month,
                                education.graduation_year
                                )}</small></p>
                                                    
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
                </>
                )}
         
             </div>

          
        </div>
     
     
    )
    }
export default EducationView