import React from 'react'
import "../search/search.css"
import {CgSearch} from 'react-icons/cg'
const Search = ({value,onchange}) => {
    
  return (
    <div className='searchbar' >
        <CgSearch className="searchicon" />
        <input  type='text' placeholder='Search Product' value={value} onChange={onchange}/>
    </div>
  )
}

export default Search