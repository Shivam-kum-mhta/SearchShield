import React from "react";
const Switch=({searchkey})=>{
    return(<> {searchkey? (<> {searchkey} </>) : (<> Welcome</>) } </>)
}

export default Switch