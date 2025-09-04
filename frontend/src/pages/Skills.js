import react from "react"
import { useState, useEffect,useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../axios";
import { ResumeContext } from "../ResumeContext";
import ResumePreview from "./ResumePreview";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { marked } from 'marked';



function Skills(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const [skills, setSkills] = useState("")
    const [skillsExit, setExist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [jobSearch, setJobSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const {resume, setResume} = useContext(ResumeContext)
    
    const handleSubmit = async ()=>{
        console.log(skills);
        const response = skillsExit? await axiosInstance.put(`/api/resumes/${resumeId}/skills`,{skills: skills} )
        : await axiosInstance.post(`/api/resumes/${resumeId}/skills`, {skills: skills})
        if (response.status === 201 || response.status === 200){
            navigate('/summary', {state: {id:resumeId}})
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/skills`, {
            method: skillsExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({skills})

        })
        if (response.ok){
            navigate('/summary', {state: {id:resumeId}})
        }*/
    }
    
    const fetchSkills = () => {
        setIsLoading(true);
        setErrorMessage(null);
        
        if (resumeId){
            axiosInstance.get(`/api/resumes/${resumeId}/skills`)
            .then((res)=>{
                if(res.status === 200 || res.status === 201){
                    if (res.data){
                        setExist(true)
                        setSkills(res.data.skills)
                    }
                    setIsLoading(false);
                }
            })
            .catch((error) =>{
                setIsLoading(false);
                if (error.code === 'ERR_NETWORK') {
                    setErrorMessage("Network error: Please check your internet connection and try again.");
                } else if (error.code === 'ECONNABORTED') {
                    setErrorMessage("Request timed out: The server is taking too long to respond. Please try again later.");
                } else if (error.response) {
                    if (error.response.status === 404) {
                        // 404 is expected for new resumes - no skills exist yet
                        setErrorMessage(null);
                        setExist(false);
                    } else {
                        setErrorMessage(`Failed to process your request: (status ${error.response.status}). Please try again later.`);
                    }
                } else if (error.message) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
                setExist(false)
                console.error('Error fetching resume:', error)
            });
        } else {
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        fetchSkills();
    }, [resumeId])
    
    useEffect(()=>{
        setResume((prev)=>({
            ...prev,
            skills: {skills}
        }))
    }, [skills])

    // Get skills from AI:
    const handleSkillSearch = async () => {
        if (!jobSearch.trim()) return;
        
        setIsSearching(true);

        const prompt = `
            You are a helpful assistant that specializes in resumes and job market skills.

            I am applying for a position as a ${jobSearch}. Please give me a list of 5-8 relevant, specific, and current skills that I can add to the Skills section of my resume.

            The skills should be technical or professional, depending on the role. Avoid soft skills unless they are highly valued in the field.

            Return the list in bullet point format and keep it short and concise.`
        
        // HuggingFace API call:
        try{
            const response = await axiosInstance.post(`/api/resumes/chat/`, 
                {message: prompt}
            );
            if (response.data && response.data.reply){
                const markdown = response.data.reply;
                const html = marked.parse(markdown); 

                const combinedHtml = skills
                    ? `${skills}<br><br><strong>AI Suggested Skills:</strong><br>${html}`
                    : html;
                setSkills(combinedHtml)
            }
        }
        catch(error){
            console.log("Error getting AI suggestions:", error)
            alert('Failed to get AI skill suggestions. Please try again.');
        }
        finally{
            setJobSearch("")
            setIsSearching(false)
        }
    };

    if (isLoading) {
        return (
            <div className="gridContainer">
                <div className="progression">
                    <SideBar prop={{page: 'skills'}}/>
                </div>
                <div className="container3">
                    <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="loading-spinner"></div>
                        <p>Loading skills information...</p>
                    </div>
                </div>
                <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                    <ResumePreview prop={{id:resumeId}}/>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            
            <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchSkills} style={{marginTop: '12px'}}>Try Again</button>
            </div>
               
        );
    }

    return (
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'skills'}}/>
            </div>
            <div className="container3">
                <h3 className="h3">Skills & Expertise</h3>
                <p className="contact-description">List your key skills and areas of expertise. Include both technical and soft skills that are relevant to your target position.</p>
                
                {/* AI Skill Search Bar */}
                <div className="AI-search-container" >
                    <div  className="AI-search-header">

                        <FontAwesomeIcon icon={faLightbulb} style={{ color: '#667eea', fontSize: '18px' }} />
                        <h4 className="h4" style={{fontSize: '16px', fontWeight: '600', margin: '0', color: '#333'}}>
                            Get AI-Powered Skill Suggestions
                        </h4>
                    </div>
                    <p className="contact-description" style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                        Enter a job title or role to get personalized skill recommendations
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            placeholder="e.g., Frontend Developer, Data Scientist, Project Manager..."
                            value={jobSearch}
                            onChange={(e) => setJobSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSkillSearch()}
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
                            onClick={handleSkillSearch}
                            disabled={isSearching || !jobSearch.trim()}
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
                                    Get Skills
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
            <ReactQuill 
                className="my-editor"
                value={skills}
                onChange={(value)=>{
                    if (value === '<p><br></p>'){
                        setSkills(null)
                    }
                    else{
                        setSkills(value)
                    }
                }
                } 
             />
             </div>

            <div className="buttonContainer">
                <button className="button2" type="button" onClick={ () => navigate("/work-experience", {state: {id:resumeId}})}> &larr; <span>Back</span></button>
                <button className="button2" type="submit"><span>Next</span> &rarr;</button>
            </div>
        </form>
            </div>
            <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                <ResumePreview prop={{id:resumeId}}/>
            </div>
        </div>
    )
}
export default Skills;