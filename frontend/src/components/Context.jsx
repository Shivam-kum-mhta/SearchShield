import React, { useState } from "react";
import Tab from "./Tab"
const Context =({switchh, setSwitchh})=>{


    return(<>       
    {Object.keys(switchh).map((key,value)=>{
        console.log("key and its value", key, value[0])
        if (!switchh[key][0]) {
            console.log('current tab', key)
        return <Tab key={key} Tabkey={key} switchh={switchh} setSwitchh={setSwitchh}/>;
      }
      return null;
    })}
    </>

)
}
export default Context