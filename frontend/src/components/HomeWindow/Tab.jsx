
import Welcome from "./Welcome";
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from "react";
import SidePanel from "./SidePanel";
const Tab = ({ Tabkey, switchh}) => {
  // const [results, setResults] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [iframe, setIframe] = useState('')
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const fetchResults = async (search, start) => {
    console.log(`Fetching results for ${search} starting from index ${start}`);
    setIsFetching(true);
    

    try {

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_CX_ID}&q=${search}&num=10&searchType=Image&imgSize=large&start=${start}`
      );
      const data = await response.json();
       if (data.items) {
        const newFirstHalf = data.items.slice(0, 5);
        const newSecondHalf = data.items.slice(5);
        setFirstHalf(prev => [...prev, ...newFirstHalf]);
        setSecondHalf(prev => [...prev, ...newSecondHalf])
        } else {
        console.error('No items found in response');
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsFetching(false);
    }
  };

  const Access = useCallback(() => {
    if (switchh[Tabkey][2]) {
      fetchResults(switchh[Tabkey][2], startIndex);
    }
  }, [startIndex, switchh, Tabkey]);

  useEffect(() => {
    Access();
  }, [Access]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };

  // const handleiframe= async (iframe)=>{
  //   const response = await fetch(`https://iframe.ly/api/iframe?url=${iframe}&api_key=13c31c8bc0ce7ee7867b21`)
   
  //   const data = await response.text()
  //   console.log("data", data);
  //   setIframe(data);
  // }


  return (
    <>
    {Array.isArray(switchh[Tabkey][1]) && switchh[Tabkey][1].length > 0 ? (<>
      <div className='mt-[24px] ml-[2vw] w-[65vw] flex'>
        <div className='flex flex-col w-1/2 gap-[8vh]'>
          {firstHalf.map((item) => (
            <div className='flex items-center justify-between' key={item.title}>
              <div className="self-start ">
                <img onClick={()=>{console.log('setting frame'); setIframe(item)}}
                  style={{ width: '350px', height: 'auto', maxWidth: 'none', borderRadius: '25px' }}
                  src={item.link}
                  alt=""
                />
              </div>
              {/* <div className='text-white w-[50vw] p-[3vw] text-[16px]'>
                <div>{item.snippet}</div>
                <div className="p-[4px] text-[black] bg-[white] rounded-[10px]">{item.displayLink}</div>
              </div>
              <button onClick={()=>{console.log(item.image.contextLink); handleiframe(item.image.contextLink) ; }}> Know More</button> */}
            </div>
          ))}
        </div>
        <div className='flex flex-col w-1/2 gap-[8vh]'>
          {secondHalf.map((item) => (
            <div className='flex items-center justify-between' key={item.title}>
              <div className="self-start">
                <img onClick={()=>{console.log('setting frame'); setIframe(item)}}
                  style={{ width: '350px', height: 'auto', maxWidth: 'none', borderRadius: '25px' }}
                  src={item.link}
                  alt=""
                />
              </div>
              {/* <div className='text-white w-[50vw] p-[3vw] text-[16px]'>
                <div>{item.snippet}</div>
                <div className="p-[4px] text-[black] bg-[white] rounded-[10px]">{item.displayLink}</div>
              </div>
              <button onClick={()=>{console.log(item.image.contextLink); handleiframe(item.image.contextLink) ; }}> Know More</button> */}
            </div>
          ))}
        </div> </div>
        <div ><button onClick={handleLoadMore} disabled={isFetching} style={{ marginBottom: '100px', padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      {isFetching ? 'Loading...' : 'Load More'}
    </button></div>
     </>
    ) : (
      <Welcome />
    )}
    <div>
    <SidePanel iframe={iframe}/></div>
  </>
  );
};

Tab.propTypes = {
  switchh: PropTypes.object.isRequired,
  Tabkey: PropTypes.string.isRequired,
  preTab: PropTypes.string.isRequired,
  setSwitchh: PropTypes.func.isRequired,
  setIframe:PropTypes.func.isRequired,
};

export default Tab;