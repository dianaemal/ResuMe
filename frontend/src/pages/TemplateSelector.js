import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import '../CSS/TemplateSelector.css';

function TemplateSelector() {
    const location = useLocation();
    const navigate = useNavigate();
    const resumeId = location.state?.id || null;
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
            name: 'Classic',
            description: 'Traditional and professional design with clean lines',
            preview: 'Classic serif fonts with blue accents'
        },
        {
            id: 'template2',
            name: 'Modern',
            description: 'Contemporary design with gradient backgrounds',
            preview: 'Sleek sans-serif with purple gradient'
        },
        {
            id: 'template3',
            name: 'Professional',
            description: 'Corporate style with bold typography',
            preview: 'Strong Arial fonts with dark borders'
        },
        {
            id: 'template4',
            name: 'Creative',
            description: 'Unique design with left border accents',
            preview: 'Helvetica with creative spacing'
        },
        {
            id: 'template5',
            name: 'Minimalist',
            description: 'Clean and simple with maximum readability',
            preview: 'Inter font with minimal styling'
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
            navigate('/contact-info/', { state: { id: resumeId } });
        } catch (error) {
            console.error('Error updating template:', error);
            // Even if update fails, navigate to resume page
            navigate('/resume', { state: { id: resumeId } });
        }
    };

    const handleSkip = () => {
        if (resumeId) {
            navigate('/resume', { state: { id: resumeId } });
        } else {
            navigate('/resume');
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
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
                            <div className="preview-header">
                                <h3>John Doe</h3>
                                <p>Software Engineer</p>
                            </div>
                            <div className="preview-section">
                                <h4>Experience</h4>
                                <p>Senior Developer at Tech Corp</p>
                            </div>
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <span className="preview-text">{template.preview}</span>
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
    );
}

export default TemplateSelector; 