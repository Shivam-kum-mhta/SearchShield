import { useState , useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
const Searchpg=({switchh, setSwitchh, prevTab, setPrevTab ,search, setSearch})=>{

    const [inputValue, setInputValue] = useState('');

  const handleonChange = (e)=>{
    setInputValue(e.target.value);
  }
  const handleonKeyDown=async (e)=>{
    if (e.key === 'Enter')
    {setSearch(inputValue)

      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/savehistory`,{ "keywords": inputValue}, {
    headers: {
        Authorization: `Bearer ${token}`,
      }})
    console.log("response: " ,response)}
  }


  const Access = async (url) => {
        if(search){
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
        }

    }


useEffect(()=>{
//place your API KEY 
Access(`https://www.googleapis.com/customsearch/v1?key=AIzaSyATMFmEeoCJVDXJMy1hVPXQeSvV-TVd5bA&cx=7405aac4542ad4e53&q=${search}&num=10&searchType=Image&imgSize=large&start=1`);
    
    
},[search]) 






    return(<><input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleonChange}
        onKeyDown={handleonKeyDown}
        style={{ padding: '8px', marginBottom: '16px' }} // Adding some styling
      />
      
       </>);
}

Searchpg.propTypes = {
  // Define prop types here
  switchh: PropTypes.string.isRequired,
  prevTab: PropTypes.number,
  setPrevTab: PropTypes.number,
  setSwitchh: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.string.isRequired,
  // Add more as needed

}

export default Searchpg;