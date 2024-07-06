import Welcome from "./Welcome";
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from "react";

const Tab = ({ Tabkey, switchh }) => {
  const [results, setResults] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchResults = async (search, start) => {
    console.log(`Fetching results for ${search} starting from index ${start}`);
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyATMFmEeoCJVDXJMy1hVPXQeSvV-TVd5bA&cx=7405aac4542ad4e53&q=${search}&num=10&searchType=Image&imgSize=large&start=${start}`
      );
      const data = await response.json();
      if (data.items) {
        setResults((prevResults) => [...prevResults, ...data.items]);
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

  return (
    <>
      {Array.isArray(switchh[Tabkey][1]) && switchh[Tabkey][1].length > 0 ? (
        <div className='mt-[12vh] ml-[2vw] ' style={{ display: 'flex', flexFlow: 'column', gap: '8vh' }}>
          {results.map((item) => (
            <div className='flex items-center justify-between' key={item.title}>
              <div className="self-start">
                <img
                  style={{ width: '400px', height: 'auto', maxWidth: 'none', borderRadius: '25px' }}
                  src={item.link}
                  alt=""
                />
              </div>
              <div className='text-white w-[50vw] p-[3vw] text-[16px]'>
                <div>{item.snippet}</div>
                <div className="p-[4px] text-[black] bg-[white] rounded-[10px]">{item.displayLink}</div>
              </div>
            </div>
          ))}
          <button onClick={handleLoadMore} disabled={isFetching} style={{     marginBottom:'37px', padding:'10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {isFetching ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

Tab.propTypes = {
  switchh: PropTypes.object.isRequired,
  Tabkey: PropTypes.string.isRequired,
  setPrevTab: PropTypes.func.isRequired,
  setSwitchh: PropTypes.func.isRequired,
};

export default Tab;
