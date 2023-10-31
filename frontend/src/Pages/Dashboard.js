import React, { useEffect } from 'react'
import RedirectUserHook from '../HOOKS/RedirectUserHook'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProductsThunk, } from '../redux/features/product/productSlice'
import { selectisloggedin } from '../redux/features/auth/authslice'
import Producrlist from '../components/product/Producrlist'

const Dashboard = () => {
  const dispatch = useDispatch()
  const {Products,loading,isError,message} = useSelector((state)=> state.product)
const isloggedin = useSelector(selectisloggedin)
  RedirectUserHook("/Login")
  useEffect(() => {
   if(isloggedin===true){
    dispatch(GetAllProductsThunk())
  
  }
  

   if(isError){
    console.log(message)
   }
    
  }, [isloggedin,isError,message,dispatch])
  

  return (
    
    <div>
      
     <Producrlist products={Products} 
            loading = {loading}
      /></div>
  )
}

export default Dashboard