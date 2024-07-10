// import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tab from "./Tab"
import './Home.css';
const Context =({switchh, setSwitchh, prevTab})=>{


    return(<div className='home-scroll-container'>       
    {Object.keys(switchh).map((key,value)=>{
        console.log("key and its value", key,switchh[key], value[0])
        if (!switchh[key][0]) {
            console.log('current tab', key)
        return <Tab key={key} Tabkey={key} switchh={switchh} setSwitchh={setSwitchh} prevtab={prevTab} />;
      }
      return null;
    })}
    </div>

)
}

export default Context