import React from 'react'
import { useState } from 'react';
import { publicRequest } from '../../services/request';
import {Link,useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginSuccess } from '../../redux/user';
const Login = () => {
  const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        publicRequest.post("auth/login",{
            username: email,
            password: password
        }).then((res)=>{
         
          if(res.status === 201)
          {
            dispatch(loginSuccess(res.data))
            navigate("/home")
            
          }
        }).catch((err)=>{
            
        })
    }
  return (
    <div className='Login'>
    <p>Log In</p>
    <form>
        <div className='form__input'>
        <label htmlFor="email">username </label>
        <input value={email} id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>
    
        <div className='form__input'>
        <label htmlFor="password">password </label>
        <input value={password} type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
        </div>
        
        <button  type='submit' onClick={handleSubmit}>submit</button>
    </form>
    <Link to="/signup"> 
    <p>Go to sign up</p>
    </Link>
</div>
  )
}

export default Login