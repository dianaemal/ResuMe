import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate()

    return (
        <div>
            <p>Welcome!</p>
            <button onClick={()=> navigate('/title')}>Create a new resume</button>
        </div>
     

    )
}