import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function LogOut(){
    const navigate = useNavigate()
    const {setAuthenticated} = useContext(AuthContext)

    const handleClick = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }

    return(
        <div>
        <h2>Logout Page</h2>
        <p>Are you sure that you want to logout?</p>
        <button onClick={handleClick}>Logout</button>
        </div>
    )

    

}
