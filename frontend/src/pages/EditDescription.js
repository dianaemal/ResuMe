import react from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ReactQuill from 'react-quill';
import ResumePreview from './ResumePreview';
import 'react-quill/dist/quill.snow.css';
import "../CSS/FormStyles.css";
import SideBar from './SideBar';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';


function EditDescription(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const workId = location.state?.work || null;
   
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const [jobTitle, setJobTitle] = useState(null);



    
    const [workDescription, setDescription] = useState(null);
    console.log(workDescription)

    const fetchDescription = () => {
        setIsLoading(true);
        setErrorMessage(null);

        if (resumeId && workId){
            axiosInstance.get(`/api/resumes/${resumeId}/work/${workId}/description`)
            .then((res)=>{
                if (res.status === 200 || res.status === 201){
                    if (res.data){
                        setDescription(res.data.description);
                    }
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.status === 404){
                    // No description yet is expected
                    setErrorMessage(null);
                    setDescription(null);
                } else if (error.code === 'ERR_NETWORK') {
                    setErrorMessage("Network error: Please check your internet connection and try again.");
                } else if (error.code === 'ECONNABORTED') {
                    setErrorMessage("Request timed out: The server is taking too long to respond. Please try again later.");
                } else if (error.response) {
                    setErrorMessage(`Failed to process your request: (status ${error.response.status}). Please try again later.`);
                } else if (error.message) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
                console.error('Error fetching resume:', error)
            });
        } else {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchDescription();
    }, [resumeId, workId])
    

    const handleSubmit = async()=>{

        //if (!workDescription){
          //  navigate(`/work-experience`, { state: { id: resumeId } });
         //   return
        //}
        console.log(workDescription)
        try{
            const response = await axiosInstance.put(`/api/resumes/${resumeId}/work/${workId}/description`, { description: workDescription })
        
            if (response.status === 200 || response.status === 201){
                navigate(`/work-experience`, { state: { id: resumeId } });
            }
        }
       catch(err){
            console.log(err)
       }
    }
    const navigate = useNavigate();

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['undo', 'redo'],
        ],
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      };

      const handleJobDescriptionSearch = async()=>{
        if (!jobTitle?.trim()) return;
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

    if (isLoading) {
        return (
            <div className='gridContainer'>
                <div className='progression'>
                    <SideBar prop={{page: 'work'}}/>
                </div>
                <div className='container3'>
                    <div className="dashboard-loading" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="loading-spinner"></div>
                        <p>Loading job description...</p>
                    </div>
                </div>
                <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                    <ResumePreview prop={{description: workDescription, identity: 'exp', workId: workId, id:resumeId}}/>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchDescription} style={{marginTop: '12px'}}>Try Again</button>
            </div>
        );
    }

    return (
       <div className='gridContainer'>
                   <div className='progression'>
                       <SideBar prop={{page: 'work'}}/>
                   </div>
               <div className='container3'>
               <h3 className="h3">Edit Job Description</h3>
               <p className="contact-description">Update your job description with your responsibilities, achievements, and key contributions in this role.</p>

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
                            value={jobTitle}
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
                       
                       
                       value={workDescription}
                       onChange={(value)=> {
                           if (value === '<p><br></p>'){
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
                       <button className="button2" type="submit"><span>Save</span> &rarr;</button>
                   </div>
               </form>
      
               </div>
               <div className="container4" onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
                   <ResumePreview prop={{description: workDescription, identity: 'exp', workId: workId, id:resumeId}}/>
               </div>
               </div>
           )
       
}
export default EditDescription;
