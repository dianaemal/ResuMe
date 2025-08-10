import React from "react";
import styles from "../CSS/Login.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";

export default function PasswordForget(){
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [flag, setFlag] = useState(true)
    
    
   

    const handleClick = async (e) =>{
        e.preventDefault()
        if(email === ''){
           
            setError(true)
        }else{
            try{ 
                await axiosInstance.post(`/auth/users/reset_password/`, {
                    email: email
                })
                setFlag(true)
                setMessage('Password reset email sent! Check your inbox.')

            }catch(err){
                
                setMessage('Something went wrong.');
                setFlag(false);
                }
            

        }
        }
    

    return(
        <div className="background">
            <div className="login-card" style={{height: 'auto', maxWidth: '450px'}}>
                <form className="login-form">
                    <h3 className="login-header" style={{textAlign: 'left', fontSize: '25px', marginBottom: '10px'}}>FORGOT YOUR PASSWORD?</h3>
                    <div style={{textAlign: 'left', marginBottom: '15px'}}>Enter the email connected to your account to reset your password</div>
                    {message && <div  className="error-message" style={{color: flag && 'green', background: flag && "#eff6f1", border: flag && "1px solid #218838", textAlign:"left"}}>{message}</div>}
                    <>
                    <input className="login-input" type="email" placeholder="Enter your email" style={{border: error? '1px solid red': '', marginBottom: '10px', marginBottom: '0px'}}
                        value={email}
                        onChange={(e)=> {
                            setEmail(e.target.value)
                            setError(false)
                        }}
                        required
                    />
                    {error &&  <div className="error-message" style={{textAlign: 'left', color: 'red'}}>Please enter your email address.</div>}</>
                    <button className="login-btn" onClick={handleClick} style={{marginBottom: '0px'}}>REQUEST RESET LINK</button><br/>
                    <div className="text" style={{textAlign: 'center', fontSize: '15px', marginTop: '0px'}}><Link to="/login">Back to Login</Link></div>
                </form>
            </div>
        </div>
    )

    

}
