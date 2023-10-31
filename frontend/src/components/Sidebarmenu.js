import {MdProductionQuantityLimits} from "react-icons/md"
import {MdDashboard} from "react-icons/md"
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import {FaHistory} from 'react-icons/fa'

const menu = [
    {
        title:"Dashboard",
        path : "/Dashboard",
        icon:<MdDashboard size={30}/>

        
    },
    {
        title:"Add Product ",
        path : "/Addproduct",
        icon:<MdProductionQuantityLimits size={30}/>
        
    },
   
   
    {
        title:"Invoice",
        path : "/createinvoice",
        icon: <LiaFileInvoiceDollarSolid size={25}/>
    }, {
        title:"Invoice History",
        path : "/invoicehistory",
        icon: <FaHistory size={20}/>
    },
   
]

export default menu