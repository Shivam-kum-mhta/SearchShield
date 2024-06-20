import React, { useState , useEffect} from "react";
const Searchpg=({searchkeys, setSearchkeys, Tabkey})=>{

    const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  const handleonChange = (e)=>{
    setInputValue(e.target.value);
  }
  const handleonKeyDown=(e)=>{
    if (e.key === 'Enter')
    setSearch(inputValue)
  }

  const Access = async (url) => {
    try{
        let response = await fetch(url);
        let data= await response.json();
        console.log('T',data);
      
        const newsearchkey = {...searchkeys, [Tabkey]:data.items};
        console.log('T',newsearchkey)
        setSearchkeys(newsearchkey)
        
        }catch(err){console.log('Remote Server error')}

    }


useEffect(()=>{
//place your API KEY 
Access(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBT-8W6Bp0xp4AyaC3werMQpr5otE29iQI&cx=7405aac4542ad4e53&q=${search}&num=10&searchType=Image&imgSize=large`);
    
    
},[search]) 






    return(<><input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleonChange}
        onKeyDown={handleonKeyDown}
        style={{ padding: '8px', marginBottom: '16px' }} // Adding some styling
      />
       <h1> 'SEARCH SAFE ;)' </h1></>);
}

export default Searchpg;