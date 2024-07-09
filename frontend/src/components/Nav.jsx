import { NavLink } from "react-router-dom";
import SearchShield from '../assets/shield-removebg-preview.png'
import linkedinicon from '../assets/LinkedIn.webp'
import githubicon from '../assets/GitHub.png'
import Searchpg from "./Searchpg";
import Loader from './Loader'
const handleOpenLink = (url) => {
  window.open(url, '_blank');
};
import { useState } from "react";

const Nav =({switchh, setSwitchh, prevTab, setPrevTab, search, setSearch})=>{
  const [isLoading, setIsLoading] = useState(false);

    return(<>  <div className="navbody" style={{position:'static', width:'80vw'}} >      <nav style={{borderRadius:"8px" ,display:"flex", zIndex:"1",justifyContent:"center", alignItems:"center", gap:"10px", position:"sticky", top:"20px"}}>
     <img     height='45' width='138' src={SearchShield} alt="" /> <div className="logo text-[x-large] relative -left-[10vh]" style={{ padding: "7px", textDecorationStyle: "solid", backgroundImage:"linear-gradient(to right, rgb(255, 0, 242), #f6f8fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",}}><h2>SearchShield</h2></div>
      <NavLink to="/"><Searchpg switchh={switchh} setSwitchh={setSwitchh} prevTab={prevTab} setPrevTab={setPrevTab} search={search} setSearch={setSearch} setIsLoading={setIsLoading}/></NavLink>
  
    <NavLink to='/about'><button className='mx-[30px] my-0 text-[white]'>About</button></NavLink>
    {/* <NavLink to='/history'><button>History</button></NavLink> */}
<img onClick={()=>handleOpenLink('https://www.linkedin.com/in/shivam-kumar-a-995330289/')} className='w-[30px] cursor-pointer' src={linkedinicon} alt="" />
  <img  onClick={()=>handleOpenLink('https://github.com/Shivam-kum-mhta')} className='w-[30px] cursor-pointer' src={githubicon} alt="" />
    </nav>
    <div> <Loader isLoading={isLoading}/></div>
    </div></>)
}
export default Nav;