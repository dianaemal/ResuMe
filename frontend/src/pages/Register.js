import axiosInstance from "../axios";
import { useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import { passwordValidator } from "./PasswordReset";
import styles from "../CSS/Login.css"




export default function SignUp(){
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const SignUpData = Object.freeze({
        email: "",
        username: "",
        password: "",
        re_password: ""
    })

    const [signupData, setData] = useState(SignUpData);

    const handleChange = (e) =>{

       
        const {name, value} = e.target;
        if (name === 'email'){
            setFlag(false)
        }
        else{
            setFlag2(false)
        }
        setData((prev)=>({
            ...prev,
            [name]: value.trim(),

        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (signupData.password !== signupData.re_password){
            setMessage("Password must match re-password.");
            setFlag2(true)
            return;
        }
        const errors = passwordValidator(signupData.password)
        if(errors.length > 0){
            setMessage(errors)
            setFlag2(true)
            return;
        }





        axiosInstance.post('auth/users/',{
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
        .catch((err)=>{
            if (err.response && err.response.data) {
                const messages = Object.values(err.response.data).flat();
                setMessage(messages);
                setFlag(true)
            }
            
           
        })
        

    }


    return(
        <div className="background" >
            <div className="login-card" style={{height: 'auto'}}>
                <h3 className="login-header">Sign Up</h3>
                <form className="login-form"
                 onSubmit={handleSubmit}>
                    <div>
                        <label className="login-label" htmlFor="email">
                            Email
                        </label><br/>
                        <input
                        style={{border: flag && '1px solid red'}} 
                            id="email"
                            type="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                            required
                            className="login-input"
                        ></input></div>
                    <div>
                        <label className="login-label" htmlFor="name">
                            User Name
                        </label><br/>
                        <input 
                        id="name"
                        type="text"
                        name="username"
                        value={signupData.username}
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
                        style={{border: flag2 && '1px solid red'}} 
                        onChange={handleChange}
                        value={signupData.password}
                        required
                        className="login-input"
                        ></input>
                    </div>
                    <div>
                        <label className="login-label" htmlFor="re_pas">
                            Confirm Password
                        </label><br/>
                        <input 
                        id="re_pas"
                        type="password"
                        name="re_password"
                        style={{border: flag2 && '1px solid red'}} 
                        onChange={handleChange}
                        required
                        value={signupData.re_password}
                        className="login-input"
                        ></input>
                    </div>

                    {(message && Array.isArray(message) )? (
                        <ul className="error-message" /*style={{color: 'red', fontSize: '13px'}}*/>
                            {message.map((msg, inx)=>(
                                <li style={{textAlign: 'left'}} key={inx}>{msg}</li>
                            ))}
                        </ul>
                    ): ( message && <p  className="error-message"/*style={{color: 'red', textAlign: 'left', fontSize: '13px'}}*/>{message}</p>)}
                   
                    

                    

                <button className="login-btn" type="submit">Sign Up</button>
                <div className="text">Have an account already? <Link to="/login">Login</Link></div>
            </form>
           
        </div>
    </div>
        
    )
}