import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import '../CSS/TemplateSelector.css';

function TemplatePreview({ id }) {
    // Larger, more accurate preview for each template
    if (id === 'template1') {
        // Sidebar
        return (
            <div className="preview-sidebar">
                <div className="sidebar-left">
                    <div className="sidebar-block sidebar-contact"></div>
                    <div className="sidebar-block sidebar-edu"></div>
                    <div className="sidebar-block sidebar-skills"></div>
                </div>
                <div className="sidebar-main">
                    <div className="sidebar-header">John Doe</div>
                    <div className="sidebar-title">Software Engineer</div>
                    <div className="sidebar-section sidebar-exp"></div>
                    <div className="sidebar-section sidebar-exp2"></div>
                </div>
            </div>
        );
    } else if (id === 'template2') {
        // Timeline
        return (
            <div className="preview-timeline" >
                <div className="timeline-sidebar">
                    <div className="timeline-dot"></div>
                    <div className="timeline-dot timeline-dot2"></div>
                </div>
                <div className="timeline-main">
                    <div className="timeline-header">John Doe</div>
                    <div className="timeline-title">Software Engineer</div>
                    <div className="timeline-section timeline-exp"></div>
                    <div className="timeline-section timeline-exp2"></div>
                </div>
            </div>
        );
    } else if (id === 'template3') {
        // Modern Sidebar
        return (
            <div className="preview-modern-sidebar">
                <div className="modern-sidebar-left"></div>
                <div className="modern-sidebar-main">
                    <div className="modern-sidebar-header">John Doe</div>
                    <div className="modern-sidebar-title">Software Engineer</div>
                    <div className="modern-sidebar-section modern-exp"></div>
                    <div className="modern-sidebar-section modern-exp2"></div>
                </div>
            </div>
        );
    } else if (id === 'template4') {
        // Modern Single Column
        return (
            <div className="preview-single-column">
                <div className="single-header">John Doe</div>
                <div className="single-title">Software Engineer</div>
                <div className="single-section single-exp"></div>
                <div className="single-section single-exp2"></div>
            </div>
        );
    } else if (id === 'template5') {
        // Modern Elegant
        return (
            <div className="preview-elegant">
                <div className="elegant-header">John Doe</div>
                <div className="elegant-title">Software Engineer</div>
                <div className="elegant-section elegant-exp"></div>
                <div className="elegant-section elegant-exp2"></div>
            </div>
        );
    }
    return null;
}

function TemplateSelector() {
    const location = useLocation();
    const navigate = useNavigate();
    const resumeId = location.state?.id || null;
    const page = location.state?.page || null;
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('TemplateSelector: resumeId =', resumeId);
        if (resumeId) {
            setIsLoading(true);
            console.log('TemplateSelector: Fetching resume data...');
            axiosInstance.get(`/api/resumes/${resumeId}`)
                .then((res) => {
                    console.log('TemplateSelector: Resume data received:', res.data);
                    setResumeData(res.data);
                    setSelectedTemplate(res.data.template || 'template1');
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("TemplateSelector: Error fetching resume", err);
                    // Even if the API call fails, we can still show the template selector
                    setIsLoading(false);
                });
        } else {
            // No resumeId, but we can still show template selector
            console.log('TemplateSelector: No resumeId, showing template selector anyway');
            setIsLoading(false);
        }
    }, [resumeId]);

    const templates = [
        {
            id: 'template1',
            name: 'Sidebar',
            description: 'Two-column layout with a left sidebar for contact, education, and skills.',
            
        },
        {
            id: 'template2',
            name: 'Timeline',
            description: 'Timeline style with a colored sidebar and clear sectioning.',
            
        },
        {
            id: 'template3',
            name: 'Modern Sidebar',
            description: 'Modern two-column layout with blue accents and clean lines.',
            
        },
        {
            id: 'template4',
            name: 'Modern Single Column',
            description: 'Clean, modern, single-column layout with all sections stacked.',
            
        },
        {
            id: 'template5',
            name: 'Modern Elegant',
            description: 'Elegant, single-column with a colored header and gradient accent.',
            
        }
    ];

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const handleSave = async () => {
        if (!resumeId) {
            // If no resumeId, just navigate to resume page
            navigate('/resume');
            return;
        }

        try {
            await axiosInstance.put(`/api/resumes/${resumeId}`, {
                template: selectedTemplate,
                title: resumeData.title,
                id: resumeId
            });
            if (page === 'title') {
                navigate('/contact-info/', { state: { id: resumeId } });
            } else {
                navigate('/resume', { state: { id: resumeId } });
            }
        } catch (error) {
            console.error('Error updating template:', error);
            // Even if update fails, navigate to resume page
            navigate('/resume', { state: { id: resumeId } });
        }
    };

    const handleSkip = () => {
        if (page === 'title') {
            navigate('/contact-info/', { state: { id: resumeId } });
        } else {
            navigate('/resume', { state: { id: resumeId } });
        }
       
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
        <div className="template-selector">
            <div className="template-header">
                <h1>Choose Your Resume Template</h1>
                <p>Select a template that best represents your professional style</p>
            </div>

            <div className="templates-grid">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                       <div className={`template-preview ${template.id}`}>
                            <TemplatePreview id={template.id} />
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            
                        </div>
                    </div>
                ))}
            </div>

            <div className="template-actions">
                <button className="btn-secondary" onClick={handleSkip}>
                    Skip for now
                </button>
                <button className="btn-primary" onClick={handleSave}>
                    Use This Template
                </button>
            </div>
            
        </div>
        <footer style={{textAlign: 'center', marginTop: '20px'}}>© 2025 ResuMe. All rights reserved.</footer>
        </>
    );
}

export default TemplateSelector; 