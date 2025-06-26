import react, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import SideBar from './SideBar';
import { ResumeContext } from '../ResumeContext';

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
        
       <div className='gridContainer'
            style={
                { gridTemplateColumns: '0.5fr 3fr',}
            }
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
                <h3>Experience Summary</h3>

                <div>Enter your education experience so far, even if you are a current student or did not graduate.</div>
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
                    <ClipLoader color="rgb(94, 20, 132)" size={80} />
                    <div style={{ color: 'rgb(94, 20, 132)', fontWeight: 'bold' }}>Loading...</div>
                </div>
                ) : (
                 <>

                {workExperiences.map((experience) => (
                    <div key={experience.id}
                        style={{
                        border: '3px solid rgb(94, 20, 132)',
                        borderRadius: '10px',
                        marginTop: "20px",
                        padding: '25px',
                        backgroundColor: '#f2ddf7'
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
                                        className='button2'
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'none',
                                            color: 'rgb(94, 20, 132)',
                                            fontStyle: 'bold',
                                            width: '200px',
                                            textAlign: 'left',

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
                                    
                                    
                                    ><FontAwesomeIcon icon={faEdit}/><span style={{marginLeft: '5px'}}>{experience.description? "Edit" : 'Add'} discription</span></button>
                               </div>
                            </div>
                        </div>
                        <div style={{marginLeft: "auto",

                           
                        }}>
                            <button className='button3' style={{border: 'none',
                                backgroundColor: '#f2ddf7',
                                marginRight: '10px'}} onClick={()=> navigate("/edit-workExperience", {state: {id: resumeId, work: experience.id}})}><FontAwesomeIcon icon={faEdit}/></button>
                            
                            <button className='button3'
                                style={{border: 'none',
                                    backgroundColor: '#f2ddf7',
                                    
                                    
                                }}
                            
                            ><FontAwesomeIcon icon={faTrash}/></button>
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
                    <button
                        className='button2'
                        style={{
                        border: 'none',
                        backgroundColor: 'white',
                        color: 'rgb(94, 20, 132)',
                        fontStyle: 'bold',
                        width: '200px'
                        }}
                        onClick={() => navigate("/Work-experienceForm", { state: { id: resumeId } })}
                    >
                        +<span>Add a work experience</span>
                    </button>
                </div>

                {/* Navigation buttons */}
                <div className="buttonContainer" style={{ marginTop: '20px' }}>
                    <button className="button4" onClick={() => navigate('/education', { state: { id: resumeId } })}>Back</button>
                    <button style={{ marginLeft: 'auto' }} className="button4" onClick={() => navigate('/skills', { state: { id: resumeId } })}>Next</button>
                </div>
                </>
                )}
             </div>
        </div>
    )
}

export default WorkView;