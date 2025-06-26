
import {useEffect, useState, useContext} from "react";
import axiosInstance from "../axios";
import { ResumeContext } from '../ResumeContext';


export default function ResumePreview({prop}){
 

  const {resume, setResume, setComplete} = useContext(ResumeContext)
  const [temp, setTemp] = useState("1")
  const resumeId = prop.id

     useEffect(() => {
      if (resumeId){
        axiosInstance.get(`/api/resumes/${resumeId}/all`)
          .then((res) => {
            if (res.status === 200) {
              
                
              setResume((prev) => ({
                ...prev,
                ...res.data
              }));
            }
            
           
          })
          .catch((err) => console.error("Error fetching resume", err));
      }
      
    }, [resumeId]);

    useEffect(()=>{
      if (resume){
        for (const key in resume)
          if (resume[key] !== null && (!Array.isArray(resume[key]) || resume[key].length > 0)){
              console.log(key)
              setComplete((prev)=>({
                ...prev,
                [key]: true
              }))
          }
          else{
            setComplete((prev)=>({
              ...prev,
              [key]: false
            }))
          }
      }
     
    }, [resume])
    
    

    const workList = resume.workExperience? [...resume.workExperience]: []
    const educationList = resume.education? [...resume.education] : []
    if (prop){

    
      if (prop.identity === 'edu'){
        const index = educationList.findIndex((edu)=>
          edu.id === prop.eduId
        )
        if (index !== -1){
          educationList[index] = prop
        }
        else{
          educationList.push(prop)
        }
      }
      else if (prop.identity === 'work'){
          const index = workList.findIndex((work)=> work.id === prop.workId)
          if (index !== -1){
            workList[index] = prop
          }
          else{
            workList.push(prop)
          }
      }
      else if (prop.identity === 'exp'){
        const index = workList.findIndex((work)=> work.id === prop.workId)
        if (workList[index]) {
          workList[index].description = prop;
        }
      
        
          
      }
  }
  

    
     return(
      <div

      
       style={{
          transform: 'scale(0.5)',      // Shrink it down to 30%
          transformOrigin: 'top left',// So it scales from top-left
          width: 'fit-content',
          height: '100%',
          
          
        }}> 
       
      
      <div className="template4 ">
         
      
       
          <div>
         
          
        {resume.contactInfo && 
        <div>
          <h1>{resume.contactInfo?.f_name} {resume.contactInfo?.l_name} </h1>
          
          <p  id="info">{resume.contactInfo?.city}, {resume.contactInfo?.province}, {resume.contactInfo?.postal_code} 
               | {resume.contactInfo?.email} | {resume.contactInfo?.phone_number}
          </p>
          </div>
        }
          </div>
          {resume.summary &&
            <div class="infoBox">
          
            <h3>Objective</h3>
            <hr></hr>
            <div dangerouslySetInnerHTML={{ __html: resume.summary?.summary}}/>
            </div> 
          }
      
        

          
          {resume.education && 
            <div class="infoBox">
            <h3>Education</h3>
            <hr></hr>
            <p>{educationList.map((edu, index)=>(
                <p key = {index}>
                    
                    
                    <span class="strong">{edu.school_name} </span> <span  class="float strong">{edu.location}</span><br></br>
                    <span class="italic">{edu.degree} in {edu.study_feild} </span>
                    <span class="float italic">{edu.start_month}, {edu.start_year} - {edu.graduation_month}, {edu.graduation_year}</span>
                </p>
            

            ))}</p>
            </div>
          }
         
          
          {resume.workExperience &&
            <div class="infoBox">
         
            <h3>Work Experience</h3>
            <hr></hr>
            <div>{workList.map((work, index)=>(
                <p key = {index}>
                    
                    
                    <span class="strong">{work.employer}</span> <span class="float strong">{work.location}</span><br></br>
                    
                    <span class="italic">{work.position}</span>
                    <span class="float italic" >{work.start_month}, {work.start_year} - {work.end_month}, {work.end_year}</span>
                    <div dangerouslySetInnerHTML={{ __html: work.description?.description }}/>
                </p>
              ))}</div>
             </div>
          }
          {resume.skills!== null && 
            <div class="infoBox">
            <h3>Skills</h3>
            <hr></hr>
            
            <div dangerouslySetInnerHTML={{ __html: resume.skills?.skills}}/>
            
            </div>

          }
          
           

      </div>
      </div>
          
  )
}
