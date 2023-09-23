import React, { useState, } from 'react'
import { useNavigate } from "react-router-dom";
import "../css/sidebar.css"
import pic from "../images/logo.png"
import {HiMenu} from "react-icons/hi"
import menu from './Sidebarmenu';
import Sidebaritems from './Sidebaritems';
const Sidebar = ({children}) => {
const [isopen,setisopen] = useState(true)
const toggle = ()=> setisopen(!isopen)
const Navigate = useNavigate()
const click = ()=>{
  Navigate("/")
}
  return (
    
    <div className='sidebar-page'>
      <div className='sidebar' style={{width:isopen? "220px":"60px",transition:"all .5s"}}>
        <div className='sidebar-head'  style={{width:isopen? "195px":"36px",transition:"all .5s",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
      <img onClick={click} style={{display:isopen?"block":"none",transition:"all .5s"}}  src={pic} alt='none' />
       <span className='icon' style={{marginLeft:isopen? "60px":"0px",transition:"all .5s"}}> < HiMenu cursor="pointer" color='white' size={30} onClick={toggle} /></span>
        </div>
           {menu.map((item,index)=>{
          return  <Sidebaritems key={index} item = {item} isopen = {isopen}/>
           })}
      </div>

      
    <main style={{marginLeft:isopen?"230px":"80px",transition:"all .5s"}}>{children}</main>
       
    </div>

    
  )
}

export default Sidebar