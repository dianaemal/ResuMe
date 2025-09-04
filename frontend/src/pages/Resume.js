import react from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../CSS/Resume.css'; 
import '../CSS/ResumeSidebar.css';
import axiosInstance from "../axios";
import { jwtDecode }  from "jwt-decode";
import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "../components/Footer";
import { faUser, faGraduationCap, faBriefcase, faLightbulb, faFileAlt, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Resume(){
    const location = useLocation();
    const navigate = useNavigate()
    const resumeId = location.state?.id || null;
    const resumeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
    console.log(resumeId)

    const token = localStorage.getItem('access_token')
    let decodedUserId = null;
    try {
        if (token) {
            const decode = jwtDecode(token)
            decodedUserId = decode.user_id
        }
    } catch (e) {
        console.warn('Invalid token, redirecting to login');
        navigate('/login');
    }
    
 

    //const[infoHover, setInfoHover] = useState(false)
    const [resumeData, setData] = useState(null);
    const [template, setTemplate] = useState('template1');
    const [user, setUser] = useState("")
    const [isSaving, setIsSaving] = useState(false);
    //const [activeSection, setActiveSection] = useState('contact');
   
    const fetchAll = () => {
        if (!resumeId) return;
        setLoading(true);
        setErrorMessage(null);
        
        // Fetch resume data        
        axiosInstance.get(`/api/resumes/${resumeId}/all`)
        .then((res)=>{
            setData(res.data);
            setLoading(false);
            console.log(res.data)
        })
        .catch((err)=> {
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
        
        // Fetch template data
        axiosInstance.get(`/api/resumes/${resumeId}`)
        .then((res)=>{
            setTemplate(res.data.template || 'template1');
            setUser(res.data.user)
        })
        .catch((err)=> console.error("Error fetching template data:", err));
    }

    useEffect(()=>{
        fetchAll();
    }, [resumeId])

    const handleTemplateChange = () => {
        navigate('/template-selector', { state: { id: resumeId } });
    };

    const handleTemplateUpdate = async (newTemplate) => {
        try {
            await axiosInstance.put(`/api/resumes/${resumeId}`, {
                template: newTemplate
            });
            setTemplate(newTemplate);
        } catch (error) {
            console.error('Error updating template:', error);
        }
    };
    console.log(resumeData)

    const navigateToSection = (sectionId) => {
       // setActiveSection(sectionId);
        
        // Navigate to the appropriate editing page based on section
        switch (sectionId) {
            case 'contact':
                navigate('/contact-info/', { state: { id: resumeId } });
                break;
            case 'summary':
                navigate('/summary', { state: { id: resumeId } });
                break;
            case 'education':
                navigate('/education', { state: { id: resumeId } });
                break;
            case 'experience':
                navigate('/work-experience', { state: { id: resumeId } });
                break;
            case 'skills':
                navigate('/skills', { state: { id: resumeId } });
                break;
            default:
                break;
        }
    };

    const saveToComputer = async () => {
        if (!resumeRef.current) return;
        
        setIsSaving(true);
        try {
            const resumeElement = resumeRef.current;
            // Temporarily modify the element for better capture
            const originalStyle = resumeElement.style.cssText;
            resumeElement.style.margin = '0';
            resumeElement.style.boxShadow = 'none';
            resumeElement.style.border = '1px solid #ddd';

            const canvas = await html2canvas(resumeElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: resumeElement.offsetWidth,
                height: resumeElement.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: resumeElement.offsetWidth,
                windowHeight: resumeElement.offsetHeight
            });

            // Restore original styles
            resumeElement.style.cssText = originalStyle;

            const imgData = canvas.toDataURL('image/png');
            // US Letter: 8.5in x 11in = 215.9mm x 279.4mm
            const pdf = new jsPDF('p', 'in', 'letter');
            const imgWidth = 8.5; // in
            const pageHeight = 11; // in
            const pxPerInch = 96; // browser default
            const imgHeight = (canvas.height * imgWidth * pxPerInch) / (canvas.width * pxPerInch);
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `${resumeData?.contactInfo?.f_name || 'Resume'}_${resumeData?.contactInfo?.l_name || 'Document'}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert('Error saving PDF. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner" style={{opacity: 0.4}}></div>
                <p style={{color: '#e11d48', fontWeight: 600}}>Unable to load</p>
                <p style={{fontSize: '14px', color: '#6b7280', marginTop: '6px'}}>{errorMessage}</p>
                <button className="create-first-btn" onClick={fetchAll} style={{marginTop: '12px'}}>Try Again</button>
            </div>
        );
    }

    // Define available sections based on resume data
    const sections = [
        { id: 'contact', label: 'Contact Info', icon: faUser },
        { id: 'summary', label: 'Summary',  icon: faFileAlt },
        { id: 'education', label: 'Education', icon: faGraduationCap },
        { id: 'experience', label: 'Experience', icon: faBriefcase },
        { id: 'skills', label: 'Skills', icon: faLightbulb }
    ];

    const isOwner = user === decodedUserId;

    return(
       <div className="resume-page-container">
        {/* Sidebar Navigation */} 
        {isOwner && 
        <div className="resume-sidebar">
            <div className="sidebar-header">
                <h3>Edit Sections</h3>
            </div>
            <nav className="sidebar-nav">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`sidebar-nav-item`}
                        onClick={() => navigateToSection(section.id)}
                    >
                        <FontAwesomeIcon icon={section.icon} className="sidebar-icon" />
                        <span>{section.label}</span>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </button>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button
                    className="sidebar-nav-item back-button"
                    onClick={() => navigate('/dashboard')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="sidebar-icon" />
                    <span>Back to Dashboard</span>
                </button>
            </div>
        </div> }

        {/* Main Content */}
        <div className="resume-main-content" style={{marginLeft: !isOwner && "30px"}}>
        { isOwner && 
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
               
            
                <button 
                    onClick={handleTemplateChange}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginRight: '10px'
                    }}
                >
                    Change Template
                </button>
                <button 
                    onClick={saveToComputer}
                    disabled={isSaving}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isSaving ? '#9ca3af' : '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginRight: '10px'
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save to Computer'}
                </button>
                <select 
                    value={template}
                    onChange={(e) => handleTemplateUpdate(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                    }}
                >
                    <option value="template1">Sidebar</option>
                    <option value="template2">Timeline</option>
                    <option value="template3">Modern Sidebar</option>
                    <option value="template4">Modern Single Column</option>
                    <option value="template5">Modern Elegant</option>
                </select>
            </div>}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResumeTemplateRenderer
                    resume={resumeData}
                    template={template}
                    workList={resumeData.workExperience || []}
                    educationList={resumeData.education || []}
                    forwardedRef={resumeRef}
                />
            </div>
            <Footer/>
        </div>
       
        </div>
    )
}
export default Resume;