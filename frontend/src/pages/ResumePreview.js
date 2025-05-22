
import {useEffect, useState} from "react";


export default function ResumePreview({contactInfo}){
    const resumeData = {
        contactInfo,
        

        
        
        
        
      };

      return(
        <div
         style={{
            transform: 'scale(0.5)',      // Shrink it down to 30%
            transformOrigin: 'top left',// So it scales from top-left
            width: 'fit-content',
            height: '100%',
            
            
          }}> 
        
        <div class="main_container"
           
        >
            <div>
            <h1>{resumeData.contactInfo?.f_name} {resumeData.contactInfo?.l_name} </h1>
            
            <p  id="info">{resumeData.contactInfo?.city}, {resumeData.contactInfo?.province}, {resumeData.contactInfo?.postal_code} 
                 | {resumeData.contactInfo?.email} | {resumeData.contactInfo?.phone_number}
            </p>
            </div>
            {resumeData.summary &&
              <div class="infoBox">
            
              <h3>Objective</h3>
              <hr></hr>
              <p>{resumeData.summary.summary}</p>
              </div> 
            }
            
            {resumeData.education && 
              <div class="infoBox">
              <h3>Education</h3>
              <hr></hr>
              <p>{resumeData.education.map((edu, index)=>(
                  <p key = {index}>
                      
                      
                      <span class="strong">{edu.school_name} </span> <span  class="float strong">{edu.location}</span><br></br>
                      <span class="italic">{edu.degree} in {edu.study_feild} </span>
                      <span class="float italic">{edu.start_month}, {edu.start_year} - {edu.graduation_month}, {edu.graduation_year}</span>
                  </p>
              
  
              ))}</p>
              </div>
            }
            
            {resumeData.workExperience &&
              <div class="infoBox">
           
              <h3>Work Experience</h3>
              <hr></hr>
              <div>{resumeData.workExperience.map((work, index)=>(
                  <p key = {index}>
                      
                      
                      <span class="strong">{work.employer}</span> <span class="float strong">{work.location}</span><br></br>
                      
                      <span class="italic">{work.position}</span>
                      <span class="float italic" >{work.start_month}, {work.start_year} - {work.end_month}, {work.end_year}</span>
                      <ul>
                          {work.description?.description.split("\n").map((exp, index)=>(
                              <li key={index}>{exp}</li>
                          ))}
                      </ul>
                  </p>
                ))}</div>
               </div>
            }
            {resumeData.skills && 
              <div class="infoBox">
              <h3>Skills</h3>
              <hr></hr>
              <p>
                {resumeData.skills?.skills.split("\n").map((skill, i)=>(
                    <li key ={i}>{skill}</li>
                ))}
              </p>
              </div>

            }
            
             

        </div>
        </div>
            
    )
}

      
