import react from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../CSS/Resume.css'; 
import axiosInstance from "../axios";
import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Resume(){
    const location = useLocation();
    const navigate = useNavigate()
    const resumeId = location.state?.id || null;
    const resumeRef = useRef(null);
    console.log(resumeId)

    const[infoHover, setInfoHover] = useState(false)
    const [resumeData, setData] = useState(null);
    const [template, setTemplate] = useState('template1');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(()=>{
        if (!resumeId) return;

            axiosInstance.get(`/api/resumes/${resumeId}/all`)
            .then((res)=>{
                setData(res.data);
                console.log(res.data)
            })
            .catch((err)=> console.error("Error fetching education data:", err));

            // Fetch template data
            axiosInstance.get(`/api/resumes/${resumeId}`)
            .then((res)=>{
                setTemplate(res.data.template || 'template1');
            })
            .catch((err)=> console.error("Error fetching template data:", err));
       

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

    if (!resumeData) {
        return <p>Loading resume...</p>;
    }
    return(
       <div>
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
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResumeTemplateRenderer
                resume={resumeData}
                template={template}
                workList={resumeData.workExperience || []}
                educationList={resumeData.education || []}
                forwardedRef={resumeRef}
            />
        </div>
        </div>
    )
}
export default Resume;