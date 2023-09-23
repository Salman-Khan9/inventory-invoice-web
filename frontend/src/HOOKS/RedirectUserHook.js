import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Set_isloggedin } from "../redux/features/auth/authslice";
import { LogStatus } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RedirectUserHook = (path) => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    useEffect(() => {
     const loggedinstatus = async ()=>{
     const status = await LogStatus()
     dispatch(Set_isloggedin(status))
     console.log(status)
     if(!status){
     toast.info("Session Expired Please Login Again")
         Navigate(path)
     }
    }
     loggedinstatus()
    }, 
    
    [Navigate,dispatch,path])}

export default RedirectUserHook
