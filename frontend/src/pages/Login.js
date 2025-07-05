import axiosInstance from "../axios";
import react, { useContext } from 'react';
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { jwtDecode }  from "jwt-decode";
import styles from "../CSS/Login.css"





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

        axiosInstance.post('/auth/jwt/create/',{
            email: loginData.email,
            password: loginData.password,
        })
        .then((res) => {
            
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
        <div className="background">
            <div className="login-card">
                <h3 className="login-header">LOGIN</h3>
                <form className="login-form"
                    onSubmit={handleSubmit}>
                    <div>
                        <label className="login-label" htmlFor="email">
                            Email
                        </label>
                        <input 
                        id="email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        className="login-input"
                    ></input>
                </div>
                <div>
                    <label className="login-label" htmlFor="password">
                        Password
                    </label><br/>
                    <input 
                    id="password"
                    type="password"
                    name="password"
                    minLength={8}
                    onChange={handleChange}
                    value={loginData.password}
                    required
                    className="login-input"
                    ></input>
                </div>
                    <Link className="text" to="">Forgot password?</Link>
                    <button className="login-btn" type="submit">LOGIN</button>
                    <div className="text">Don't have an account? <Link to="/register">Sign Up</Link></div>
                </form>
            </div>
        </div>
    )
}