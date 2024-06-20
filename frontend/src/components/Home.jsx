import React from "react"
import { useEffect , useState} from "react";
import Context from "./Context";
import Switch from "./Switch";
const Home = ({ }) => {

const [search, setSearch] = useState('puppies');
const [snippet, setSnippet] = useState([])
const [content, setContent] = useState([])
const [context, setContext] = useState('')
const [prevTab, setPrevTab] = useState('id1')
const Access = async (url) => {
try{
    let response = await fetch(url);
    let data= await response.json();
    console.log(data);
    setSnippet(data.items);
  
    }catch(err){console.log('Remote Server error')}
}




useEffect(()=>{
    setSnippet()
    },[]
)

const fetchContent = async (query)=>{
    try{
        const response = await axios.get('https://localhost:5000/api/context' , {params: { url: contextLink },
    });
    setContent(response.data);
  } catch (err) {
    setError('Failed to fetch content');
  }
}

const tabswitch={id1:0}
const [switchh, setSwitchh] = useState(tabswitch)
const [searchkeys,setSearchkeys] = useState({})

const updateSwitch=(id)=>{
    console.log(id)
    console.log(prevTab)
    const newSwitchh = { ...switchh,[prevTab]:1, [id]: 0 };
    console.log('clicked', newSwitchh);
    setPrevTab(id)
    setSwitchh(newSwitchh)
}
const addTab=()=>{
    const newTab = `id${Object.keys(switchh).length+1}`
    console.log(newTab)
    const newSwitchh = { ...switchh,[prevTab]:1, [newTab]: 0 };
    setSwitchh(newSwitchh)
    setPrevTab(newTab)
    console.log('clicked', newSwitchh)
}

const deleteTab=()=>{
    console.log('deleting...')
    const newsearchkeys={...searchkeys}
    delete newsearchkeys[prevTab];
    console.log(Object.keys(switchh).length)
    if (Object.keys(switchh).length===1)
        {alert('cant delete'); return}
    console.log(Object.keys(switchh),'bruh')
    const posofTAB=Object.keys(switchh).indexOf(prevTab)

    if(posofTAB===Object.keys(switchh).length-1)
        { console.log('last tab');
        const afterDEL={...switchh, ['id1']:0}
        delete afterDEL[prevTab];
        setSwitchh(afterDEL)
        setPrevTab('id1')
        setSearchkeys(newsearchkeys)
        return}


    const nextTAB=Object.keys(switchh)[posofTAB+1]
    console.log("next",posofTAB, nextTAB)
    const afterDEL={...switchh, [nextTAB]:0}
    delete afterDEL[prevTab];

    console.log("afterDEL",afterDEL)
    //update the indices of TAB
    const updatedTABindex={}
    Object.keys(afterDEL).forEach((key,index)=>{
        console.log(key,index)
        if (index<posofTAB)
            updatedTABindex[key]=afterDEL[index]
        else
        updatedTABindex[`id${index+1}`]=afterDEL[key]
    console.log('updatedTABindex', updatedTABindex)
    })
    console.log('done')
    setSwitchh(updatedTABindex)

    const newkeys={}
    Object.keys(newsearchkeys).forEach((key,index)=>{
        if(index<posofTAB)
            newkeys[key]=newsearchkeys[index]
        else
        newkeys[`id${index+1}`]=newsearchkeys[key]
    })
    console.log(newkeys)
    setSearchkeys(newkeys)
}


return(<div style={{ backgroundColor:'black' }}>

    <div class="container flex mx-auto">
        <div class="sr-only peer space-x-10 flex">
            {Object.keys(switchh).map(key=>{return(<button key={key} onClick={()=>{ console.log('clicked'); updateSwitch(key)} } class="tab active px-6 py-2  m-2 my-2 rounded-full bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"><Switch id={key.replace('id', '')}  /></button>)})}
            <button onClick={()=>addTab()}> NEW </button>
            <button onClick={()=>deleteTab()}> DEL </button> </div></div>
        <Context switchh={switchh} searchkeys={searchkeys} setSearchkeys={setSearchkeys}/>

</div>);
} 

export default Home;