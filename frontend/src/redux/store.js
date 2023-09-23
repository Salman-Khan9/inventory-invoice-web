import auth from "../redux/features/auth/authslice" 

const { configureStore } = require("@reduxjs/toolkit");
const store = configureStore({
    reducer:{
      auth : auth
    }
})
export {store}