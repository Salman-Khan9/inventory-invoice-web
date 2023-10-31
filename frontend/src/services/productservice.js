import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const ProductApi= `${BACKEND_URL}/api/product`
export const createProduct = async(formData)=>{
    const response = await axios.post(ProductApi,formData)
    return response
}
export const GetAllProducts = async()=>{
    const response = await axios.get(`${ProductApi}/allproducts`)
    return response
}
export const deleteproduct = async(id)=>{
    const response = await axios.delete(`${ProductApi}/delete/`+id)
    toast.success("Product deleted")
    return response
}
export const Singleproduct = async(id)=>{
    const response = await axios.get(`${ProductApi}/singleproduct/`+id)
    return response
}
export const updateproduct = async(id,formData)=>{
    const response = await axios.patch(`${ProductApi}/update/`+id,formData)
    return response
}
const productService ={
    createProduct,
    GetAllProducts,
    deleteproduct,
    Singleproduct,
    updateproduct
}
export default productService