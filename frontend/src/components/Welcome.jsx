import SearchShield from '../assets/shield-removebg-preview.png'
const Welcome=()=>{
    return(<div className="flex   items-center"> 
       <img     height='45' width='138' src={SearchShield} alt="" /> 
       <div className="logo text-[x-large] relative -left-[10vh]" style={{ padding: "7px", textDecorationStyle: "solid", backgroundImage:"linear-gradient(to right, rgb(255, 0, 242), #f6f8fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",}}><h2>SearchShield</h2></div>
       
        </div>)
        
}
export default Welcome;