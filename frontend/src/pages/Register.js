import axiosInstance from "../axios";
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import styles from "../CSS/Login.css"




export default function SignUp(){
    const navigate = useNavigate();

    const SignUpData = Object.freeze({
        email: "",
        username: "",
        password: "",
        re_password: ""
    })

    const [signupData, setData] = useState(SignUpData);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]: value.trim(),

        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axiosInstance.post('users/',{
            email: signupData.email,
            username: signupData.username,
            password: signupData.password,
            re_password: signupData.re_password
        })
        .then((res) => {
            if (res.status === 201 || res.data === 200){
                navigate("/login")
            }
            console.log(res.data)
        })
        

    }


    return(
        <div className="background">
            <div className="container1"
                style={{height: '550px'}}
            >
                <h3 className="title">SignUP</h3>
                <form className="form"
                 onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label><br/>
                        <input 
                            id="email"
                            type="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                            required
                        ></input></div>
                    <div>
                        <label htmlFor="name">
                            User Name
                        </label><br/>
                        <input 
                        id="name"
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={handleChange}
                        required

                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label><br/>
                        <input 
                        id="password"
                        type="password"
                        name="password"
                        minLength={8}
                        onChange={handleChange}
                        value={signupData.password}
                        required

                        ></input>
                    </div>
                    <div>
                        <label htmlFor="re_pas">
                            Confirm Password
                        </label><br/>
                        <input 
                        id="re_pas"
                        type="password"
                        name="re_password"
                        minLength={8}
                        onChange={handleChange}
                        required
                        value={signupData.re_password}
                        ></input>
                    </div>

                <button className="button" type="sumbit">SignUp</button>
            
                <div className="text">Have an account already? <Link to="/login">Login</Link></div>
            
            </form>
           
        </div>
    </div>
        
    )
}