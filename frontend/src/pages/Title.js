import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../axios";
function Title(){
   
    const location = useLocation();
    const resumeId = location.state?.id || null;
    
    const accessToken = localStorage.getItem('access_token')
    
    const token = localStorage.getItem('access_token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const isExpired = decodedToken.exp * 1000 < Date.now();

    console.log("Token expired:", isExpired);   
    const [resumeTitle, setTitle] = useState("");
    const [errorMsg, setError] = useState("");
    const [validation, setvalidation] = useState(false);
    //const [flag, setFlag] = useState(false);
    
   
    
    useEffect(() => {
        if(resumeId){
            axiosInstance.get(`/api/resumes/${resumeId}`)
            .then((response)=>{
                setTitle(response.data.title || "")
            })
            .catch((error) => console.error('Error fetching resume:', error))
            
            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}`)
            .then((response)=> response.json())
            .then((data) => {
                setTitle(data.title || "")
            })
            .catch((error) => console.error('Error fetching resume:', error));*/
        }


    }, [resumeId]);  // The effect runs when `resumeTitle` changes
    
    const creatTitle = async () => {

        const api = resumeId ? `/api/resumes/${resumeId}` : `/api/resumes/`
        try{
            const response = resumeId ?  await axiosInstance.put(api, {title: resumeTitle})
            : await axiosInstance.post(api, {title: resumeTitle})
           
            const data = response.data
            console.log("Created resume:", data); // check structure

            navigate(`/contact-info/`, {state: {id: data.id}});
            console.log(data.id)
        }
        catch(error){
            console.error('Error creating/updating resume:', error);

        }

       /* const method = resumeId ? 'PUT' : 'POST'
        const api = resumeId ? `http://127.0.0.1:8000/api/resumes/${resumeId}` : `http://127.0.0.1:8000/api/resumes/`;

        const response = await fetch(api, {
            method,
            headers:{
                "Content-Type": "application/json",
                "Authorization": `JWT ${accessToken}`,
            },
            body: JSON.stringify({
                title: resumeTitle
            })


        })
        if(response.ok){
            
            const data = await response.json();
           
            
            navigate(`/contact-info/`, {state: {id: data.id}});
            console.log(data.id)
            
           
           
        }*/
       
  
    
}

   
    
    const navigate = useNavigate();
    
   // const handleClick = () =>{
        
       // if(!resumeTitle){
          //  setError("Please provide a title.");
           // setvalidation(false)
       // }
       // else{
        //    setError("");
           
      //  }
   // }
    

    return(

        <form onSubmit={(e) => {
            e.preventDefault();
            if (!resumeTitle.trim()) {
                setError("Please provide a title.");
                setvalidation(false);
                return;
            }
            setError("");
            //setFlag(true);
            //console.log(flag);
            
            creatTitle();
         
        }}>
            <label htmlFor="title" >Title of resume:</label>
            <input id="title" type="text"
                name="title"
                value={resumeTitle}
                onChange= {(e) => setTitle(e.target.value)}
                onMouseDown={() => setvalidation(true)}
                
            
            ></input>
           
            <button  type="submit">Next</button>
            {!validation && errorMsg && <span>{errorMsg}</span>}
        </form>
    )
}
export default Title;