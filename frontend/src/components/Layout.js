import React from 'react'

import Footer from './Footer'
import Starter from './starter'

const Layout = ({children}) => {
  return (
    <>
    <div className='layout'>
    <Starter />
    <div style={{ minHeight: "90vh"  } } className="--pad">
      {children}
    </div>
    <Footer />
    </div></>

  )
}

export default Layout