import Context from "./Context";
import Switch from "./Switch";
import PropTypes from 'prop-types';
import './Home.css'
import Sidebar from "./Sidebar";
import { useRef } from "react";
import closealltab from '../assets/closealltab.png'
const Home = ({switchh, setSwitchh, prevTab, setPrevTab, setSearch}) => {


// const fetchContent = async (query)=>{
//     try{
//         const response = await axios.get('https://localhost:5000/api/context' , {params: { url: contextLink },
//     });
//     setContent(response.data);
//   } catch (err) {
//     setError('Failed to fetch content');
//   }
// }


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
    if (prevTab!==tempprevTab)
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
   const componentRef = useRef(null);

    const enterFullScreen = () => {
        if (componentRef.current.requestFullscreen) {
            componentRef.current.requestFullscreen();
        } else if (componentRef.current.mozRequestFullScreen) { // Firefox
            componentRef.current.mozRequestFullScreen();
        } else if (componentRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
            componentRef.current.webkitRequestFullscreen();
        } else if (componentRef.current.msRequestFullscreen) { // IE/Edge
            componentRef.current.msRequestFullscreen();
        }
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    };



return(
    <div ref={componentRef} className="h-full ">
          <div className="container flex mx-auto overflow-auto;">
  {Object.keys(switchh).map(key=>{return(<div key={key} className='flex [border-left-color:white] border-l-[thin]' style={{    backgroundColor:'black'}}>
         <div key={key} onClick={()=>{ console.log('clicked'); updateSwitch(key)} } style={{       backgroundColor: 'rgb(14 ,44, 44 / 98%)'}} className="tab flex cursor-pointer active overflow-hidden overflow-ellipsis whitespace-nowrap px-4 pt-1 h-[4.75vh] w-[8vw] text-[small]
 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"> <Switch searchkey={switchh[key][2]}  /></div> 
                  <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={()=>{ updatedeleteTab(key);}}
        className="w-4 h-6 text-red-500 cursor-pointer" // Example Tailwind CSS classes
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
   </div>)})}<div><img className='filter invert-[100%] w-[24px] cursor-pointer' onClick={()=>{setSwitchh({ id1: [0] }); setPrevTab('id1')}} src={closealltab} alt="" /></div></div> 
   <div className="h-[2px] bg-white"></div>
   <div className="h-full flex overflow-y-auto box-border" >
        <Sidebar enterFullScreen={enterFullScreen} exitFullScreen={exitFullScreen} setSearch={setSearch}/>
  <div className="relative w-[93vw] h-[92%] bg-[linear-gradient(to_bottom,_#00000061,_#020000cf)] ">
   

      <div className="fixed l-[6vw] bg-black w-[65vw] flex">
     </div>
      <Context switchh={switchh} setSwitchh={setSwitchh} />
</div>
</div>
</div>
    );
} 

Home.propTypes = {
  // Define prop types here
  switchh: PropTypes.string.isRequired,
  prevTab: PropTypes.string.isRequired,
  setPrevTab: PropTypes.string.isRequired,
  setSwitchh: PropTypes.string.isRequired,
  setSearch: PropTypes.string.isRequired,
  // Add more as needed
}

export default Home;