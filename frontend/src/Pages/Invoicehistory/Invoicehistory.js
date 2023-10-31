import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../services/authService'


const Invoicehistory = () => {
    const [invoices, setinvoices] = useState([])
    useEffect(() => {
      const history=async ()=>{  
            const res = await axios.get(`${BACKEND_URL}/api/invoicehistory`)
                setinvoices(res.data)         
}
history();
}, [])
  return (
  <div>
    <h2>Invoice history</h2>
   <ul>
    {invoices.map((invoice,index)=>(
      <div key={index}>
        <li>{invoice._id}</li>
        
        <ul>
                {invoice.Clientinfo.map((info,index)=>(
                  <div key={index}>
                    <li>{info.clientname}</li>
                    <li>{info.address}</li>
                    <li>{info.email}</li>
                    <li>{info.contact}</li>
                    <li>{info.invoicenumber}</li>
                </div>
                ))}
              </ul>
        <ul>
          {invoice.productIdData.map((product,index)=>(
            
            <div key={index}>

              
              <li>Product quantity:-{product.quantity}</li>
              <li>Product INnumber:-{product.INnumber}</li>
              <li>Product ICnumber:-{product.ICnumber}</li>
              <li>Product quantity:-{product.quantity}</li>
              
            </div>
            
          ))}
        </ul>
        </div>
    ))}
   </ul>
   
  </div>
       
)}

export default Invoicehistory