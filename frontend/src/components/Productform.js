import React from 'react'
import "../css/addproduct.css"
const Productform = ({
  ImagePreview,
  handleinputs,
  handleImageinputs,
  saveProduct,
  product
}) => {
  return (
    <div className='Productpagecontainer'>
      <h3 className='productheading'>Add New Product :</h3>

      <form id='userform' onSubmit={saveProduct} className='productform'>
       <div className='productdatacontainer'><label >Poduct Image :
        </label>
        <p>Supported Files jpg , jpeg , png</p>
          <input type='file' name='image'  onChange={(e)=>handleImageinputs(e)}/>
          {ImagePreview!=null?(
            <div className='imagepreview'>
              <img src={ImagePreview} height="350px"  alt='Product'/>

            </div>
          ):(
<p>no image set for this product</p>

          )}
          </div> 
          
       <div className='productdatacontainer'> <div>  <label>Product Name :</label></div><input type='text' name='name' value={product?.name} placeholder=' Product name'  onChange={(e)=>(handleinputs(e))}/>
       </div>
       <div className='productdatacontainer'> <div> <label>Product Price :</label></div><input type='text' name='price'value={product?.price} placeholder='Product price' onChange={(e)=>(handleinputs(e))}/></div>
       <div  className='productdatacontainer'> <div><label>Product Quantity :</label></div><input type='number' name='quantity'value={product?.quantity} placeholder=' Product quantity' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>Product Model :</label></div><input type='text' name='model'value={product?.model} placeholder='Product model' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>IN Number :</label></div><input type='text' name='INnumber'value={product?.INnumber} placeholder='IN Number' onChange={(e)=>(handleinputs(e))}/></div>
       <div className='productdatacontainer'><div> <label>IC number :</label></div><input type='text' name='ICnumber'value={product?.ICnumber} placeholder='IC Number' onChange={(e)=>(handleinputs(e))}/></div>
      <div className='productdatacontainer'><div> <label>Order Number :</label></div><input type='text' name='ordernumber'value={product?.ordernumber} placeholder='Order Number' onChange={(e)=>(handleinputs(e))}/></div>
           
          <div className='productdatacontainer'><div> <label>Description :</label></div>
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