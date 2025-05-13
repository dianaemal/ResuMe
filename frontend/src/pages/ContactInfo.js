import React from 'react';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
function ContactInfo (){

    const [contactInfo, setInfo] = useState({
        f_name: "",
        l_name: "",
        phone_number: "",
        email: "",
        city: "",
        province: "",
        postal_code: ""
    });
    const [contactExists, setContactExists] = useState(false); 
   
   
    
    const location = useLocation();
    const resumeId = location.state?.id || null;

    const navigate = useNavigate();
    const handleClick1 = () =>{
        navigate(`/title/`, {state: {id: resumeId}});
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInfo((prev)=>({
            ...prev,
            [name]: value

        }))

        
    }
    useEffect(()=>{
       
        if(resumeId){
            axiosInstance.get(`/api/resumes/${resumeId}/contact-info`)
            .then((response)=>{
                if (response.status === 200 || response.status === 201){
                    setContactExists(true);
                    const data = response.data
                    if (data){
                        setInfo({
                            f_name: data.f_name,
                            l_name: data.l_name,
                            phone_number: data.phone_number,
                            email: data.email,
                            city: data.city,
                            province: data.province,
                            postal_code: data.postal_code
                        });
                    }

                }

            })
            .catch((error) => {
                console.error("Failed to fetch contact info:", error);
                setContactExists(false);
            });
            /*fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/contact-info`)
            .then((response) =>{
                if (response.ok) {
                    setContactExists(true); // Mark that contact info exists
                    return response.json();
                }
                setContactExists(false);
            })
            

            .then((data) => {
                if(data){
                    setInfo({
                        f_name: data.f_name,
                        l_name: data.l_name,
                        phone_number: data.phone_number,
                        email: data.email,
                        city: data.city,
                        province: data.province,
                        postal_code: data.postal_code
                    });
                }
               
            });*/
        }
       
    }, [resumeId])
   
    const handleSubmit = async () =>{

        const response = contactExists? 
        await axiosInstance.put(`/api/resumes/${resumeId}/contact-info`, contactInfo )
        : await axiosInstance.post(`/api/resumes/${resumeId}/contact-info`, contactInfo)
        if (response.status === 200 || response.status === 201){
            navigate('/education', {state: {id: resumeId}});
        }
       
       /* const method = contactExists ? 'PUT' : 'POST';
        const response = await fetch(`http://127.0.0.1:8000/api/resumes/${resumeId}/contact-info`, {
            method,
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(contactInfo)

                
            
        })
     
        if(response.ok){
            navigate('/education', {state: {id: resumeId}});
        }*/
    }




    

    return(
        <form  onSubmit={(e)=>{
            e.preventDefault();
           
            handleSubmit();
        }}>
             <label htmlFor='firstName'>First Name</label>
             <input type="text"
             id = "firstName"
             name= "f_name"
             value={contactInfo.f_name}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='lastName'>Last Name</label>
             <input type="text"
             id = "lastName"
             name= "l_name"
             value={contactInfo.l_name}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='city'>City</label>
             <input type="text"
             id = "city"
             name= "city"
             value={contactInfo.city}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='province'>Province</label>
             <input type="text"
             id = "province"
             name= "province"
             value={contactInfo.province}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='postalCode'>Postal Code</label>
             <input type="text"
             id = "postalCode"
             name= "postal_code"
             value={contactInfo.postal_code}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='phone'>Phone Number</label>
             <input type="tel"
             id = "phone"
             name= "phone_number"
             value={contactInfo.phone_number}
             onChange = {handleChange}
             >
             </input>
             <label htmlFor='email'>Email</label>
             <input type="email"
             id = "email"
             name= "email"
             value={contactInfo.email}
             onChange = {handleChange}
             >
             </input>
             <button  type="submit">Next</button>
             <button type="button" onClick={handleClick1}>Back</button>
        </form>
       
    )
}
export default ContactInfo;