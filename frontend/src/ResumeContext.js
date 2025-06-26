import { createContext, useState, useEffect } from "react";
import Education from "./pages/Education";

export const ResumeContext = createContext()

export default function ResumeProvider({children}){
    const [resume, setResume] = useState(
        {
            contactInfo: {},
            education: [],
            
            skills: {},
            summary: {},
            workExperience: []
        }
    )
    const [complete, setComplete] = useState({
        contactInfo: false,
        education: false,
        workExperience: false,
        skills: false,
        summary: false
    })


   
    return (
        <ResumeContext.Provider value={{resume, setResume, complete, setComplete}}>
            {children}
        </ResumeContext.Provider>
    )

}