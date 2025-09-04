import react from "react"
import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResumePreview from "./ResumePreview";
import { ResumeContext } from "../ResumeContext";
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';


function Summary(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const navigate = useNavigate();
    const {resume, setResume} = useContext(ResumeContext)
    const [summary, setSummary] = useState(null)
    const [summaryExit, setExist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const [jobSearch, setJobSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSubmit = async ()=>{
        const response = summaryExit? await axiosInstance.put(`/api/resumes/${resumeId}/summary`, {summary: summary})
        : await axiosInstance.post(`/api/resumes/${resumeId}/summary`, {summary: summary})
        if (response.status === 201 || response.status === 200){
            navigate('/resume', {state: {id:resumeId}})
        }
        /*const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/summary`, {
            method: summaryExit? 'PUT': 'POST',
            headers:{
                "Content-Type": "application/json"
                },
            body: JSON.stringify({summary})

        })
        if (response.ok){
            navigate('/resume', {state: {id:resumeId}})
        }*/
    }
    
    const fetchSummary = () => {
        setIsLoading(true);
        setErrorMessage(null);
        
        if (resumeId){
            axiosInstance.get(`/api/resumes/${resumeId}/summary`)
            .then((res)=>{
                if(res.status === 200 || res.status === 201){
                    if (res.data){
                        setExist(true)
                        setSummary(res.data.summary)
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
                        // 404 is expected for new resumes - no summary exists yet
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
        fetchSummary();
    }, [resumeId])
    
    useEffect(()=>{
        setResume((prev)=>({
            ...prev,
            summary: {summary}
    }))

    },[summary])

    const handleSummarySearch = async()=>{
        if (!jobSearch.trim()) return;
        setIsSearching(true);
        const prompt = `
            You are a helpful assistant that writes clear and professional resume summaries.
            Based on the job title "${jobSearch}", generate a 2–3 sentence professional summary suitable for the top of a resume.
            The summary should:
            - Highlight relevant strengths, experience, or qualities
            - Use confident, clear language
            - Be tailored for someone seeking a role as a ${jobSearch}
            - Avoid generic phrases and focus on job-relevant impact
            If the role is technical, include technical focus. If the role is leadership-focused, emphasize management or strategy.
            Keep it concise and powerful. Give only one summary.
            `
        try{
            const response = await axiosInstance.post(`/api/resumes/chat/`, {message: prompt})
            if (response.data?.reply){
                const markdown = response.data.reply;
                const html = marked.parse(markdown);
                const combinedHtml = summary ? `${summary}<br><br><strong>AI Suggested Summary:</strong><br>${html}` : html;
                setSummary(combinedHtml);
            }
        }
        catch(error){   
            console.error('Error fetching summary:', error);
        }
        finally{
            setJobSearch("");
            setIsSearching(false);
        }
    }

    if (isLoading) {
        return (
            <div className="gridContainer">
                <div className="progression">
                    <SideBar prop={{page: 'summary'}}/>
                </div>
                <div className="container3">
                    <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="loading-spinner"></div>
                        <p>Loading summary information...</p>
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
                <button className="create-first-btn" onClick={fetchSummary} style={{marginTop: '12px'}}>Try Again</button>
            </div>
                   
        )
    }

    return (
        <div className="gridContainer">
            <div className="progression">
                <SideBar prop={{page: 'summary'}}/>
            </div>
            <div className="container3">
                <h3 className="h3">Professional Summary</h3>
                <p className="contact-description">Write a compelling summary that highlights your key qualifications, experience, and career objectives. This is often the first thing employers read.</p>
                 {/* AI Skill Search Bar */}
                 <div className="AI-search-container" >
                    <div  className="AI-search-header">

                        <FontAwesomeIcon icon={faLightbulb} style={{ color: '#667eea', fontSize: '18px' }} />
                        <h4 className="h4" style={{fontSize: '16px', fontWeight: '600', margin: '0', color: '#333'}}>
                            Get AI-Powered Summary Suggestions
                        </h4>
                    </div>
                    <p className="contact-description" style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                        Enter a job title or role to get personalized summary suggestions
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
                            onClick={handleSummarySearch}
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
                                    Get Summary
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
               
                value={summary}
                onChange={(value)=> {
                    if (value === '<p><br></p>'){
                        setSummary(null)
                    }
                    else{
                        setSummary(value)
                    }
                }
                }
             />
             </div>

            <div className="buttonContainer">
                <button className="button2" type="button" onClick={ () => navigate("/skills", {state: {id:resumeId}})}> &larr; <span>Back</span></button>
                <button className="button2" type="submit"><span>Next</span> &rarr;</button>
            </div>
        </form>
            </div>
            <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})} >
                <ResumePreview prop={{id:resumeId}}/>
            </div>
        </div>
    )
}
export default Summary;