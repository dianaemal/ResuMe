import axiosInstance from "../axios";
import react, { useContext } from 'react';
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { jwtDecode }  from "jwt-decode";





export default function LogIn(){
    const navigate = useNavigate()
    const { setAuthenticated } = useContext(AuthContext)

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
        console.log("handleSubmit triggered");  // ✅ Check 1
        axiosInstance.post('/auth/jwt/create/',{
            email: loginData.email,
            password: loginData.password,
        })
        .then((res) => {
            console.log("Request successful:", res);  // ✅ Check 2
            if (res.status === 201 || res.status === 200 ){
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
            'JWT ' + localStorage.getItem('access_token');
            setAuthenticated(true)
            const token = localStorage.getItem('access_token')
            const decode = jwtDecode(token)
            console.log(decode)
            
            navigate('/dashboard');
            
            
           

            }
            
        })
        .catch((err) => {
            console.error("Login failed", err);
            // You can show an error message to the user here
        });
        

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