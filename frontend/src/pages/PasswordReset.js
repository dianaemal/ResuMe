import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../CSS/Login.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { use } from "marked";
import axiosInstance from "../axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export function passwordValidator(password){
    const errors = [];
    if (password.length < 8){
        errors.push("Password must at have least 8 characters.")
    }
    if (/^\d+$/.test(password)){
        errors.push("Password can't have all numeric values.")
    }
    if(!/[0-9]/.test(password)){
        errors.push("Password must contain at least one numeric value.")
    }
    if(!/[a-z]/.test(password)){
        errors.push("Password must contain at least one lowercase letter.")
    }
    if (!/[A-Z]/.test(password)){
        errors.push("Password must contain at least one uppercase letter.")
    }
    if (!/[^A-Za-z0-9]/.test(password)){
        errors.push("Password must contain at least one special character.")
    }
    return errors
}

export default function PasswordReset(){
    const {uid, token} = useParams()
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [message, setMessage] = useState("")
    const [flag, setFlag] = useState(false)
    const [conformation, setConfirm] = useState(false)

    const navigate = useNavigate()
    const [passwordData, setPassword] = useState({


        uid: uid,
        token: token,
        new_password: '',
        re_new_password: ''

    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(passwordData.new_password !== passwordData.re_new_password){
            setMessage("Password must match re-passowrd.")
            setFlag(true)
            return;
        }
        const errors = passwordValidator(passwordData.new_password);
        if (errors.length > 0 ){
            setFlag(true);
            setMessage(errors);  
            return;
        }

        try{
            await axiosInstance.post('/auth/users/reset_password_confirm/', passwordData);
            
            setConfirm(true)
           // setMessage("Password successfully changed.")
          
            //setTimeout(()=> navigate('/login'), 2000)
        }
        catch(err){
            setMessage("Something went wrong!")
        }
    }

    return(
        <div className="background">
            <div className="login-card" style={{height: 'auto', maxWidth: '450px'}}>
                { conformation ? (
                    <>
                        <h3 className="login-header" style={{textAlign: 'left', fontSize: '25px', marginBottom: '10px'}}>PASSWORD CHANGED!</h3>
                        <div style={{textAlign: 'left', marginBottom: '15px'}}>Your password have been changed successfully.</div>
                        <button className="login-btn" onClick={()=> navigate('/login')} style={{marginBottom: '0px'}}>BACK TO RESUME</button><br/>
                    </>
                )
                :(<form className="login-form" onSubmit={handleSubmit}>
                    <h3 className="login-header" style={{textAlign: 'left', fontSize: '25px', marginBottom: '10px'}}>RESET YOUR PASSWORD</h3>
                    <div style={{textAlign: 'left', marginBottom: '15px'}}>Enter a new password bellow to reset your password.</div>
                    
                    <div style={{position: "relative"}}>
                    <input className="login-input" type={toggle2? "text": "password"} placeholder="New Password" style={{ border: flag && "1px solid red", marginBottom: '10px', marginBottom: '0px'}}
                        value={passwordData.new_password}
                        onChange={(e)=> {
                            setFlag(false)
                           setPassword((prev)=>({
                                ...prev,
                                new_password: e.target.value
                           }))

                           
                            
                       }}
                        required
                    />
                        <FontAwesomeIcon icon={toggle2? faEyeSlash: faEye}  onClick={()=> setToggle2(!toggle2)}
                                className="passwordVisible"/>
                    </div>
                    <div style={{position: 'relative'}}>
                     <input className="login-input" type={toggle? "text" : "password"} placeholder=" Re-enter new password" style={{ border: flag && "1px solid red" ,marginBottom: '10px', marginBottom: '0px'}}
                        value={passwordData.re_new_password}
                        onChange={(e)=> {
                            setFlag(false)
                            setPassword((prev)=>({
                                ...prev,
                                re_new_password: e.target.value
                            }))
                           
                        }}
                        required
                    />
                    
                            <FontAwesomeIcon icon={toggle? faEyeSlash: faEye}  onClick={()=> setToggle(!toggle)}
                                className="passwordVisible"
                                />
                
                    </div>

                    {message && Array.isArray(message) ? (
                        <ul className="error-message" style={{color: 'red'}}>
                            {message.map((msg, idx) => (
                                <li style={{textAlign: 'left', fontSize: '13px'}} key={idx}>{msg}</li>
                             ))}
                        </ul>
                    ): ( message && <p className="error-message" style={{color: 'red', fontSize: '13px', textAlign: 'left'}}>{message}</p>)}
                   

                    
                   
                    <button className="login-btn"  style={{marginBottom: '0px'}}>RESET PASSWORD</button><br/>
                   
                </form>)}
            </div>
        </div>
    )
}