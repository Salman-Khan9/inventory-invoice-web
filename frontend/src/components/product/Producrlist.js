import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import "./product.css"
import {MdChangeCircle} from "react-icons/md"
import {BsFillEyeFill} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import Search from '../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { filter_products, selectfilteredproducts } from '../../redux/features/product/searchslice'
import { GetAllProductsThunk, deleteProductThunk } from '../../redux/features/product/productSlice';
import { Link } from 'react-router-dom';

const Producrlist = ({products,loading}) => {

    const dispatch = useDispatch()
    const filteredproducts = useSelector(selectfilteredproducts)
    const [value, setvalue] = useState("")
    const onchange = (e)=>{
      setvalue(e.target.value)
    
    }
    const shortlength = (data)=>{
        if(data.length>16){
            return data.slice(0,16)+"..."
        }else{
            return data
        }

    }
    const delproduct =async (id)=>{
      await  dispatch(deleteProductThunk(id))
        await dispatch(GetAllProductsThunk())
      }
      const  Confirmdelete = (id)=>{
        confirmAlert({
          title: 'Delete Product',
          message: 'Are you sure to delete this product.',
          buttons: [
            {
              label: 'Confirm',
              onClick: () => delproduct(id)
            },
            {
              label: 'Cancel',
              
            }
          ]
        });
    
      }
    useEffect(() => {
      
      dispatch(filter_products({products,value}))
    }, [products,value,dispatch])
    
  
 
    return (
    <div className='Productlist'>
        <div className='head'>
            <span className='dashboardheading'>Inventory items</span>
            <span><Search value={value} onchange={onchange}/></span>
        </div>
        <div className='table'>
        
                { !loading && filteredproducts.length === 0?(
                    <p>no product found</p>
                ):(
          <table>
            <thead>
                <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Actions</th>
                    <th>Order Number</th>
                    <th>IN Number</th>
                    <th>IC Number</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredproducts.map((product,index)=>{
                        const {_id,name,model,quantity,price,ICnumber,INnumber,ordernumber} = product

                        return(
                        <tr key={_id}>
                            <td >{index+1}</td>
                            <td>{shortlength(name)}</td>
                            <td>{model}</td>
                            
                            
                            <td>{quantity}</td>
                            <td>{price}</td>
                            <td>{quantity*price}</td>
                            <td><Link to={`/UpdateProduct/${_id}`}> <MdChangeCircle size={20}  color='Purple'/> </Link>
                            <Link to={`/Productdetail/${_id}`}><BsFillEyeFill size={20} color='green'/></Link>
                            <MdDelete cursor="pointer" size={20} color='red' onClick={()=>Confirmdelete(_id)}/></td>
                            <td>{ordernumber}</td>
                            <td>{INnumber}</td>
                            <td>{ICnumber}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
          </table>
                )}
        </div>
               
        
  </div>
  )
}

export default Producrlist