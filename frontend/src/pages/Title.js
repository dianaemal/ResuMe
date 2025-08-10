import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../axios";
import '../CSS/Title.css';

function Title(){
    const location = useLocation();
    const resumeId = location.state?.id || null;
    const page = location.state?.page || null;
    
    const token = localStorage.getItem('access_token');
    let isExpired = false;
    try {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            isExpired = decodedToken.exp * 1000 < Date.now();
        }
    } catch (e) {
        // If token is invalid, treat as expired
        isExpired = true;
    }

    console.log("Token expired:", isExpired);   
    const [resumeTitle, setTitle] = useState("");
    const [errorMsg, setError] = useState("");
    const [validation, setvalidation] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if(resumeId){
            axiosInstance.get(`/api/resumes/${resumeId}`)
            .then((response)=>{
                setTitle(response.data.title || "")
            })
            .catch((error) => console.error('Error fetching resume:', error))
        }


    }, [resumeId]);
    
    const creatTitle = async () => {
        const api = resumeId ? `/api/resumes/${resumeId}` : `/api/resumes/`
        try{
            const response = resumeId ?  await axiosInstance.put(api, {title: resumeTitle})
            : await axiosInstance.post(api, {title: resumeTitle})
           
            const data = response.data
            console.log("Created resume:", data); // check structure

            if (page === 'dashboard'){
                navigate('/dashboard');
            }
            // Redirect to template selector for new resumes, or contact-info for existing ones
            else if (resumeId) {
                navigate(`/contact-info/`, {state: {id: data.id, page: 'title'}});
            } else {
                navigate(`/template-selector`, {state: {id: data.id, page: 'title'}});
            }
            console.log(data.id)
        }
        catch(error){
            console.error('Error creating/updating resume:', error);
        }
    }

    return(
        <div className="title-card-container">
            <div className="title-card">
                <h3 className="h3">Name Your Resume</h3>
                <p className="contact-description">Give your resume a clear, professional title. This helps you organize and find it later.</p>
                <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    if (!resumeTitle.trim()) {
                        setError("Please provide a title.");
                        setvalidation(false);
                        return;
                    }
                    setError("");
                    
                    creatTitle();
                }}>
                    <div className="flexRow1">
                        <div>
                            <label htmlFor="title">Resume Title</label><br/>
                            <input id="title" type="text"
                                name="title"
                                placeholder="e.g. Software Engineer Resume"
                                value={resumeTitle}
                                onChange= {(e) => setTitle(e.target.value)}
                                onMouseDown={() => setvalidation(true)}
                            />
                        </div>
                    </div>
                    {!validation && errorMsg && <span style={{color: 'red', fontSize: '0.9rem'}}>{errorMsg}</span>}
                    <div className="buttonContainer">
                        <div></div>
                        <button className="button2" type="submit"><span>Save</span></button>
                    </div>
                </form>
            </div>
            <div className="title-card-container">
            </div>          
        </div>
    )
}
export default Title;