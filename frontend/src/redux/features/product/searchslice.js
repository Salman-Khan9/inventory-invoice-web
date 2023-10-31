import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredproducts:[]
}

const searchslice = createSlice({
  name: "searchproduct",
  initialState,
  reducers: {
    filter_products : (state,action)=>{
        const {products,value}=action.payload
        const searched = products.filter((product)=>
      product.name.toLowerCase().includes(value.toLowerCase()) || product.model.toLowerCase().includes(value.toLowerCase()) )
      state.filteredproducts = searched

    }
  }
});

export const {filter_products} = searchslice.actions
export const selectfilteredproducts = (state)=> state.searchproduct.filteredproducts
export default searchslice.reducer