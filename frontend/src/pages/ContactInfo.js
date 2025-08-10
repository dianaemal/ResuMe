import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import ResumePreview from './ResumePreview'
import "../CSS/FormStyles.css"
import SideBar from './SideBar';
import Footer from '../components/Footer';

import { ResumeContext } from '../ResumeContext';

function ContactInfo (){

    const {resume, setResume, setComplete} = useContext(ResumeContext)
    const [error, setError] = useState({})
   
    const [contactInfo, setInfo] = useState({
        f_name: null,
        l_name: null,
        phone_number: null,
        email: null,
        city: null,
        province: null,
        postal_code: null
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
    const handleClick = () =>{
        navigate(`/title`, {state: {id: resumeId}});
    }
    const handleChange = (e) =>{
        
        const {name, value} = e.target;
        if (name === "f_name" || name === "l_name" || name === "email"){
            setError((prev)=>({
                ...prev,
                [name]: false
            }))
        }
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
    console.log(error)
   
    const handleSubmit = async () =>{
        
        const newerror = {}
        let isNull = false
        for (const key in contactInfo){
            
            if ((key === "f_name" || key === "l_name" || key === "email") && !contactInfo[key] ){
                isNull = true
                newerror[key] = true
            }
            
        }
      
       
        if (isNull){
            setError((prev)=>({
                ...prev,
                ...newerror
            }))
            return
        }

       // if (!contactInfo.f_name || !contactInfo.l_name || !contactInfo.email){
          //  setMessage("Required Feild")
          //  return
       // }

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
        <>
        <div className='gridContainer' style={{height: '80vh'}}>
        <div className='progression'>
            <SideBar />
        </div>
        <div className='container3'>
            <h3 className='h3'>Personal Contact Information</h3>
            <p className='contact-description'>Let's start by gathering your basic contact details. This information will appear at the top of your resume and help potential employers reach you.</p>
            <form className='form' onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
            }}>
                <div className='flexRow1'>
                    <div>
                        <label htmlFor='firstName'>First Name*</label><br/>
                        <input type="text"
                        style={{border: error.f_name && "2px solid red"}}
                        id = "firstName"
                        name= "f_name"
                        value={contactInfo.f_name}
                        onChange = {handleChange}
                        >
                        </input>
                        {error.f_name && <span style={{color: "red", fontSize: '13px'}}>Required Felid</span>}
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name*</label><br/>
                        <input type="text"
                        id = "lastName"
                        style={{border: error.l_name && "2px solid red"}}
                        name= "l_name"
                        value={contactInfo.l_name}
                        onChange = {handleChange}
                        >
                        </input>
                        {error.l_name && <span style={{color: "red", fontSize: '13px'}}>Required Felid</span>}
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
                        <label htmlFor='email'>Email*</label><br/>
                        <input type="email"
                        id = "email"
                        style={{border: error.email && "2px solid red"}}
                        name= "email"
                        value={contactInfo.email}
                        onChange = {handleChange}
                        >
                        </input>
                        {error.email && <span style={{color: "red", fontSize: '13px'}}>Required Felid</span>}
                       
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className="button2" type="button" onClick={handleClick}> &larr; <span>Back</span></button>
                    <button  className="button2" type="submit"><span>Next </span>&rarr;</button>
                </div>
            </form>
            <Footer></Footer>
        </div>
        <div className='container4' style={{height: '580x'}} onClick={()=> navigate('/resume', {state: {id: resumeId}})}>
        <ResumePreview prop={{...contactInfo, id: resumeId}} />
            </div>
        </div>

        </>
        
       
    )
}
export default ContactInfo;