import react, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import SideBar from './SideBar';
import { ResumeContext } from '../ResumeContext';
import '../CSS/FormStyles.css';

function WorkView() {
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const [workExperiences, setWork] = useState([]);
    const [loading, setLoading] = useState(true)
     const {complete, setComplete} = useContext(ResumeContext)
    useEffect(() => {
        // Set a 3-second timer
        
        const timer = setTimeout(() => {
          setLoading(false);
        }, 600);
    
        // Cleanup
        return () => clearTimeout(timer);
      }, []);
    useEffect(()=>{
        if (resumeId){

            axiosInstance.get(`/api/resumes/${resumeId}/work`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    setWork(res.data)
                    
                   
                }
                if (res.data.length === 0){
                    setLoading(false)
                }
            })
            .catch((err)=>console.error("Error fetching education data:", err)) 
        

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
    }, [resumeId]);
   
    const navigate = useNavigate();
   

   useEffect(()=>{
        if(workExperiences.length > 0){
            setComplete((prev)=>{
                if(!complete.workExperience){
                    return {...prev, workExperience: true}
                }
                return prev
            })
        }
        else{
            setComplete((prev)=>{
                if(complete.workExperience){
                    return {...prev, workExperience: false}
                }
                return prev
            })
        }
   }, [workExperiences])
   
       
   
    
    return (
        
       <div className='gridContainer work-view-grid'
            >
            <div className='progression'> <SideBar/></div>
            <div className='container3'
                style={
                    {  marginTop: '0',
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
                ) : (
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
                            <h5>{experience.position}, {experience.employer}</h5>
                            <p>{experience.location} | {experience.start_month} {experience.start_year} - 
                            {experience.still_working ? "Current" : `${experience.end_month} ${experience.end_year}`}</p>
                            <div>
                                {experience.description && (
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
                                        if(experience.description){
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
                                    
                                    
                                    ><FontAwesomeIcon icon={faEdit}/><span className='button-underline-span' style={{marginLeft: '5px'}}>{experience.description? "Edit" : 'Add'} description</span></button>
                               </div>
                            </div>
                        </div>
                        <div style={{marginLeft: "auto",

                           
                        }}>
                            <button className='edit-button' onClick={()=> navigate("/edit-workExperience", {state: {id: resumeId, work: experience.id}})}><FontAwesomeIcon icon={faEdit}/></button>
                            
                            <button className='delete-button'><FontAwesomeIcon icon={faTrash}/></button>
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
    )
}

export default WorkView;