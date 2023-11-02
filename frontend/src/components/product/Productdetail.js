import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectisloggedin } from '../../redux/features/auth/authslice'
import { singleProductThunk } from '../../redux/features/product/productSlice'
import RedirectUserHook from '../../HOOKS/RedirectUserHook'

const Productdetail = () => {
  RedirectUserHook("/Login")

  const {id} = useParams()

const dispatch = useDispatch()

  const loggedin = useSelector(selectisloggedin)
  const {Product,isError,message} = useSelector((state)=> state.product)
  useEffect(() => {
    if(loggedin===true){
      dispatch(singleProductThunk(id))
    }
    if(isError){
      console.log(message)
     }

    }
    
  , [id,loggedin,isError,message,dispatch])
  
  return (
    <div className='viewproductcontainer'>
      <h3>Product Image :</h3>
      <div className='viewproduct'>{Product?.image?(<img height="200px" src={Product.image.filepath }alt=''/>):(<p style={{color:"#b23b3b"}}>No image set for this product</p>)}</div>
      <h3>Product Name :</h3>

      <div className='viewproduct'>{Product?.name}</div>
      <h3>Product Price :</h3>

      <div className='viewproduct'>{Product?.price}</div>
      <h3>Product Quantity :</h3>

      <div className='viewproduct'>{Product?.quantity}</div>
      <h3>Product Model :</h3>

      <div className='viewproduct'>{Product?.model}</div>
      <h3>Product Sku :</h3>

      <div className='viewproduct'>{Product?.sku}</div>
      <h3>Product IN Number :</h3>

<div className='viewproduct'>{Product?.INnumber}</div>
 <h3>IC Code :</h3>

<div className='viewproduct'>{Product?.ICnumber}</div> 
<h3>Order Number :</h3>

<div className='viewproduct'>{Product?.ordernumber}</div>
    </div>
    
  )
}

export default Productdetail