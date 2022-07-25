import React from 'react'
import { useState } from 'react';
import { publicRequest } from '../../services/request';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        publicRequest.post("user/login",{
            email: email,
            password: password
        }).then((res)=>{console.log(res.data)}).catch((err)=>{
            
        })
    }
  return (
    <div className='Login'>
    <p>Log In</p>
    <form>
        <div className='form__input'>
        <label htmlFor="email">email </label>
        <input value={email} id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>
    
        <div className='form__input'>
        <label htmlFor="password">password </label>
        <input value={password} type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
        </div>
        
        <button  type='submit' onClick={handleSubmit}>submit</button>
    </form>
</div>
  )
}

export default Login