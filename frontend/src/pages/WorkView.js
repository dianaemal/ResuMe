import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import SideBar from './SideBar';
import { ResumeContext } from '../ResumeContext';
import Footer from '../components/Footer';
import '../CSS/FormStyles.css';

function WorkView() {
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [workExperiences, setWork] = useState([]);
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);
     const {setComplete} = useContext(ResumeContext)

    

    
    const fetchWork = () => {
        if (resumeId){
            setLoading(true);
            setErrorMessage(null);

            axiosInstance.get(`/api/resumes/${resumeId}/work`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    console.log(res)
                    const data = res.data || [];
                    setWork(data);
                    
                    if (data.length !== 0){
                        
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
            .catch((err)=>{
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
                console.error("Error fetching work data:", err)
            }) 
        

            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work`)
            .then((res)=>{
                if (res.ok){
                    return res.json();
                    
                }
            })
            .then((data)=>{
                if(data){
                    
                    setWork(data);
                    
                }
            })
            .catch((err)=> console.error("Error fetching education data:", err));*/
        }
    }
   
    const navigate = useNavigate();
   

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
             
            })
            .catch((err) => {
              // fallback: mark only work as complete if fetch fails
              setComplete(prev => ({ ...prev, workExperience: true }));
              console.error("Error fetching all resume data:", err);
            });
        }
      }, [resumeId, setComplete])
      useEffect(() => {
        fetchWork();
      }, [resumeId, setComplete]);


   
    const handleDelete = (id) =>{
        if (window.confirm('Are you sure you want to delete this work experience?')) {
            try{
                axiosInstance.delete(`/api/resumes/${resumeId}/work/${id}`)
                .then((res)=>{
                    if (res.status === 200 || res.status === 204){
                        setWork((prev)=>{
                            return prev.filter((work)=> work.id !== id)
        
                        })
                    }
                })
            } catch (error) {
                console.error("Error deleting work experience:", error);
            }
        }

    }

    const formatDateRange = (startMonth, startYear, endMonth, endYear, stillWorking) => {
        const start = startMonth && startYear ? `${startMonth} ${startYear}` : '';
        const end = stillWorking ? 'Current' : (endMonth && endYear ? `${endMonth} ${endYear}` : '');
        
        if (start && end) {
            return `${start} - ${end}`;
        } else if (start) {
            return stillWorking ? `${start} - Current` : start;
        } else if (end) {
            return end;
        }
        return '';
    };

    if (errorMessage) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load dashboard</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchWork} style={{marginTop: '12px'}}>Try Again</button>
            </div>
        );
    }
   
    
    return (
        <>

        
       <div className='gridContainer work-view-grid'
            >
            <div className='progression'> <SideBar/></div>
            <div className='container3'
                style={
                    {  
                        marginLeft: '0',
                        height: '100%',
                        backgroundColor: 'white',
                        overflow: 'scroll'
    
                    }
                }
            >
                <h3 className='h3' style={{textAlign: 'left'}}>Experience Summary</h3>

                <div className='contact-description' style={{textAlign: 'left', marginLeft: '0', maxWidth: '100%'}}>Start with your most recent experience and work your way back to your first job.</div>
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
                ) :(
                 <>

                {workExperiences.map((experience) => (
                    <div key={experience.id}
                        className="work-card"
                        style={{
                        border: '3px solid #667eea',
                        borderRadius: '10px',
                        marginTop: "20px",
                        padding: '25px',
                        
                        }}
                    >
                       <div
                        style={{
                            display: 'flex',

                        }}
                    >
                        <div 
                            style={
                                {
                                    lineHeight: '1',
                                   
                                }
                            }
                        >
                            <h5>
                                {experience.position && experience.employer ? 
                                    `${experience.position}, ${experience.employer}` :
                                    experience.position || experience.employer || 'Position/Employer'
                                }
                            </h5>
                            <p>
                                {[
                                    experience.location,
                                    formatDateRange(
                                        experience.start_month,
                                        experience.start_year,
                                        experience.end_month,
                                        experience.end_year,
                                        experience.still_working
                                    )
                                ].filter(Boolean).join(' | ')}
                            </p>
                            <div>
                                {experience.description && experience.description.description && (
                                    <div dangerouslySetInnerHTML={{ __html: experience.description.description }}/>
                                )}
                                <div style={{marginTop: '1px',
                                           
                                           
                                }}>
                                    <button
                                        className='button-underline'
                                        style={{
                                        
                                            fontSize: '1rem',
                                        }}
                                        
                                    onClick={()=>{
                                        // Check if description exists and has content
                                        const hasDescription = experience.description //&&
                                                              //experience.description.description && 
                                                             //experience.description.description.trim() !== '';
                                        
                                        if(hasDescription){
                                            navigate("/edit-description", {
                                                state: {
                                                  id: resumeId,
                                                  work: experience.id
                                                  
                                             }
                                            })
                                        }
                                        else{
                                            navigate('/work-description', {state: {id: resumeId, work: experience.id}})
                                        }

                                    }} 
                                    
                                    
                                    ><FontAwesomeIcon icon={faEdit}/><span className='button-underline-span' style={{marginLeft: '5px'}}>
                                        {(experience.description && experience.description.description && experience.description.description.trim() !== '') ? "Edit" : 'Add'} description
                                    </span></button>
                               </div>
                            </div>
                        </div>
                        <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: '10px', height: '40px'}}>

                           
                        
                            <button className='edit-button' onClick={()=> navigate("/edit-workExperience", {state: {id: resumeId, work: experience.id}})}><FontAwesomeIcon icon={faEdit}/></button>
                            
                            <button className='delete-button' onClick={()=> handleDelete(experience.id)}><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </div>
                </div>
                ))}
                <div
                style={{
                    border: '3px dashed #764ba2',
                    marginTop: '20px',
                    padding: '10px',
                    textAlign: 'center',
                }}
                >
                    <button
                        className='button-underline'
                        style={{
                            width: '300px',
                            fontSize: '1.1rem',
                        }}
                        
                        onClick={() => navigate("/Work-experienceForm", { state: { id: resumeId } })}
                    >
                        +<span className='button-underline-span'>Add a work experience</span>
                    </button>
                </div>

                {/* Navigation buttons */}
                <div className="buttonContainer" style={{ marginTop: '20px' }}>
                    <button className="button2" onClick={() => navigate('/education', { state: { id: resumeId } })}>
                        <span>&larr; Back</span>
                    </button>
                    <button className="button2" onClick={() => navigate('/skills', { state: { id: resumeId } })}>
                        <span>Next</span> &rarr;
                    </button>
                </div>
                </>
                )}
             </div>
        </div>
  
        </>
    )
}

export default WorkView;