import { useState,useEffect,useCallback,useRef } from "react";
import Historylogo from "../../assets/History.png"
import fullscreenicon from "../../assets/full-screen-icon.png"
import existfullscreenicon from "../../assets/exit-full-screen.webp"
import PropTypes from 'prop-types';
import History from './History';
import UserDetails from "./UserDetails";
import usericon from '../../assets/usericon.png'
import savedicon from '../../assets/savedicon.png'
import settingsicon from '../../assets/settingsicon.png'
const Sidebar=({enterFullScreen, exitFullScreen, setSearch, email})=>{
    const [sidebaroption , setSidebarOption] = useState(null)
    // const panelRef = useRef(null);

    const [fullscreen , setFullScreen]=useState(1);
    const isFull = useCallback(() => {setFullScreen(1)},[setFullScreen])
    useEffect(() => {isFull},[fullscreen])
    return(<div className=" relative w-[7vw] h-[90%] pt-[20px] ]  flex [flex-flow:column] items-center gap-[15px] mr-[7px] mt-[7px] border-l-[white] border-r" style={{background: 'linear-gradient(rgba(2, 18, 44, 0.85), rgb(1, 1, 1))'}}> 
   {fullscreen? (<div><img onClick={()=>{enterFullScreen(); setFullScreen(0)}} className='filter invert-[100%] w-[35px] cursor-pointer' src={fullscreenicon} alt="" /></div>):(<div><img onClick={()=>{exitFullScreen(); setFullScreen(1)}} className='filter invert-[100%] w-[35px] h-[35px]' src={existfullscreenicon} alt="" /></div> )}
    <div><img onClick={()=>{setSidebarOption(2)}} className='filter invert-[100%] w-[35px] cursor-pointer' src={usericon} alt="" /></div>
    <div><img onClick={()=>{setSidebarOption(3)}} className='filter invert-[100%] w-[35px] cursor-pointer' src={Historylogo} alt="" /></div>
    <div><img onClick={()=>{setSidebarOption(4)}} className='filter invert-[100%] w-[35px] cursor-pointer' src={savedicon} alt="" /></div>
    <div><img onClick={()=>{setSidebarOption(5)}} className='filter invert-[100%] w-[35px] cursor-pointer' src={settingsicon} alt="" /></div>

   {sidebaroption==3 ? (<div  className='absolute z-1 top-[2vh] w-[66vh] h-[90%] left-[8vw] bg-white text-[white] border-l-[white] border flex' style={{zIndex:10, paddingLeft: '16px',overflow: 'auto', background: 'linear-gradient(to bottom, rgb(0 0 0 / 85%), rgb(0 0 0))' }}> <History setSearch={setSearch} setSidebarOption={setSidebarOption} />
    <div onClick={() =>setSidebarOption(null)} className='sticky left-[68vw]'><svg
        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={()=>{ }} className="w-8 h-8 text-red-500 cursor-pointer " 
      >  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>
      </div>) : null}
   {sidebaroption==2 ? (<div  className='absolute z-1 top-[2vh] w-[66vh] h-[75vh] left-[8vw] bg-white text-[white] border-l-[white] border flex' style={{zIndex:10, paddingLeft: '16px',overflow: 'auto', background: 'linear-gradient(to bottom, rgb(0 0 0 / 85%), rgb(0 0 0))' }}> <UserDetails email={email}/>
    <div onClick={() =>setSidebarOption(null)} className='sticky left-[68vw]'><svg
        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={()=>{ }} className="w-8 h-8 text-red-500 cursor-pointer " 
      >  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>
      </div>) : null}
   {sidebaroption==4 ? (<div  className='absolute z-1 top-[2vh] w-[66vh] h-[75vh] left-[8vw] bg-white text-[white] border-l-[white] border flex' style={{zIndex:10, paddingLeft: '16px',overflow: 'auto', background: 'linear-gradient(to bottom, rgb(0 0 0 / 85%), rgb(0 0 0))' }}> <div className="text-[x-large]">Saved Images Appears Here</div>
    <div onClick={() =>setSidebarOption(null)} className='sticky left-[68vw]'><svg
        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={()=>{ }} className="w-8 h-8 text-red-500 cursor-pointer " 
      > <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg></div>
      </div>) : null}
   {sidebaroption==5 ? (<div  className='absolute z-1 top-[2vh] w-[66vh] h-[75vh] left-[8vw] bg-white text-[white] border-l-[white] border flex' style={{zIndex:10, paddingLeft: '16px',overflow: 'auto', background: 'linear-gradient(to bottom, rgb(0 0 0 / 85%), rgb(0 0 0))' }}> <div className="text-[x-large]">Settings Appears Here</div>
    <div onClick={() =>setSidebarOption(null)} className='sticky left-[68vw]'><svg
        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={()=>{ }} className="w-8 h-8 text-red-500 cursor-pointer " 
      > <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg></div>
      </div>) : null}


    
    </div>)
}
export default Sidebar

Sidebar.propTypes = {
    // Define prop types here
    enterFullScreen: PropTypes.func.isRequired,
    exitFullScreen: PropTypes.func.isRequired,
   setSearch: PropTypes.func.isRequired,
   email: PropTypes.string.isRequired,
}