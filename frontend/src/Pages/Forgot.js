import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "../css/forgot.css"
import pic from "../images/mail.png"
import { toast } from 'react-toastify'
import { forgotpassword, validate } from '../services/authService'
const Forgot = () => {
 
  const [email, setemail] = useState("")

  const forgot = async (e)=>{
  e.preventDefault()
    if(!email){
    toast.error("Enter your email")
  }
  if(!validate){
toast.error("Enter a valid email")
  }
  const userData={
    email
  }
  
    await forgotpassword(userData)

    setemail("")
    
  
}
  return (
    <div className='forgot-pass-page'>
        <div className='forgot-box'>
        <img src={pic} alt='none' height="50px" width="50px"/>
        <h1 className='heading'>Forgot Password</h1>

            <form onSubmit={forgot} className="forgot-pass-form">
            <input className='forgot-input' type='email'placeholder='Enter Your Email' name='email' value={email} onChange={(e)=>{
               setemail(e.target.value)
            }} />
            <button className='forgot-pass-button' type='Submit' > Get reset mail</button>

            </form>
           
           <div className='home-login-pages'><Link className='home-link' to="/">-Home</Link>
      <Link className='Login-link' to="/Login">Login-</Link>
       
      </div>  </div>
    
    </div>
  )
}

export default Forgot