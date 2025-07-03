import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { jwtDecode }  from "jwt-decode";
import '../CSS/Dashboard.css';

export default function Dashboard(){
    const navigate = useNavigate()
    const [allResumes, setAll] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('access_token')
    const decode = jwtDecode(token)
    console.log(decode)

    useEffect(()=>{
        setIsLoading(true);
        axiosInstance.get(`api/resumes/`)
        .then((res)=>{
            if (res.status === 200 || res.status === 201){
                console.log(res.data)
                setAll(res.data)
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.error('Error fetching resumes:', err);
            setIsLoading(false);
        })
    }, [])

    const handleCreateResume = () => {
        navigate('/title');
    };

    const handleViewResume = (resumeId) => {
        navigate('/resume', { state: { id: resumeId } });
    };

    const handleDeleteResume = async (resumeId) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                await axiosInstance.delete(`/api/resumes/${resumeId}`);
                // Refresh the resume list
                const res = await axiosInstance.get(`api/resumes/`);
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data)
                    setAll(res.data);
                }
            } catch (error) {
                console.error('Error deleting resume:', error);
            }
        }
    };

    const getTemplateDisplayName = (template) => {
        const templateNames = {
            'template1': 'Classic',
            'template2': 'Modern', 
            'template3': 'Professional',
            'template4': 'Creative',
            'template5': 'Minimalist'
        };
        return templateNames[template] || 'Classic';
    };

    const getTemplateColor = (template) => {
        const colors = {
            'template1': '#3498db',
            'template2': '#667eea',
            'template3': '#34495e',
            'template4': '#666',
            'template5': '#1a1a1a'
        };
        return colors[template] || '#3498db';
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your resumes...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-welcome">
                    <h1>Welcome back!</h1>
                    <p>Manage and create your professional resumes</p>
                </div>
                <button 
                    className="create-resume-btn"
                    onClick={handleCreateResume}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create New Resume
                </button>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-number">{allResumes.length}</div>
                    <div className="stat-label">Total Resumes</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        {allResumes.filter(resume => resume.user === decode.user_id).length}
                    </div>
                    <div className="stat-label">Your Resumes</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="stat-label">Today</div>
                </div>
            </div>

            <div className="resumes-section">
                <div className="section-header">
                    <h2>Your Resumes</h2>
                    <p>All your professional resumes in one place</p>
                </div>

                {allResumes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10,9 9,9 8,9"></polyline>
                            </svg>
                        </div>
                        <h3>No resumes yet</h3>
                        <p>Create your first professional resume to get started</p>
                        <button 
                            className="create-first-btn"
                            onClick={handleCreateResume}
                        >
                            Create Your First Resume
                        </button>
                    </div>
                ) : (
                    <div className="resumes-grid">
                        {allResumes.map((resume, index) => (
                            <div 
                                key={index} 
                                className="resume-card"
                            >
                                <div className="resume-card-header">
                                    <div className="resume-info">
                                        <h3>{resume.title}</h3>
                                        <div className="resume-meta">
                                            <span 
                                                className="template-badge"
                                                style={{ backgroundColor: getTemplateColor(resume.template) }}
                                            >
                                                {getTemplateDisplayName(resume.template)}
                                            </span>
                                            <span className="resume-date">
                                                Created: {resume.date_added && !isNaN(new Date(resume.date_added)) 
                                                    ? new Date(resume.date_added).toLocaleDateString() 
                                                    : 'N/A'}
                                            </span>
                                            <span className="resume-date" style={{marginLeft: '10px'}}>
                                                Last Updated: {resume.date_updated && !isNaN(new Date(resume.date_updated))
                                                    ? new Date(resume.date_updated).toLocaleDateString()
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    {resume.user === decode.user_id && (
                                        <div className="resume-actions">
                                            <button 
                                                className="action-btn view-btn"
                                                onClick={() => handleViewResume(resume.id)}
                                                title="View Resume"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </button>
                                            <button 
                                                className="action-btn delete-btn"
                                                onClick={() => handleDeleteResume(resume.id)}
                                                title="Delete Resume"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3,6 5,6 21,6"></polyline>
                                                    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="resume-card-footer">
                                    <div className="resume-stats">
                                        <span className="stat">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            Contact Info
                                        </span>
                                        <span className="stat">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                            </svg>
                                            Education
                                        </span>
                                        <span className="stat">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                            Experience
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}