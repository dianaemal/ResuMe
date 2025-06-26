import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ResumePreview from './ResumePreview'
import "../CSS/ContactInfo.css"
import SideBar from './SideBar';

import { ResumeContext } from '../ResumeContext';

function ContactInfo (){

    const {resume, setResume, setComplete} = useContext(ResumeContext)
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
    useEffect(() => {
        setResume((prev)=>({
            ...prev,
            contactInfo: contactInfo
        }))
    }, [contactInfo]);
    
 
    
    const location = useLocation();
    const resumeId = location.state?.id || null;
    console.log(resumeId)

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
        <div className='gridContainer'>
        <div className='progression'>
            <SideBar />

        </div>
        <div className='container3'>
            <h3 className='h3'>Write your Contact information!</h3>
            <form className='form' onSubmit={(e)=>{
                e.preventDefault();
            
                handleSubmit();
            }}>
                <div className='flexRow1'>
                    <div>
                        <label htmlFor='firstName'>First Name</label><br/>
                        <input type="text"
                        id = "firstName"
                        name= "f_name"
                        value={contactInfo.f_name}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label><br/>
                        <input type="text"
                        id = "lastName"
                        name= "l_name"
                        value={contactInfo.l_name}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                </div>
                <div className='flexRow'>
                    <div>
                        <label htmlFor='city'>City</label><br/>
                        <input type="text"
                        id = "city"
                        name= "city"
                        value={contactInfo.city}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='province'>Province</label><br/>
                        <input type="text"
                        id = "province"
                        name= "province"
                        value={contactInfo.province}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='postalCode'>Postal Code</label><br/>
                        <input type="text"
                        id = "postalCode"
                        name= "postal_code"
                        value={contactInfo.postal_code}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                </div>
                <div className='flexRow1'>
                    <div>
                        <label htmlFor='phone'>Phone Number</label><br/>
                        <input type="tel"
                        id = "phone"
                        name= "phone_number"
                        value={contactInfo.phone_number}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label><br/>
                        <input type="email"
                        id = "email"
                        name= "email"
                        value={contactInfo.email}
                        onChange = {handleChange}
                        >
                        </input>
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className="button2" type="button" onClick={handleClick1}> &larr; <span>Back</span></button>
                    <button  className="button2" type="submit"><span>Next </span>&rarr;</button>
          
                </div>
            </form>
        </div>
        <div className='resumePreview'>
        <ResumePreview prop={{...contactInfo, id: resumeId}}/>
            </div>
        </div>
        
       
    )
}
export default ContactInfo;