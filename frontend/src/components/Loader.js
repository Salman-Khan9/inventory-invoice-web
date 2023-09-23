import React from 'react'
import  ReactDOM  from 'react-dom'
import loaderpic from "../images/loader.gif"
import "../css/loader.css"
const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
          <div className="loader">
            <img src={loaderpic} alt="Loading..." />
          </div>
        </div>,
        document.getElementById("loader")
      );
    };
    
    export const SpinnerImg = () => {
      return (
        <div className="--center-all">
          <img src={loaderpic} alt="Loading..." />
        </div>
      );
    };

export default Loader