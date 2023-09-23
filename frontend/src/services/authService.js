import axios from "axios";
import {toast} from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const validate = (email)=>{
return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )
}
//register user
export const registerUser = async (userData)=>{
  try {
   const response = await axios.post(`${BACKEND_URL}/api/user/signin`,userData,{withCredentials:true})
   if(response.statusText==="OK"){
   toast.success("user registered successfully")
   }
    return response.data
  } catch (error) {
   const message =(
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   toast.error(message)

  }

}//Login user
export const LoginUser = async (userData)=>{
  try {
   const response = await axios.post(`${BACKEND_URL}/api/user/login`,userData)
   if(response.statusText==="OK"){
   toast.success("Loggedin successfully...")
   }
    return response.data
  } catch (error) {
   const message =(
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   toast.error(message)

  }}
  //logout user
  export const LogoutUser = async ()=>{
    try {
     await axios.get(`${BACKEND_URL}/api/user/logout`)
    } catch (error) {
    
     toast.error(error)
  
    }}
    
    //forgotpassword 
    export const forgotpassword = async (userData)=>{
      try {
     const response =  await axios.post(`${BACKEND_URL}/api/user/forgotpass`,userData)

       toast.success(response.data.message)
      } catch (error) {
      
       toast.error(error)
    
      }}
  //resetpass 
  export const resetpass = async (userData,resettoken)=>{
    try {
   const response =  await axios.put(`${BACKEND_URL}/api/user/resetpass/${resettoken}`,userData)
   
   return response.data

    } catch (error) {
    
      const message =(
        error.response &&error.response.data&&error.response.data.message
    )|| error.message||error.toString();
    toast.error(message)
  
    }}
    export const LogStatus = async ()=>{
      try {
     const response =  await axios.get(`${BACKEND_URL}/api/user/logged`)
     console.log(response)
     return response.data
  
      } catch (error) {
      
        const message =(
          error.response &&error.response.data&&error.response.data.message
      )|| error.message||error.toString();
      toast.error(message)
    
      }}

