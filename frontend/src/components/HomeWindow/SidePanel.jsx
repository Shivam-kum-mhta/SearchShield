import PropTypes from 'prop-types';
import GoogleAds from '../../assets/Google-Ads.png'
const SidePanel = ({iframe}) => {


    // const IframeComponent = ({ src }) => {
    //     return (
    //         <div style={{ width: '100%', height: '100vh' }}>
    //             <iframe 
    //                 className="w-full h-full" 
    //                 src={src} 
    //                 style={{ width: '100%', height: '100%', border: 'none' }}
    //                 title="iframe-content"
    //             ></iframe>
    //         </div>
    //     );
    // };
    

    const handleOpenLink = (url) => {
        window.open(url, '_blank');
      };
    

    return (<>
       { iframe? (<div className=' overflow-y-auto absolute left-[65vw] top-[5vh] w-[26vw] h-[90%]' style={{ border: '1px solid #ccc' }}>
                        <div className='flex [flex-flow:column] items-center justify-between' key={iframe.title}>
              <div className="mt-[7px] ">
                <img 
                  style={{ width: '300px', height: 'auto', maxWidth: 'none',  }}
                  src={iframe.link}
                  alt=""
                />
              </div>
              <div className='text-white w-[26vw] p-[3vw] text-[16px] flex [flex-flow:column] gap-y-[15px]'>
                <div>{iframe.snippet}</div>
                <div className="p-[4px] text-[black] bg-[white] rounded-[10px]">{iframe.displayLink}</div>
                <button onClick={()=>handleOpenLink(iframe.image.contextLink)} className="text-white bg-red-400"> Open Link</button>
              </div>
              {/*<button onClick={()=>{console.log(item.image.contextLink); handleiframe(item.image.contextLink) ; }}> Know More</button> */}
            </div>
          </div>):
           (<div className=' overflow-y-auto absolute left-[65vw] top-[5vh] w-[26vw] h-[90%]' style={{ border: '1px solid #ccc' }}> 
            <div><img src={GoogleAds}/></div>
            <p>Additional content here...</p>
        </div>)}
        </> );
};
SidePanel.propTypes = {
    // Define prop types here
    iframe: PropTypes.string.isRequired,}

export default SidePanel;
