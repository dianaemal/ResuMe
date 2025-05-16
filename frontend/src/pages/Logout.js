import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import styles from "../CSS/Login.css"

export default function LogOut(){
    const navigate = useNavigate()
    const {setAuthenticated} = useContext(AuthContext)

    const handleClick = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }

    return(
        <div className="background">
            <div className="container1"
                 style={{height: '250px'}}
            >
                <div className="form">
                <h3>LOGOUT</h3>
                <div>Are you sure that you want to logout?</div>
                <button className="button" onClick={handleClick}>LOGOUT</button>
               </div>
            </div>
        </div>
    )

    

}
