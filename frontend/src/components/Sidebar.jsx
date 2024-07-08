import { useState,useEffect,useCallback } from "react";
import Historylogo from "../assets/History.png"
import fullscreenicon from "../assets/full-screen-icon.png"
import existfullscreenicon from "../assets/exit-full-screen.webp"
import PropTypes from 'prop-types';

const Sidebar=({enterFullScreen, exitFullScreen})=>{

    const [fullscreen , setFullScreen]=useState(1);
    const isFull = useCallback(() => {setFullScreen(1)},[setFullScreen])
    useEffect(() => {isFull},[fullscreen])
    return(<div className="w-[7vw] h-[90%] pt-[20px] bg-[linear-gradient(to_bottom,_#00000061,_#020000cf)]  flex [flex-flow:column] items-center gap-[15px] mr-[7px] mt-[7px] border-l-[white] border-r"> 
   {fullscreen? (<div><img onClick={()=>{enterFullScreen(); setFullScreen(0)}} className='filter invert-[100%] w-[35px]' src={fullscreenicon} alt="" /></div>):(<div><img onClick={()=>{exitFullScreen(); setFullScreen(1)}} className='filter invert-[100%] w-[35px] h-[35px]' src={existfullscreenicon} alt="" /></div> )}
    <div><img className='filter invert-[100%] w-[35px]' src={Historylogo} alt="" /></div>
    <div><img className='filter invert-[100%] w-[35px]' src={Historylogo} alt="" /></div>
    </div>)
}
export default Sidebar

Sidebar.propTypes = {
    // Define prop types here
    enterFullScreen: PropTypes.func.isRequired,
    exitFullScreen: PropTypes.func.isRequired,
}