import React, { useEffect, useState } from 'react'
import { GetAllProductsThunk, selectisloading, selectproduct, singleProductThunk, updateProductThunk } from '../redux/features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Productform from '../components/Productform'
import RedirectUserHook from '../HOOKS/RedirectUserHook'

const Editproduct = () => {
    const navigate = useNavigate()
    const {id}=useParams()
    const isloading =useSelector(selectisloading)

    RedirectUserHook("/Login")
   
    
    const editproduct = useSelector(selectproduct)
    const dispatch = useDispatch()
    const [ProductImage, setProductImage] = useState("")
    const [ImagePreview, setImagePreview] = useState(null)
    const [product, setproduct] = useState(editproduct)
  
    const handleinputs=(e)=>{
      const {name,value}=e.target
      setproduct({...product , [name]:value})
    }
    const handleImageinputs = (e) => {
      if (e.target.files[0]) {
        setProductImage(e.target.files[0]);
  
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        return setProductImage(null);
      }
    };
    const handleremoveimage = (e) => {
      setProductImage(null);
  
      setImagePreview(null);
    };
  useEffect(() => {
    
    dispatch(singleProductThunk(id))
  }, [dispatch,id])
  useEffect(() => {
    
    setproduct(editproduct)
    setImagePreview(
        editproduct && editproduct.image ?`${editproduct.image.filepath}`:null
    )
  }, [editproduct])
 
 
  const saveProduct = async (e)=>{
    e.preventDefault()
    const formData = new FormData()

    formData.append("name", product?.name)
    formData.append("description", product?.description)
    formData.append("price", product?.price)
    formData.append("quantity", product?.quantity)
    formData.append("model", product?.model)
    formData.append("ordernumber", product?.ordernumber)
    formData.append("INnumber", product?.INnumber)
    formData.append("ICnumber", product?.ICnumber)
    if(ProductImage){
    formData.append("image", ProductImage)}else{
      formData.append("image",null)
    }
    
    console.log(ProductImage)
    console.log(...formData)

    
    
   await dispatch(updateProductThunk({id,formData}))
   await dispatch(GetAllProductsThunk())
   navigate("/Dashboard")
  }
  
  
  
  
    
  return (
    
   <div> { isloading && <Loader/>}
   <Productform
   product = {product}
   handleremoveimage={handleremoveimage}

   ProductImage = {ProductImage}
   ImagePreview = {ImagePreview}
   handleinputs = {handleinputs}
   handleImageinputs = {handleImageinputs}
   saveProduct = {saveProduct}
   /></div>
  )
}

export default Editproduct