import React from 'react'
import pic from "../images/logo.png"
import pic2 from "../images/home.jpg"
   import "../css/home.css"
import { Showonlogin, Showonlogout } from '../components/navbar/Navbar'
   
const home = () => {
  return (
   
   <div  className='home'>

    <nav className="navbar">
      <div className='container'>
        <img src={pic} className='logo' alt='none'/>
        <ul className='nav'>
          <Showonlogout>
        <li>
          <a href='/Register'>Register</a>
          </li><li>
          <a href='/Login'>Login</a>
          </li>
          </Showonlogout>
          <Showonlogin>

          <li>
          <a href='/Dashboard'>Dashboard</a>
          
        </li>
        </Showonlogin>
        </ul>
      </div>
    </nav>
    <div className='hero'>
      <div className='para'>
      <h1>INVENTORY & STOCK MANAGMENT SOLUTION</h1>
      <p>This is an inventory app where you can manage and control your products you can add remove and update the products you can add price and add different products in your inventory  </p>
      </div>
     <img src={pic2} className='home-pic' alt='none'/>
    </div>
    <div className='trial'>
     <button >Free Trial 1 Month</button>
    </div>
    <div className='footer'>
      <ul>
        <li>
       <h2>14k</h2>
       <p>Brand Owners</p>
        </li>
        <li>
          <h2>23k</h2>
          <p>Active Users</p>
          </li>
          <li>
          <h2>500+</h2>
          <p>Partners</p>

        </li>
      </ul>
    </div>
    
      </div>

      
    
  )
}

export default home