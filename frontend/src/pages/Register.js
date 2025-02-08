import axiosInstance from "../axios";
import react from 'react';
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";




export default function SignUp(){
    const navigate = useNavigate();

    const SignUpData = Object.freeze({
        email: "",
        username: "",
        password: "",
        re_password: ""
    })

    const [signupData, setData] = useState(SignUpData);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]: value.trim(),

        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axiosInstance.post('users/',{
            email: signupData.email,
            username: signupData.username,
            password: signupData.password,
            re_password: signupData.re_password
        })
        .then((res) => {
            if (res.ok){
                navigate('/login')
            }
            console.log(res.data)
        })
        

    }


    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                Email:
            </label>
            <input 
             id="email"
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required

            ></input>
             <label htmlFor="name">
                User Name: 
            </label>
            <input 
             id="name"
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleChange}
            required

            ></input>
             <label htmlFor="password">
                Password:
            </label>
            <input 
             id="password"
            type="text"
            name="password"
            minLength={8}
            onChange={handleChange}
            value={signupData.password}
            required

            ></input>
             <label htmlFor="re_pas">
                Confirm Password:
            </label>
            <input 
             id="re_pas"
            type="text"
            name="re_password"
            minLength={8}
            onChange={handleChange}
            required
            value={signupData.re_password}
            ></input>

            <button type="sumbit">SignUp</button>
            
            
            
        </form>
        <Link to="/login"> Already have an account? Log In</Link>
        </div>
        
    )
}