import React from 'react';
import {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResumePreview from './ResumePreview';
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';



function WorkDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
    const [workDescription, setDescription] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
  
    


    
    const handleSubmit = async()=>{
        // If no workId, just navigate to next page
        
        if (!workId) {
            navigate(`/work-experience`, { state: { id: resumeId } });
           
            return;
        }
        
        // If no description, just navigate to next page
        if (!workDescription || workDescription.trim() === '') {
            navigate(`/work-experience`, { state: { id: resumeId } });
            
            return;
        }
       

        try {
            
            const response = await axiosInstance.post(`/api/resumes/${resumeId}/work/${workId}/description`, { description: workDescription })
            
            if (response.status === 200 || response.status === 201){
                
                navigate(`/work-experience`, { state: { id: resumeId } });
            }
        } catch (error) {
            console.error("Error saving work description:", error);
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/work/${workId}/description`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({ description: workDescription })
        })
        if(response.ok){
            
            navigate(`/work-experience`, { state: { id: resumeId } });
        }*/
        
    }
    const navigate = useNavigate();

    const description = "I am a software engineer with a passion for building scalable and efficient systems. I have experience with a variety of programming languages and frameworks, including Python, JavaScript, and React. I am a quick learner and I am always looking for new challenges and opportunities to grow."
    const handleGenerate = () => {
        setTimeout(() => {
            if(workDescription === null){
                setDescription(description)
            }
            else{
                setDescription(workDescription + "\n\n" + description)
            }
        }, 2000)
    }

    const handleJobDescriptionSearch = async()=>{
        if (!jobTitle.trim()) return;
        setIsSearching(true);
        const prompt = `
           You are a helpful assistant knowledgeable about job roles and career descriptions.
           Please provide a concise list of 3-4 major duties and responsibilities for the role of a ${jobTitle}. 
           Return the job description as a bullet point list of key duties people perform in this role.
           Make it clear, professional, short and concise. The duties should be in the past tense.`
        try{
            const response = await axiosInstance.post(`/api/resumes/chat/`, {message: prompt})
            if (response.data?.reply){
                const markdown = response.data.reply;
                const html = marked.parse(markdown);
                const combinedHtml = workDescription ? `${workDescription}<br><br><strong>AI Suggested Job Description:</strong><br>${html}` : html;
                setDescription(combinedHtml);
            }
        }
        catch(error){
            console.error('Error fetching job description:', error);
        }
        finally{
            setJobTitle("");
            setIsSearching(false);
        }
    }
    



    return (
        <div className='gridContainer'>
            <div className='progression'>
                <SideBar prop={{page: 'work'}}/>
            </div>
            <div className='container3'>
                <h3 className="h3">Job Description</h3>
                <p className="contact-description">Describe your responsibilities, achievements, and key contributions in this role. Use action verbs and quantify your accomplishments when possible.</p>
                {/* AI Skill Search Bar */}
                <div className="AI-search-container" >
                    <div  className="AI-search-header">

                        <FontAwesomeIcon icon={faLightbulb} style={{ color: '#667eea', fontSize: '18px' }} />
                        <h4 className="h4" style={{fontSize: '16px', fontWeight: '600', margin: '0', color: '#333'}}>
                            Get AI-Powered Job Description Suggestions
                        </h4>
                    </div>
                    <p className="contact-description" style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                        Enter a job title or role to get personalized job description suggestions
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            placeholder="e.g., Frontend Developer, Data Scientist, Project Manager..."
                            value={jobTitle || ""}
                            onChange={(e) => setJobTitle(e.target.value)}
                            
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: '1.5px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleJobDescriptionSearch}
                            disabled={isSearching}
                            style={{
                                padding: '12px 20px',
                                background: isSearching ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: isSearching ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isSearching ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid #fff',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faSearch} />
                                    Get Job Description
                                </>
                            )}
                        </button>
                       
                    </div>
                </div>

                <form className="form" onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                }}>
                
            <div style={{marginTop: '20px'}}>
            <ReactQuill className="my-editor"
                
                
                value={workDescription || ""}
                onChange={(value)=> {
                    // ReactQuill returns HTML content
                    if (value === '<p><br></p>' || value === '<p></p>' || value === ''){
                        setDescription(null)
                    }
                    else{
                        setDescription(value)
                    }
                }}
                    
                    
            />
            </div>
            <div className="buttonContainer">
                <div></div>
                <button className="button2" type="submit"><span>Next</span> &rarr;</button>
            </div>
        </form>
            </div>
            <div className="container4" >
                <ResumePreview prop={{description: workDescription, identity: 'exp', workId: workId, id:resumeId}}/>
            </div>
        </div>
    )
}
export default WorkDescription;
