// import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tab from "./Tab"
import './Home.css';
const Context =({switchh, setSwitchh})=>{


    return(<div className='home-scroll-container'>       
    {Object.keys(switchh).map((key,value)=>{
        console.log("key and its value", key,switchh[key], value[0])
        if (!switchh[key][0]) {
            console.log('current tab', key)
        return <Tab key={key} Tabkey={key} switchh={switchh} setSwitchh={setSwitchh}  />;
      }
      return null;
    })}
    </div>

)
}

Context.propTypes = {
    // Define prop types here
    switchh: PropTypes.object.isRequired,
    setSwitchh: PropTypes.func.isRequired,}

export default Context