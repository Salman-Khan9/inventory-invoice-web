import {MdProductionQuantityLimits} from "react-icons/md"
import {MdDashboard} from "react-icons/md"
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import {  NavLink } from "react-router-dom"

const menu = [
    {
        title:"Dashboard",
        path : "/Dashboard",
        icon: <NavLink to={`/Dashboard`} style={{color:"black"}}><MdDashboard size={30}/></NavLink>

        
    },
    {
        title:"Add Product ",
        path : "/Addproduct",
        icon:<NavLink to={`/Addproduct`} style={{color:"black"}}><MdProductionQuantityLimits size={30}/></NavLink>
        
    },
   
   
    {
        title:"Invoice",
        path : "/createinvoice",
        icon: <NavLink to={`/createinvoice`} style={{color:"black"}}> <LiaFileInvoiceDollarSolid size={25}/></NavLink>
    }, 
   
]

export default menu