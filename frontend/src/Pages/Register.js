import React, { useState } from 'react'
import {Link} from "react-router-dom"
import pic from "../images/signin.png"
import { toast } from "react-toastify"
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Set_isloggedin,set_name } from '../redux/features/auth/authslice'
import "../css/register.css"
import { registerUser, validate } from '../services/authService'
import Loader from '../components/Loader'

const initialState ={
  name:"",
  email:"",
  password:"",
  confirmpassword:""
}
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const [loading, setloading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {name,email,password,confirmpassword} = formData
  const handleinputs =(e)=>{
    const {name,value} = e.target;
    setformData({...formData , [name]:value}) 
  }
  const regsiter = async(e)=>{
    
    e.preventDefault()
    if(!name ||!email||!password||!confirmpassword){
    return  toast.error("Fill the required fields")
    }
    if(!validate(email)){
     return toast.error("please enter a valid email")

    }
    if(password!==confirmpassword){
     return toast.error("password does not match")
    }
    if(password.length<6){
     return toast.error("password must be greater then 6 characters")
    }
    const userData = {
      name,email,password
    }
    setloading(true)
    try {
      const data = await registerUser(userData)
       dispatch(Set_isloggedin(true))
       dispatch(set_name(data.name))
       navigate("/Dashboard")
      setloading(false)
      //console.log(data)

    } catch (error) {
      setloading(false)
      toast.error(error.message)
    }
  }
  return (
    <div className='register-page'>
      {loading&&<Loader />}
    <div className="register-box">
         <img  src={pic} alt='none'/>
        <h1 className='heading'>Register</h1>
        <form onSubmit={regsiter} method='POST' className='register-form'>
            
                <input className='input'  type='email' placeholder='Enter Your Email' name='email' value={email}  onChange={handleinputs}/>
                <input className='input' type='text' placeholder='Enter Your Name' name='name' value={name} onChange={handleinputs}/>
                <input className="input" type='Password' placeholder='Enter Your Password' name='password' value={password} onChange={handleinputs}/>
            <input className='input' type='Password' placeholder='Confirm Password' name='confirmpassword' value={confirmpassword} onChange={handleinputs}/>
                <button className='reg-button' type='Submit'  >Register</button>
                
        </form>

       <p>Already have an account?<Link className='already-login' to="/Login">Login</Link></p>
    </div>
   </div>
  )
}

export default Register