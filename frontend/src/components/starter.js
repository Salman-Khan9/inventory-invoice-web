import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LogoutUser } from '../services/authService'
import { Set_isloggedin, selectName } from '../redux/features/auth/authslice'
import "../css/starter.css"

const Starter = () => {
const name = useSelector(selectName)

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const logout = async()=>{
   
    try {
      await LogoutUser()
     await dispatch(Set_isloggedin(false))
     Navigate("/")    
    } catch (error) {
      return error
    }
  }
  return (
     <div className="layout-header">
    <div className="layout-header-3">
      <div className='layout-header-2'>
        <span className="--fw-thin">Welcome, </span>
        <span className="--color-danger">{name}</span>
      </div>
      <button onClick={logout} className='logout-button' >
        Logout
      </button>
    </div>
    
  </div>
  )
}

export default Starter