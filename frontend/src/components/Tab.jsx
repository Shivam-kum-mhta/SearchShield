import React, { useState , useEffect} from "react";
import Searchpg from "./Searchpg";
const Tab=({Tabkey, setSearchkeys, searchkeys})=>{

    return(<>
      {Array.isArray(searchkeys[Tabkey]) && searchkeys[Tabkey].length>0 ? (<div style={{    display: 'flex', flexFlow: 'column', gap: '8vh'}}>
            {searchkeys[Tabkey].map((item)=>{   return(<div className='flex items-center justify-center' style={{display:'flex',alignItems:'center',gap: '200px'}} key={item.title} > 
            <div className="img" style={{marginLeft:'4vw'}} ><img  width='450px' height='300px' onClick={()=>fetchContent(item.contextLink)}  src={item.link} alt="" /></div>
            <div style={{ fontSize: '4vh'}}>{item.title} </div>
                                        </div>);  })}
                    </div>)
                    : (<Searchpg searchkeys={searchkeys} setSearchkeys={setSearchkeys} Tabkey={Tabkey}/>) }
    </>);
}

export default Tab
