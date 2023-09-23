import { useSelector } from "react-redux";
import { selectisloggedin } from "../../redux/features/auth/authslice";
export const Showonlogin = ({children})=>{
    const Logged = useSelector(selectisloggedin)
    if(Logged){
        return <>{children}</>
    }
    return null
}
export const Showonlogout = ({children})=>{
    const Logged = useSelector(selectisloggedin)
    if(!Logged){
        return <>{children}</>
    }
    return null
}