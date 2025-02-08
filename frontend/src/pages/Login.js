import axiosInstance from "../axios";
import react from 'react';
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";





export default function LogIn(){
    const navigate = useNavigate();

    const LogInData = Object.freeze({
        email: "",
        password: ""
    
    })

    const [loginData, setData] = useState(LogInData);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]: value.trim(),

        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axiosInstance.post('/jwt/create/',{
            email: loginData.email,
            password: loginData.password,
        })
        .then((res) => {
            if (res.ok){
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
                navigate('/title');
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
            value={loginData.email}
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
            value={loginData.password}
            required

            ></input>
            

            <button type="sumbit">Log In</button>

            
            
            
        </form>
        <Link to="/register">Don't have an account? Sign Up</Link>
        <Link to="">Forgot password?</Link>
        </div>
    )
}