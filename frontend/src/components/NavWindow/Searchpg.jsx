import { useState , useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from "./Loader";

const Searchpg=({switchh, setSwitchh, prevTab, setPrevTab ,search, setSearch})=>{

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const handleonChange = (e)=>{
    setInputValue(e.target.value);
  }
  const handleonKeyDown=async (e)=>{
    if (e.key === 'Enter')
    { setIsLoading(true)
      setSearch(inputValue)

      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3003/savehistory`,{ "keywords": inputValue}, {
    headers: {
        Authorization: `Bearer ${token}`,
      }})
    console.log("response: " ,response)
   
    }
  }


  const Access = async (url) => {
        if(search){
          setIsLoading(true)
          try{
        let response = await fetch(url);
        let data= await response.json();
        console.log('T',data.items);
        const searchkey=data.items;
        console.log("searchkey",searchkey)

        //adding a new tab
        const newTab = `id${Object.keys(switchh).length+1}`
        console.log("newTab",newTab)
        switchh[prevTab][0]=1
        const newSwitchh = { ...switchh, [newTab]:[0,searchkey,search]};
        console.log("newSwitchh",newSwitchh)
        setSwitchh(newSwitchh)
        setPrevTab(newTab)
        console.log('added a new tab', newTab ,"corresponding search is ",switchh)
        setInputValue('')
        setSearch('')
      } catch(e){console.log(e)}
      finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500); 
        }

    }
  }


useEffect(()=>{
//place your API KEY 

Access(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_CX_ID}&q=${search}&num=10&searchType=Image&imgSize=large&start=1`);
    
    
},[search]) 






    return(<>
    {!isLoading ? (<input className="p-[4px] pl-[20px] mb-px rounded-[25px] w-[35vw] h-[33px] bg-transparent border-[#ffffff] border-[thin] text-[#54ff03]"
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleonChange}
        onKeyDown={handleonKeyDown}
        style={{ padding: '8px'}} // Adding some styling
      />):
      (<Loader isLoading={isLoading} />)
      
    }</>);
}

Searchpg.propTypes = {
  // Define prop types here
  switchh: PropTypes.string.isRequired,
  prevTab: PropTypes.number,
  setPrevTab: PropTypes.number,
  setSwitchh: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.string.isRequired,
  // setIsLoading:PropTypes.func.isRequired,
  // Add more as needed

}

export default Searchpg;