import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Login.css"

export default function LogOut(){
    const navigate = useNavigate()
   

    const handleClick = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }

    return(
        <div className="background">
            <div className="login-card" style={{height: 'auto', maxWidth: '350px'}}>
                <form className="login-form">
                    <h3 className="login-header">LOGOUT</h3>
                    <div>Are you sure that you want to logout?</div>
                    <button className="login-btn" onClick={handleClick}>LOGOUT</button>
                </form>
            </div>
        </div>
    )

    

}
