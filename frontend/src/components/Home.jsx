import React from "react"
import { useEffect , useState} from "react";
import Context from "./Context";
import Switch from "./Switch";
const Home = ({switchh, setSwitchh, prevTab, setPrevTab}) => {



const fetchContent = async (query)=>{
    try{
        const response = await axios.get('https://localhost:5000/api/context' , {params: { url: contextLink },
    });
    setContent(response.data);
  } catch (err) {
    setError('Failed to fetch content');
  }
}


const updateSwitch=(key)=>{
    switchh[prevTab][0]=1
    switchh[key][0]=0
    const newSwitchh = { ...switchh};
    setPrevTab(key)
    setSwitchh(newSwitchh)
    console.log('switched to tab', key);
}


const deleteTab=()=>{
    console.log('deleting...')
    if (Object.keys(switchh).length===1)
        {alert('cant delete'); return}
    console.log(Object.keys(switchh),'bruh')
    const posofTAB=Object.keys(switchh).indexOf(prevTab)

    if(posofTAB===Object.keys(switchh).length-1)
        { console.log('last tab');
        delete switchh[prevTab];
        switchh['id1'][0]=0
        const newSwitchh={...switchh}
        setSwitchh(newSwitchh)
        setPrevTab('id1')
        return}


    const nextTAB=Object.keys(switchh)[posofTAB+1]
    console.log("posofTAB",posofTAB, 'nextTAB', nextTAB)
    delete switchh[prevTab]
    switchh[nextTAB][0]=0
   

  
    //update the indices of TAB
    const afterDEL={...switchh}
    console.log("afterDEL",afterDEL)
    const updatedTABindex={}
    Object.keys(afterDEL).forEach((key,index)=>{
        console.log('key=', key,'index=', index)
        if (index<posofTAB)
            updatedTABindex[key]=afterDEL[key]
        else{
        updatedTABindex[`id${index+1}`]=afterDEL[key]
    console.log('updatedTABindex', updatedTABindex)}
    })
    console.log('deleted')
    setSwitchh(updatedTABindex)
}


return(<div style={{ backgroundColor:'black' }}>

    <div class="container flex mx-auto">
        <div class="sr-only peer space-x-10 flex">
            {Object.keys(switchh).map(key=>{return(<button key={key} onClick={()=>{ console.log('clicked'); updateSwitch(key)} } class="tab active px-6 py-2  m-2 my-2 rounded-full bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"><Switch id={key.replace('id', '')}  /></button>)})}
            <button onClick={()=>deleteTab()}> DEL </button> </div></div>
        <Context switchh={switchh} setSwitchh={setSwitchh}/>

</div>);
} 

export default Home;