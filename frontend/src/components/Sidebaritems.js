import React, { useState } from 'react'
import "../css/sidebar.css"
import {BiSolidRightArrow} from "react-icons/bi"
import {  NavLink } from 'react-router-dom'



const Sidebaritems = ({item,isopen}) => {
  const [isExpand, setisExpand] = useState(false)
    if(item.children){
  return (
    <div className= { isExpand? "side-item-open": 'side-items'}  >
     <div className={isopen?'account-tag':"close-tags"}> <span className='tag-icons'>{item.icon  && <span>{item.icon}</span>}</span>
      <span className='tag-title'>{isopen && <span className='title'>{item.title}</span>}</span>  
      <span style={{display:isopen?"":"none"}} className='arrow-icon' onClick={()=> setisExpand (!isExpand)}><BiSolidRightArrow size={15} /></span>
      </div>
       
      <div className='childbar' >
        
        {item.children.map((child,index)=>{
          
          if(isExpand){
        return(   <div className='s-child' key={index}>
          <NavLink style={{textDecoration:"none"}} to={child.path}><div className= {isopen?'child-title':"none"} >{isopen&&<span >{child.title} </span>}</div></NavLink>
          </div>)}else{
            return(
              null

            )
          }
        })}
      </div>
          
        
      
      
      
    </div>
  )}else{
    return(
     <div className={isopen?"tags":"close-tags"} >
      
       <span className='tag-icons'> {item.icon && <span>{item.icon}</span>}
        </span> <div className='tag-title'>  {isopen && <a  style={{textDecoration:"none"}} href={item.path} className='title'> {item.title} </a>}  </div>
        
        </div>
    )
  }
}

export default Sidebaritems