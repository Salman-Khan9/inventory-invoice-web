import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/invoice.css"
import {
  GetAllProductsThunk,
  selectisloading,
  selectproducts,
} from "../redux/features/product/productSlice";
import {
  filter_products,
  selectfilteredproducts,
} from "../redux/features/product/searchslice";
import Search from "../components/search/Search";
import axios from "axios";
const backend_url = process.env.REACT_APP_BACKEND_URL

const initialstate={
  clientname:"",
  contactnumber:"",
  invoicenumber:"",
  email:"",
  address:"",
  
}
const Invoice = () => {
  const [clintinfo, setclintinfo] = useState(initialstate)
  const {clientname,contactnumber, email,invoicenumber,  address}=clintinfo
  const [qty, setQuantity] = useState({qty:0});
  const [finalprice, setfinalprice] = useState({finalprice:0})
  const [apiData, setApiData] = useState({});
  const loading = useSelector(selectisloading);
  const shortlength = (data) => {
    if (data.length > 16) {
      return data.slice(0, 16) + "...";
    } else {
      return data;
    }
  };
  const [value, setvalue] = useState("");
  
  const oninfochange = (e,)=>{
    const {name,value}= e.target
    setclintinfo({...clintinfo,[name]:value})
 }
 const clientinfo = {clientname,contactnumber, email,invoicenumber,  address}
  const onchange = (e) => {
    
    setvalue(e.target.value);
  };
 
  const products = useSelector(selectproducts);
  const filteredproducts = useSelector(selectfilteredproducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filter_products({ products, value }));
  }, [products, value, dispatch]);

  const onCreateData = (e, product) => {
    console.log(e.target, product);
    if (e.target.checked ) {
      setApiData({
        

        ...apiData,
        [e.target.name]: {
      
          
          ordernumber:product.ordernumber,
          name:product.name,
          model:product.model,
          INnumber:product.INnumber,
          ICnumber:product.ICnumber,
          
          id: product._id,
          quantity: qty[e.target.name],
          finalprice: parseInt(finalprice[e.target.name])
        },
        
      },

      
      );
     
    } else {
      Reflect.deleteProperty(apiData, e.target.name);
    }
  };

  const onRefreshData = (e, quantity, sku, id,ordernumber,INnumber,ICnumber,name,model) => {
    if (e.target.value <= parseInt(quantity)) {
      if (apiData[e.target.name]) {
        setApiData({
        

          ...apiData,
          [e.target.name]: {
            
            
        
          ordernumber,INnumber,ICnumber,name,model,
            quantity: parseInt( e.target.value),
            id,
            finalprice:parseInt(finalprice[e.target.name])

          },
          
        },

        )
      }
      
      
      setQuantity({ ...qty, [sku]: parseInt(e.target.value) });
    } else {
      
      setQuantity({ ...qty, [sku]: parseInt(quantity) });
      setApiData({
        

        ...apiData,
        [e.target.name]: {
          
      
          
          ordernumber,INnumber,ICnumber,name,model,
          quantity: parseInt(quantity),
          id,
          finalprice:parseInt(finalprice[e.target.name])
        }, 
        
      },
      );
    }
  };
  const onfinalpricechange = (e,sku,product)=>{
   setApiData(
      {
        
        ...apiData,
        [e.target.name]: {
          
      
         
          ordernumber:product.ordernumber,
          name:product.name,
          model:product.model,
          INnumber:product.INnumber,
          ICnumber:product.ICnumber,
          id: product._id,
          quantity: qty[e.target.name],
          finalprice:parseInt(e.target.value)
        },
        
      },
    )
    setfinalprice({...finalprice, [sku]: parseInt(e.target.value)})   
}
console.log("final price ==",finalprice)
  console.log(apiData);

  const save = async ()=>{
   
   const res =  await axios.post(`${backend_url}/api/createinvoice`, {apiData,clientinfo} ,{responseType :"arraybuffer"})

  console.log(res)
  const blob = new Blob([res.data], { type: 'application/pdf', });
      const url = window.URL.createObjectURL(blob);
      window.open(url);

  }

  return (
    
    <div className="Productlist">
     
      <h2 className="dashboardheading">Client Information </h2>
      
      <div>  <span className="invoiceheading">Client Name :</span> <input type="text"  className="invoiceinput"  name="clientname" value={clientname} onChange={oninfochange} />
      <span className="invoiceheading">Email :</span>  <input type="text"  className="invoiceinput"  name="email" value={email} onChange={oninfochange} />
     <span className="invoiceheading">Contact :</span>  <input type="text"  className="invoiceinput"  name="contactnumber" value={contactnumber} onChange={oninfochange} />
     <span className="invoiceheading">Invoice Number:</span> <input  type="text"  className="invoiceinput" name="invoicenumber" value={invoicenumber} onChange={oninfochange} />
      
      </div>
        <span className='addressheading'> <label>Address : </label></span>
          <textarea className="address" placeholder='Address' rows="3" cols="30" name='address'value={address} onChange={oninfochange}   ></textarea>
      
      <hr></hr>
      <div className="head">
        <span className="dashboardheading">Select Items</span>
        <button className="invoicebutton" onClick={save} >Create Invoice</button>

        <span>
          <Search value={value} onchange={onchange} />
        </span>
      </div>
      
      <div className="table">
        {!loading && filteredproducts.length === 0 ? (
          <p>no product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>select</th>
                <th>name</th>
                <th>model</th>
                <th>Order Number</th>
                <th>IN Number</th>
                <th>IC Code</th>
                <th>Total quantity</th>
                <th>quantity</th>
              
                <th>price</th>
                <th>final price</th>

                <th>value</th>

              </tr>
            </thead>
            <tbody>
              {filteredproducts.map((product, index) => {
                const { _id, name, model, quantity, price, sku,ICnumber,INnumber,ordernumber } = product;
                
                return (
                  <tr key={_id}>
                    <td>
                      <input
                        type="checkbox"
                        name={sku}
                        onClick={(e) => onCreateData(e, product)}
                      />
                    </td>
                    <td>{shortlength(name)}</td>
                    <td>{model}</td>
                    <td>{ordernumber}</td>
                    <td>{INnumber}</td>
                    <td>{ICnumber}</td>
                    <td>{quantity}</td>



                    <td >
                      <input
                        type="number"
                        required
                        name={sku}
                        value={qty[sku]}
                        onChange={(e) => onRefreshData(e, quantity, sku, _id,ordernumber,INnumber,ICnumber,name,model)}
                      />
                    </td>
                    <td>{price}</td>

                    <td><input 
                      type="number" name={sku} value={finalprice[sku]} onChange={(e)=>onfinalpricechange(e,sku,product)}/></td>
                    <td>{quantity * price}</td>
                 
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Invoice;
