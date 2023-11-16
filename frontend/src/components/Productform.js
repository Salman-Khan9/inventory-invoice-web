import React, { useRef } from 'react'
import "../css/addproduct.css"
import { useLocation } from 'react-router-dom';
const Productform = ({
  ImagePreview,
  handleinputs,
  handleImageinputs,
  saveProduct,
  product,
  handleremoveimage
}) => {
  const inputFile = useRef(null); 
  const handleReset = () => { 
    if (inputFile.current) { 
        inputFile.current.value = ""; 
        inputFile.current.type = "text"; 
        inputFile.current.type = "file"; 
    } 
}; 
const ondelet=()=>{
  handleremoveimage()
  handleReset()
}
const location = useLocation()



  return (
    <div className='Productpagecontainer'>
      <h3 className='productheading'>Add New Product:</h3>

      <form id='userform' onSubmit={saveProduct} className='productform'>
       <div className='productdatacontainer'><label >Poduct Image:
        </label>
        <p>Supported Files jpg , jpeg , png</p>
         
          <input type='file'  ref={inputFile} name='image' accept="image/jpg,image/jpeg,image/png" onChange={(e)=>handleImageinputs(e)}/>

          {ImagePreview!=null?(
            <div>
                        {location.pathname ==="/Addproduct" && 
             <button className='remove-img-button' onClick={ondelet}> Remove Image</button>

               
              }
            <div className='imagepreview'>
              <img src={ImagePreview} height="350px"  alt='Product'/>

            </div>
            </div>
          ):(
<p>no image set for this product</p>

          )}
          </div> 
          
       <div className='productdatacontainer'> <div>  <label>Product Name:</label></div><input  type='text' name='name' value={product?.name.trim()} placeholder=' Product name'  onChange={(e)=>(handleinputs(e))}/>
       </div>
       <div className='productdatacontainer'> <div> <label>Product Price:</label></div><input  onWheel={(e) => e.target.blur()} type='number' name='price'value={product?.price.trim()} placeholder='Product price' onChange={(e)=>(handleinputs(e))}/></div>
       <div  className='productdatacontainer'> <div><label>Product Quantity:</label></div><input onWheel={(e) => e.target.blur()}   type='number' name='quantity'value={product?.quantity} placeholder=' Product quantity' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>Product Model:</label></div><input type='text' name='model'value={product?.model.trim()} placeholder='Product model' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>IN Number:</label></div><input type='text' name='INnumber'value={product?.INnumber.trim()} placeholder='IN Number' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>IC Code:</label></div><input type='text' name='ICnumber'value={product?.ICnumber.trim()} placeholder='IC Code' onChange={(e)=>(handleinputs(e))}/></div>
      <div className='productdatacontainer'><div> <label>Order Number:</label></div><input type='text' name='ordernumber'value={product?.ordernumber.trim()} placeholder='Order Number' onChange={(e)=>(handleinputs(e))}/></div>
           
          <div className='productdatacontainer'><div> <label>Description:</label></div>
          <textarea placeholder='Description' rows="4" cols="50" form='userform' name='description'value={product?.description} onChange={(e)=>(handleinputs(e))}   ></textarea>

           </div>
          <div>
            <button className='saveproduct' type='submit'>Add to Inventory</button>
          </div>
 </form>
    </div>
  )
}

export default Productform