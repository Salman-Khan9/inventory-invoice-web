import {MdProductionQuantityLimits} from "react-icons/md"
import {MdDashboard} from "react-icons/md"
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import { Link } from "react-router-dom"

const menu = [
    {
        title:"Dashboard",
        path : "/Dashboard",
        icon: <Link to={`/Dashboard`} style={{color:"black"}}><MdDashboard size={30}/></Link>

        
    },
    {
        title:"Add Product ",
        path : "/Addproduct",
        icon:<Link to={`/Addproduct`} style={{color:"black"}}><MdProductionQuantityLimits size={30}/></Link>
        
    },
   
   
    {
        title:"Invoice",
        path : "/createinvoice",
        icon: <Link to={`/createinvoice`} style={{color:"black"}}> <LiaFileInvoiceDollarSolid size={25}/></Link>
    }, 
   
]

export default menu