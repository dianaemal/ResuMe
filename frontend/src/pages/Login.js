import axiosInstance from "../axios";
import react, { useContext } from 'react';
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { jwtDecode }  from "jwt-decode";
import styles from "../CSS/Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LogIn(){
    const navigate = useNavigate()
    const { setAuthenticated } = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)
    const [toggle, setToggle] = useState(false)

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
        // Clear error message when user starts typing
        if (message) {
            setMessage("");
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        setMessage("")

        // Set a timeout for 10 seconds
        const timeout = setTimeout(() => {
            setLoading(false);
            setMessage("Server is taking longer than expected. Please try again later or check your internet connection.");
        }, 30000); // 10 seconds timeout

        setTimeoutId(timeout);

        axiosInstance.post('/auth/jwt/create/',{
            email: loginData.email,
            password: loginData.password,
        })
        .then((res) => {
            // Clear the timeout since we got a response
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
            
            if (res.status === 201 || res.status === 200 ){
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
                setAuthenticated(true)
                navigate('/dashboard');
            }
        })
        .catch((err) => {
            // Clear the timeout since we got an error response
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }

            console.log('Login error:', err);
            
            // Handle different types of errors
            if (err.code === 'ERR_NETWORK') {
                setMessage("Network error: Please check your internet connection and try again.");
            } else if (err.code === 'ECONNABORTED') {
                setMessage("Request timed out: The server is taking too long to respond. Please try again later.");
            } else if (err.response && err.response.data) {
                console.log(err.response.data)
                const messages = Object.values(err.response.data).flat();
                setMessage(messages);
            } else if (err.message) {
                setMessage(`Login failed: ${err.message}`);
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Logging in...</p>
                <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>
                    This may take a few moments
                </p>
            </div>
        );
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
                <div style={{position: "relative"}}>
                    <label className="login-label" htmlFor="password">
                        Password
                    </label><br/>
                    <input 
                    id="password"
                    type={toggle? "text": "password"}
                    name="password"
                    minLength={8}
                    onChange={handleChange}
                    value={loginData.password}
                    required
                    className="login-input"
                    ></input>
                    <FontAwesomeIcon icon={toggle? faEyeSlash: faEye}  onClick={()=> setToggle(!toggle)}
                                className="passwordVisible" style={{top: '57%'}}/>
                </div>
                    <Link className="text" to="/password-forget">Forgot password?</Link>
                    {message && <div className="error-message">{message}</div>}
                    <button className="login-btn" type="submit">LOGIN</button>
                  
                    <div className="text">Don't have an account? <Link to="/register">Sign Up</Link></div>
                </form>
            </div> 
         
        </div>
    )
}