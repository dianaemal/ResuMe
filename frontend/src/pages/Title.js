import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
function Title(){
   
    const location = useLocation();
    const resumeId = location.state?.id || null;
   
    
    const [resumeTitle, setTitle] = useState("");
    const [errorMsg, setError] = useState("");
    const [validation, setvalidation] = useState(false);
    //const [flag, setFlag] = useState(false);
    
   
    
    useEffect(() => {
        if(resumeId){
            fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}`)
            .then((response)=> response.json())
            .then((data) => {
                setTitle(data.title || "")
            })
            .catch((error) => console.error('Error fetching resume:', error));
        }

        //creatTitle();// Call the function here
    }, [resumeId]);  // The effect runs when `resumeTitle` changes
    
    const creatTitle = async () => {

        const method = resumeId ? 'PUT' : 'POST'
        const api = resumeId ? `http://127.0.0.1:8000/api/resumes/${resumeId}` : `http://127.0.0.1:8000/api/resumes/`;

        const response = await fetch(api, {
            method,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: resumeTitle
            })

        })
        if(response.ok){
            
            const data = await response.json();
           
            
            navigate(`/contact-info/`, {state: {id: data.id}});
            console.log(data.id)
            
           
           
        }

  
    
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