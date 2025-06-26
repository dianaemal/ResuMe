import React, { useEffect } from "react";
import {useState, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faGraduationCap, faBriefcase, faLightbulb, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "@ramonak/react-progress-bar";
import { ResumeContext } from "../ResumeContext";
import "../CSS/ContactInfo.css"
import { Link } from "react-router-dom";

export default function SideBar({prop}){
   
    
    const {complete, setComplete} = useContext(ResumeContext)

   
   

     
    const totall = Object.keys(complete).length
    console.log(totall)
    const trueValues = Object.values(complete).filter(value => value === true)
    const length = trueValues.length
    const progress =Math.floor(( length / totall )* 100)
    
    

     
    return(
        <div className="side_container">
              <div >
                    {complete.contactInfo || prop ? 
                    (<Link className="link">
                    <FontAwesomeIcon style={{color: 'orange'}} className="icons " icon={faPhone} /> Contact Information
                    </Link>) : 
                    (<div>
                         <FontAwesomeIcon  className="icons " icon={faPhone} /> Contact Information
                    </div>)
                    
               }
                    
              </div>
              <div>
               {complete.education || prop? 
                   (<Link to="/"
                    className="link"
                   >
                   <FontAwesomeIcon style={{color: 'orange'}} className="icons" icon={faGraduationCap} /> Education
                    </Link>):
                    (<div>
                        <FontAwesomeIcon className="icons" icon={faGraduationCap} /> Education
                         </div>)
                    }
               </div>
               <div>
                    {complete.workExperience? 
                    <Link className="link">
                   <FontAwesomeIcon style={{color: 'orange'}} className="icons" icon={faBriefcase} /> Work History
                   </Link>:
                  ( <div>
                         <FontAwesomeIcon className="icons" icon={faBriefcase} /> Work History

                  </div>)

                    }
              </div>
              <div>
               {complete.skills? 
               (<Link className="link">
                   <FontAwesomeIcon style={{color: 'orange'}} className="icons" icon={faLightbulb} /> Skills
                   </Link>):
                   (<div>

                    <FontAwesomeIcon className="icons" icon={faLightbulb} /> Skills

                   </div>)
               }
              </div>
              <div>
               {complete.summary? 
               (<Link className="link">
          
                   <FontAwesomeIcon style={{color: 'orange'}} className="icons" icon={faIdBadge} /> Summary
                   </Link>):
                   (<div>

                  
                    <FontAwesomeIcon className="icons" icon={faIdBadge} /> Summary
                  
                   </div>)

               }
              </div>
              <div style={{ marginTop: '40px' }}>
                   <ProgressBar

                        completed={progress}
                        bgColor="orange"
                        height="12px"
                        labelAlignment="outside" />
              </div>
       </div>
      
    )
}