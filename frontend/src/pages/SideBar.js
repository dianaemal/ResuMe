    
import React, { useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGraduationCap, faBriefcase, faLightbulb, faIdBadge, faCheck } from '@fortawesome/free-solid-svg-icons';
import ProgressSidebarStyles from '../components/ProgressSidebar.css';
import { ResumeContext } from "../ResumeContext";
import Footer from "../components/Footer";


export default function SideBar() {
    const { complete } = useContext(ResumeContext);
  
    const sections = [
        { key: 'contactInfo', label: 'Contact', icon: faPhone },
        { key: 'education', label: 'Education', icon: faGraduationCap },
        { key: 'workExperience', label: 'Work', icon: faBriefcase },
        { key: 'skills', label: 'Skills', icon: faLightbulb },
        { key: 'summary', label: 'Summary', icon: faIdBadge }
    ];
    // Find the first incomplete section as the current step
    const currentStep = sections.findIndex(section => !complete[section.key]);

    return (
        <>
        <nav className="progress-sidebar"  >
            
            <ul className="progress-sidebar-list"  >
                {sections.map((section, idx) => {
                    const isCompleted = complete[section.key];
                    const isCurrent = idx === currentStep || (currentStep === -1 && idx === sections.length - 1);
                    return (
                        <li
                       
                        style={{marginTop: '0px', marginBottom: '0px', lineHeight: '0px'}}
                            key={section.key}
                            className={`progress-sidebar-step${isCompleted ? ' completed' : ''}${isCurrent ? ' current' : ''}`}
                        >
                            <div className="progress-sidebar-circle-wrapper">
                            
                            {idx !== 0 && <div className="progress-sidebar-connector" style={{marginBottom: '0px'}} />}
                           
                                <span className="progress-sidebar-circle">
                                    {isCompleted ? (
                                        <FontAwesomeIcon icon={faCheck} />
                                    ) : (
                                        idx + 1
                                    )}
                                </span>
                                {idx !== sections.length - 1 && <div className="progress-sidebar-connector" style={{marginBottom: '0px'}} />}
                              
                               
                            </div>
                            <span className="progress-sidebar-label" >
                                <FontAwesomeIcon icon={section.icon} style={{ marginRight: '20px' }} />
                                {section.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
           
             
           {/* <div className="back-but ton siderbar-button" onClick={()=> navigator} > Go to Resume</div>*/}
            <div className="progress-sidebar-footer">
                <Footer />
            </div>
            
        </nav>

       
        
        
   
   </>
       
    );
}
