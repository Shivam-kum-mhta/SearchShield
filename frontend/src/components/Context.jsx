import React, { useState } from "react";
import Tab from "./Tab"
const Context =({switchh, setSearchkeys, searchkeys})=>{


    return(<>       
    {Object.keys(switchh).map(key=>{console.log(key, searchkeys[key])
        if (!switchh[key]) {
        return <Tab key={key} Tabkey={key} searchkeys={searchkeys} setSearchkeys={setSearchkeys}/>;
      }
      return null;
    })}
    </>

)
}
export default Context