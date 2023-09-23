import { createSlice } from '@reduxjs/toolkit'
const name = JSON.parse(localStorage.getItem("name"))
const initialState = {
isloggedin : false,
name : name ? name : "",
user:{
  name:"",
  email:"",
  phone:"",
  bio:"",
  photo:"",
}
}

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Set_isloggedin(state,action){
      state.isloggedin=action.payload
    },set_name(state,action){
      localStorage.setItem("name",JSON.stringify(action.payload))
      state.name = action.payload
    },set_user(state,action){
      const profile = action.payload
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.phone= profile.phone
      state.user.bio = profile.bio
      state.user.photo = profile.photo
    }
  }
});

export const {Set_isloggedin,set_name,set_user} = authslice.actions
export const selectisloggedin = (state)=> state.auth.isloggedin
export const selectName = (state)=> state.auth.name
export const selectisUser = (state)=> state.auth.user
export default authslice.reducer