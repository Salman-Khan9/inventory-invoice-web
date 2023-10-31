import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from '../../../services/productservice';
import { toast } from 'react-toastify';

const initialState = {
  loading:false,
  Product:null,
Products:[],
isSuccess:false,
isError:false,
message:"",
}

export const createproductThunk = createAsyncThunk(
    "Product/create",
   
    async (formData,thunkAPI)=>{
         try {
            
              
             const response = await productService.createProduct(formData)
             return response.data
         } catch (error) {
            const message =(
                error.response &&error.response.data&&error.response.data.message
            )|| error.message||error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
         }
    }
)  
export const GetAllProductsThunk = createAsyncThunk(
  "Product/Getallprodcts",
  async (_,thunkAPI)=>{
   try {
     const response =  await productService.GetAllProducts()
     return response.data
   } catch (error) {
     const message = (
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   console.log(message)
   return thunkAPI.rejectWithValue(message)
   }
  }
 
 )
 export const deleteProductThunk = createAsyncThunk(
  "Product/delete",
  async (id,thunkAPI)=>{
   try {
     const response =  await productService.deleteproduct(id)
     return response.data
   } catch (error) {
     const message = (
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   console.log(message)
   return thunkAPI.rejectWithValue(message)
   }
  }
 
 ) 
 export const singleProductThunk = createAsyncThunk(
  "Product/Single",
  async (id,thunkAPI)=>{
   try {
     const response =  await productService.Singleproduct(id)
     return response.data
   } catch (error) {
     const message = (
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   console.log(message)
   return thunkAPI.rejectWithValue(message)
   }
  }
 
 )
 export const updateProductThunk = createAsyncThunk(
  "Product/Update",
  async ({id,formData},thunkAPI)=>{
   try {
     const response =  await productService.updateproduct(id,formData)
     return response.data
   } catch (error) {
     const message = (
       error.response &&error.response.data&&error.response.data.message
   )|| error.message||error.toString();
   console.log(message)
   return thunkAPI.rejectWithValue(message)
   }
  }
 
 )


const CreateProduct = createSlice({
  name: "product",
  initialState,
  reducers: {
    Cal_Store_Val(state){
        console.log("state")
    }
  },
  extraReducers:(builder)=>{
   builder 
   .addCase(createproductThunk.pending,(state)=>{
    state.loading = true
   })
   .addCase(createproductThunk.fulfilled,(state,action)=>{
    state.loading=false
    state.isSuccess=true
    console.log(action.payload)
    state.Products.push(action.payload)
    toast.success("Product added successfully")
   })
   .addCase(createproductThunk.rejected,(state,action)=>{
    state.isError=true
    state.loading=false
    state.isSuccess=false
    state.message=action.payload
   })
   .addCase(GetAllProductsThunk.pending,(state)=>{
    state.loading = true
   })
   .addCase(GetAllProductsThunk.fulfilled,(state,action)=>{
       state.loading = false
       state.isSuccess = true
       state.isError = false
       state.Products = action.payload
   })
   .addCase(GetAllProductsThunk.rejected,(state,action)=>{
    state.isError = true
    state.loading = false
    state.message = action.payload
   }).addCase(deleteProductThunk.pending,(state)=>{
    state.loading = true
   })
   .addCase(deleteProductThunk.fulfilled,(state,action)=>{
       state.loading = false
       state.isSuccess = true
       state.isError = false
      
   })
   .addCase(deleteProductThunk.rejected,(state,action)=>{
    state.isError = true
    state.loading = false
    state.message = action.payload
   })
   .addCase(singleProductThunk.pending,(state)=>{
    state.loading = true
   })
   .addCase(singleProductThunk.fulfilled,(state,action)=>{
       state.loading = false
       state.isSuccess = true
       state.isError = false
       state.Product = action.payload
      
   })
   .addCase(singleProductThunk.rejected,(state,action)=>{
    state.isError = true
    state.loading = false
    state.message = action.payload
   })
   .addCase(updateProductThunk.pending,(state)=>{
    state.loading = true
   })
   .addCase(updateProductThunk.fulfilled,(state,action)=>{
       state.loading = false
       state.isSuccess = true
       state.isError = false
toast.success("Product updated successfully")      
   })
   .addCase(updateProductThunk.rejected,(state,action)=>{
    state.isError = true
    state.loading = false
    state.message = action.payload
   })

  }
  
});

export const {Cal_Store_Val} = CreateProduct.actions
export const selectisloading = (state)=> state.product.loading
export const selectproduct = (state)=> state.product.Product
export const selectproducts = (state)=> state.product.Products


export default CreateProduct.reducer