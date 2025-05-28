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


   
    return (
        <ResumeContext.Provider value={{resume, setResume}}>
            {children}
        </ResumeContext.Provider>
    )

}