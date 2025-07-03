import {useEffect, useState, useContext} from "react";
import axiosInstance from "../axios";
import { ResumeContext } from '../ResumeContext';
import ResumeTemplateRenderer from './ResumeTemplateRenderer';


export default function ResumePreview({prop}){
 

  const {resume, setResume, setComplete} = useContext(ResumeContext)
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

    // Get the template class based on resume data
    const getTemplateClass = () => {
      if (resume && resume.template) {
        return resume.template;
      }
      return 'template1'; // Default template
    };

    const template = getTemplateClass();
    // Use shared renderer for all templates
    return (
      <div style={{ width: '600px', height: '90%',  padding: '12px', borderRadius: '10px' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '600px', minHeight: '850px' }}>
          <ResumeTemplateRenderer
            resume={resume}
            template={resume.template}
            workList={workList}
            educationList={educationList}
          />
        </div>
      </div>
    );
}
