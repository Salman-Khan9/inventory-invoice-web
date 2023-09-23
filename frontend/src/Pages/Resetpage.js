import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../css/reset.css"
import pic from "../images/reset.png"
import { resetpass } from '../services/authService'
import { toast } from 'react-toastify'
const initialstate={
password :"",
confirmpass:""
}
const Resetpage = () => {
const {resettoken} = useParams()

  const [formdata, setformdata] = useState(initialstate)
  const {password,confirmpass}=formdata

  const handleinput=(e)=>{
    const {name ,value} = e.target
  setformdata({...formdata, [name]:value})
}
 const userData={
password,
confirmpass
}
const reset = async (e)=>{
e.preventDefault()
 await resetpass(userData,resettoken)
toast.success("password reseted successfully")
console.log(resettoken)

}

  return (
    <div className='Resetpage'>
      <div className='reset-page-box'>
        <img className='reset-pic' src={pic} alt='none'/>
        <h1 className='reset-heading'>Reset Password </h1>
        <form onSubmit={reset} className='reset-form'>
          <input className='pass-input' type='password' placeholder='Password' name='password' value={password} onChange={handleinput}/>
          <input className='pass-input' type='password' placeholder='Confirm Password' name='confirmpass' value={confirmpass} onChange={handleinput}/>
          <button className='reset-button' type='submit'> Reset Password</button>
        </form>
        <div className='home-login'>
          <Link className='reset-home' to="/">Home</Link>
          <Link className='reset-login' to="/Login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Resetpage