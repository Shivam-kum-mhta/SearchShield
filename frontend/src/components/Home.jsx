import Context from "./Context";
import Switch from "./Switch";
import PropTypes from 'prop-types';
import close from '../assets/close2.avif'
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


const updateSwitch= (key)=>{
    switchh[prevTab][0]=1
    console.log("prevtab=====",prevTab)
    setPrevTab(key)
    switchh[key][0]=0
    const newSwitchh = { ...switchh};
    console.log("newSwitchh",newSwitchh)
   
     setSwitchh(newSwitchh)
    console.log('switched to tab', key, 'prevtab is set to',prevTab);
}


const deleteTab=(tempprevTab)=>{
    console.log('deleting...');
    if (Object.keys(switchh).length===1)
        {alert('cant delete'); return}
    console.log(Object.keys(switchh),'bruh')
    const posofTAB=Object.keys(switchh).indexOf(tempprevTab)
    console.log('position of current Tab', posofTAB);
    const newSwitchh = { ...switchh };
    if(posofTAB===Object.keys(switchh).length-1)
        { console.log('last tab');
            delete newSwitchh[tempprevTab];
            newSwitchh['id1'][0] = 0;
            setSwitchh(newSwitchh);
            setPrevTab('id1');
        return}


    const nextTAB=Object.keys(switchh)[posofTAB+1]
    console.log("posofTAB",posofTAB, 'nextTAB', nextTAB)
    delete newSwitchh[tempprevTab];
    newSwitchh[prevTab][0] =1
    newSwitchh[nextTAB][0] = 0;
   

  
    //update the indices of TAB
    const afterDEL={...newSwitchh}
    console.log("afterDEL",afterDEL)
    const updatedTABindex={}
    Object.keys(afterDEL).forEach((key,index)=>{
        console.log('key=', key,'index=', index)
         if (index < posofTAB) {
                updatedTABindex[key] = newSwitchh[key];
            } else {
                updatedTABindex[`id${index + 1}`] = newSwitchh[key];
            }
        });
        console.log('deleted');
        setSwitchh(updatedTABindex);
        const s=Object.keys(switchh)[posofTAB]
        console.log("prevtab is set to ?",s)
        setPrevTab(s)
    
    };


    


// const updatedeleteTab=(key)=>{updateSwitch(key)
//   setTimeout(()=> deleteTab(), 3000)
 
// }

const updatedeleteTab=(key)=>{
    console.log('prevtab====', prevTab)
    // setPrevTab(key); // Schedule state update
    const tempprevTab=key
     deleteTab(tempprevTab)

}



return(
  <div style={{ backgroundColor:'black' }}>

  <div className="container flex mx-auto">
      <div className="container  flex">
          {Object.keys(switchh).map(key=>{return(<div key={key} className='flex'> <div key={key} onClick={()=>{ console.log('clicked'); updateSwitch(key)} } >
         <div className="tab active overflow-hidden overflow-ellipsis whitespace-nowrap px-4 pt-2 h-[10vh] w-[8vw] text-[small]
border-black border-2 bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"> <Switch searchkey={switchh[key][2]}  /></div> </div>
       
          <img onClick={()=>{ updatedeleteTab(key);}} className="h-[10vh] w-[1.5vw]"
                src={close}/>
   </div>)})}</div></div>
      <Context switchh={switchh} setSwitchh={setSwitchh}/>

</div>
    );
} 

Home.propTypes = {
  // Define prop types here
  switchh: PropTypes.string.isRequired,
  prevTab: PropTypes.string.isRequired,
  setPrevTab: PropTypes.string.isRequired,
  setSwitchh: PropTypes.string.isRequired,
  // Add more as needed
}

export default Home;