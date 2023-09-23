import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import pic from "../images/login.png"
import "../css/Login.css"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { LoginUser, validate } from '../services/authService'
import { Set_isloggedin, set_name } from '../redux/features/auth/authslice'
import Loader from '../components/Loader'
const initialState ={
 
  email:"",
  password:"",
  
}

 
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const [loading, setloading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {email,password} = formData
  const handleinputs =(e)=>{
    const {name,value} = e.target;
    setformData({...formData , [name]:value}) 
  } 
  const login_user = async (e)=>{
e.preventDefault()
if(!email || !password){
  return toast.error("fill the fields")
}
if(!validate){
  toast.error("Enter a valid email")
}
const userData ={
  email,
  password
}
setloading(true)
try {
  const data = await LoginUser(userData)
  if(data){
    await dispatch(Set_isloggedin(true))
await dispatch(set_name(data.name))
    
    setloading(false)
    navigate("/Dashboard")
  }
  setloading(false)

  
  
  
} catch (error) {
  toast.error(error)
  setloading(false)

}
  }
  return (
    <div className='login-page'>
      {loading&&<Loader/>}
    <div className="login-box">
         <img src={pic} alt='none'/>
        <h1 className='heading'>Login</h1>
        <form onSubmit={login_user} className='login-form'>
            
                <input className='email-input' type='email' placeholder='Enter Your Email' name='email' value={email} onChange={handleinputs}/>
                
                
            <input className='pass-input' type='Password' placeholder='Enter Your Password' name='password' value={password} onChange={handleinputs}/>
            
           
           
              
                <button className='log-button' type='Submit'  >Login</button>
                
        </form>
      
      <div className='forgot-pass'>  <Link className='f-pass'  to="/forgot" >Forgot Password</Link></div>

        <p className='register-acc'>Dont have any account?   <Link className='f-pass' to="/Register" >Create Account</Link></p>
    </div>
    
    

   </div>
  )
}

export default Login