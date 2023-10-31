import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Forgot from "./Pages/Forgot";
import Resetpage from "./Pages/Resetpage";
import Sidebar from "./components/Sidebar.js";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import axios from "axios"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LogStatus } from "./services/authService";
import { Set_isloggedin } from "./redux/features/auth/authslice";
import AddProduct from "./Pages/AddProduct";
import Productdetail from "./components/product/Productdetail";
import Editproduct from "./Pages/Editproduct";
import Invoice from "./Pages/Invoice";
import Invoicehistory from "./Pages/Invoicehistory/Invoicehistory";
  
  
axios.defaults.withCredentials=true
function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    async function loggedstatus (){
      const status = await LogStatus()
      dispatch(Set_isloggedin(status))
}loggedstatus()
    
    
  }, [dispatch])
  return (
   <BrowserRouter>
   <ToastContainer/>
   <Routes>
    <Route path="/" element = {<Home/>}  />
    <Route path="/Register" element = {<Register/>}  />
    <Route path="/Login" element = {<Login/>}  />
    <Route path="/Forgot" element = {<Forgot/>}/>
    <Route path="/Resetpass/:resettoken" element = {<Resetpage />} />
    <Route path="/Dashboard" element = {
      <Sidebar>
        <Layout>
          <Dashboard/>
        </Layout>
      </Sidebar>
      
     }/>  
     <Route path="/Addproduct" element = {
      <Sidebar>
        <Layout>
          <AddProduct/>
        </Layout>
      </Sidebar>
      
     }/>
       <Route path="/Productdetail/:id" element = {
      <Sidebar>
        <Layout>
          <Productdetail/>
        </Layout>
      </Sidebar>
      
     }/>  
     <Route path="/UpdateProduct/:id" element = {
      <Sidebar>
        <Layout>
          <Editproduct/>
        </Layout>
      </Sidebar>
      
     }/>
      <Route path="/createinvoice" element = {
      <Sidebar>
        <Layout>
          <Invoice/>
        </Layout>
      </Sidebar>
      
     }/><Route path="/invoicehistory" element = {
      <Sidebar>
        <Layout>
          <Invoicehistory/>
        </Layout>
      </Sidebar>
      
     }/>
     
     



   </Routes>
   </BrowserRouter>
  );
}

export default App;
