import auth from "../redux/features/auth/authslice" 
import searchproduct from"../redux/features/product/searchslice"
import ProductReducer from "../redux/features/product/productSlice"
const { configureStore } = require("@reduxjs/toolkit");



const store = configureStore({
    reducer:{
      auth : auth,
      product:ProductReducer,
      searchproduct: searchproduct
       }
})
export {store}