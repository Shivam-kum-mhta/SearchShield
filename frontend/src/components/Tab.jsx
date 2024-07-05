import Welcome from "./Welcome";
import PropTypes from 'prop-types'
const Tab=({Tabkey, switchh})=>{

    return(<>
      {Array.isArray(switchh[Tabkey][1]) && switchh[Tabkey][1].length>0 ? (<div style={{    display: 'flex', flexFlow: 'column', gap: '8vh'}}>
            {(switchh[Tabkey][1]).map((item)=>{   return(<div className='flex items-center justify-center' style={{display:'flex',alignItems:'center',gap: '200px'}} key={item.title} > 
            <div className="img" style={{marginLeft:'4vw'}} ><img  width='450px' height='300px' onClick={()=>fetchContent(item.contextLink)}  src={item.link} alt="" /></div>
            <div style={{ fontSize: '4vh'}}>{item.title} </div>
                                        </div>);  })}
                    </div>)
                  : <Welcome/> }
    </>);
}
Tab.propTypes = {
  // Define prop types here
  switchh: PropTypes.string.isRequired,
 Tabkey: PropTypes.string.isRequired,
  setPrevTab: PropTypes.string.isRequired,
  setSwitchh: PropTypes.string.isRequired,
  // Add more as needed
}
export default Tab
