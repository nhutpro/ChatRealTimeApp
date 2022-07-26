import React from 'react'
import { useState } from 'react'
import "./Signup.scss"
import { publicRequest } from '../../services/request'
import { Link,useNavigate } from 'react-router-dom'
export const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handdleSubmit = (e)=>{
        e.preventDefault();
                publicRequest.post("auth/signup", {
                    username: username,
                    email:email,
                    password: password,
                }).then((res)=>{
                    if(res.status === 201)
                    {
                        navigate("/login");
                    }
                }).catch((err)=>{
                    console.log(err)
                })
    }
  return (

    <div className='SignUp'>
        <p>Sign Up</p>
        <form>
            <div className='form__input'>
            <label htmlFor="username">username </label>
            <input value={username} id="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
            </div>
            <div className='form__input'>
            <label htmlFor="email">email </label>
            <input value={email} id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
            <div className='form__input'>
            <label htmlFor="password">password </label>
            <input value={password} type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            </div>
            
            <button  type='submit' onClick={handdleSubmit}>submit</button>
        </form>
        <Link to="/login">
            <p>go to login</p>
        </Link>
    </div>
  )
}
export default Signup;