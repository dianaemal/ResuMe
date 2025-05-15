import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { jwtDecode }  from "jwt-decode";

export default function Dashboard(){
    const navigate = useNavigate()
    const [allResumes, setAll] = useState([])
    const token = localStorage.getItem('access_token')
    const decode = jwtDecode(token)
    console.log(decode)

    useEffect(()=>{
        axiosInstance.get(`api/resumes/`)

        .then((res)=>{
            if (res.status === 200 || res.status === 201){
                console.log(res.data)
                setAll(res.data)
                
            }
        })
    }, [])

    

    return (
        <div>
            <p>Welcome!</p>
            
            <button onClick={()=> navigate('/title')}>Create a new resume</button>
            <div>{allResumes.map((resume, index)=>(
                <div key={index}>{resume.title}
                    {resume.user === decode.user_id && (
             
                   <>
                    <button>Delete</button>
                    <button onClick={() => navigate('/resume', { state: { id: resume.id } })}>
                    View
                    </button>
                    </>
                )}
               
                
                </div>
                
            ))}

            </div>
        </div>
     

    )
}