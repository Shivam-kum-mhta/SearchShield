import { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from "./Loader";


const Searchpg = ({ switchh, setSwitchh, prevTab, setPrevTab, search, setSearch, isProfane, setIsProfane }) => {

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkProfanity = async (term) => {
    if (term){
    try {
      console.log("term", term);
      const response = await axios.post('http://127.0.0.1:8001/predict-profanity', { text: term }, {
        headers: {
          'Content-Type': 'application/json'
        }});
      // return response.data.predicted_class !== 0;
      setIsProfane(response.data.predicted_class);
      if (response.data.predicted_class) 
        {setIsLoading(false)
      setSearch('')
      setTimeout(() => setIsProfane(false), 1000);}
      else{Access(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_CX_ID}&q=${search}&num=10&searchType=Image&imgSize=large&start=1`);
        const token = localStorage.getItem('token');
        const response = await axios.post(`https://searchshield-2.onrender.com/savehistory`, { "keywords": inputValue }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("response: ", response);
      }
    } catch (error) {
      console.error('Error checking profanity:', error);
    }
  }
  };

  const handleonChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleonKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      // profane = await checkProfanity(inputValue);
    
      setSearch(inputValue);
      // if (profane) {
      //   setIsLoading(false);
      //   setSearch('');
      //   return;
      // }

        
    }
  };

  const Access = async (url) => {
    if (search) {
      try {
        let response = await fetch(url);
        let data = await response.json();
        console.log('T', data.items);
        const searchkey = data.items;
        console.log("searchkey", searchkey);

        const newTab = `id${Object.keys(switchh).length + 1}`;
        console.log("newTab", newTab);
        switchh[prevTab][0] = 1;
        const newSwitchh = { ...switchh, [newTab]: [0, searchkey, search] };
        console.log("newSwitchh", newSwitchh);
        setSwitchh(newSwitchh);
        setPrevTab(newTab);
        console.log('added a new tab', newTab, "corresponding search is ", switchh);
        setInputValue('');
        setSearch('');
      } catch (e) { console.log(e); }
      finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  };

  useEffect(() => {
    checkProfanity(search);
    // 
  }, [search]);

  return (
    <div className={`nav-window ${isProfane ? 'blink' : ''}`}>
      {!isLoading ? (
        <input className="p-[4px] pl-[20px] mb-px rounded-[25px] w-[35vw] h-[33px] bg-transparent border-[#ffffff] border-[thin] text-[#54ff03]"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleonChange}
          onKeyDown={handleonKeyDown}
          style={{ padding: '8px' }} 
        />
      ) : (
        <Loader isLoading={isLoading} />
      )}
    </div>
  );
}

Searchpg.propTypes = {
  switchh: PropTypes.object.isRequired,
  prevTab: PropTypes.string.isRequired,
  setPrevTab: PropTypes.func.isRequired,
  setSwitchh: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  isProfane: PropTypes.bool.isRequired,
  setIsProfane: PropTypes.func.isRequired,
};

export default Searchpg;
