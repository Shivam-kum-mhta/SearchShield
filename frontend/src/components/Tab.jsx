import React, { useState , useEffect} from "react";
import Searchpg from "./Searchpg";
const Tab=({Tabkey, setSearchkeys, searchkeys})=>{



    const [search, setSearch]=useState('')
    const [snippet, setSnippet]=useState([])

    const Access = async (url) => {
        try{
            let response = await fetch(url);
            let data= await response.json();
            console.log('T',data);
            setSnippet(data.items);
          
            }catch(err){console.log('Remote Server error')}
        }
        const show=()=>{
            console.log('T', search, 'T')
            console.log('T',searchkeys[Tabkey]);

            setSearch(searchkeys[Tabkey])
        }

        useEffect(()=>{
        //place your API KEY 
        show()
        Access(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCUPYzhf-3K8YbE9-JOk-p1dMCeUtU2Yow&cx=7405aac4542ad4e53&q=${search}&num=10&searchType=Image&imgSize=large`);
            
            
        },[search])

    const handleOnchange=async (e) => {
        console.log('T', "changed");
        console.log('SHIV', e.target.value);
        console.log('T',{Tabkey}, 'done')
        setSearch(e.target.value)

       // if(e.target.value==='')
        //    {setSnippet(''); console.log('T','search0', 'else',snippet)}
        //else{setSnippet(items); console.log('T','kardiya if')}
        console.log(snippet ,'SNIPPPET')

        const newsearchkey = await {...searchkeys, [Tabkey]:e.target.value};
        console.log('T',newsearchkey)
        setSearchkeys(newsearchkey)
        
    }
const [item, setItem]=useState([])
    return(<><input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleOnchange}
        style={{ padding: '8px', marginBottom: '16px' }} // Adding some styling
      />
      {Array.isArray(snippet) && snippet.length>0 ? (<div style={{    display: 'flex', flexFlow: 'column', gap: '8vh'}}>
            {snippet.map((item)=>{   return(<div className='flex items-center justify-center' style={{display:'flex',alignItems:'center',gap: '200px'}} key={item.title} > 
            <div className="img" style={{marginLeft:'4vw'}} ><img  width='450px' height='300px' onClick={()=>fetchContent(item.contextLink)}  src={item.link} alt="" /></div>
            <div style={{ fontSize: '4vh'}}>{item.title} </div>
                                        </div>);  })}
                    </div>)
                    : (<Searchpg/>) }
    </>);
}

export default Tab
