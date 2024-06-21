import { NavLink, redirect } from "react-router-dom";
import Searchpg from "./Searchpg";
const Nav =({switchh, setSwitchh, prevTab, setPrevTab})=>{
    return(<>  <div className="navbody" style={{position:'static', width:'80vw'}} >      <nav style={{borderRadius:"8px" ,display:"flex", zIndex:"1",justifyContent:"center", alignItems:"center", gap:"10px", position:"sticky", top:"20px"}}>
      <div className="logo" style={{ padding: "7px", textDecorationStyle: "solid", backgroundImage: "linear-gradient(to right,rgb(255, 0, 242),  rgb(0, 68, 255))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",}}><h2>SearchShield</h2></div>
      <NavLink to="/"><Searchpg switchh={switchh} setSwitchh={setSwitchh} prevTab={prevTab} setPrevTab={setPrevTab}/></NavLink>
  
    <NavLink to='/about'><button>About</button></NavLink>
    <NavLink to='/history'><button>History</button></NavLink>
    </nav>
    </div></>)
}
export default Nav;