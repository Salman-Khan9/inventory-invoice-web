import {GrContactInfo} from "react-icons/gr"
import {MdSupervisorAccount} from 'react-icons/md'
import {BiSolidUserAccount} from "react-icons/bi"
import {MdManageAccounts} from "react-icons/md"
import {MdProductionQuantityLimits} from "react-icons/md"
import {MdDashboard} from "react-icons/md"

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
        title:"Account",
        icon : <BiSolidUserAccount size={30}/>,
    
        children : [{

            title:"Profile",
            path:"/Profile",
            icon:<MdSupervisorAccount size={30}/>,
        },
    {
        title:"Edit Profile",
        path:"Edit-profile",
        icon:<MdManageAccounts size={30}/>
    }]
    },
   
    {
        title:"Report Bug",
        path : "/Report Bug",
        icon: <GrContactInfo size={30}/>
    },
   
]

export default menu