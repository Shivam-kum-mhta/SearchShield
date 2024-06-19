import React from "react"
import { useEffect , useState} from "react";

const Home = ({ }) => {

const [search, setSearch] = useState('puppies');
const [snippet, setSnippet] = useState([])
const [content, setContent] = useState([])
const [context, setContext] = useState('')
const Access = async (url) => {
try{
    let response = await fetch(url);
    let data= await response.json();
    console.log(data);
    setSnippet(data.items);
  
    }catch(err){console.log('Remote Server error')}
}

useEffect(()=>{

const API = process.env.REACT_APP_APIKEY="AIzaSyAsTe14IE_0DlNnu5hfBW1VzVuwP_8-IAA"


Access(`https://www.googleapis.com/customsearch/v1?key=${API}&cx=7405aac4542ad4e53&q=${search}&searchType=image&num=10`);

},[content])


const fetchContent = async (query)=>{
    try{
        const response = await axios.get('https://localhost:5000/api/context' , {params: { url: contextLink },
    });
    setContent(response.data);
  } catch (err) {
    setError('Failed to fetch content');
  }
}


return(<>
    <div> 
<h1> HELLO WORLD</h1>
    </div>
    <div>
    {snippet.map((item)=>{   return(<div className="container" key={item.title}> {item.title}
        <div className="img" ><img onClick={()=>fetchContent(item.contextLink)}  src={item.image.thumbnailLink} alt="" /></div>
    </div>);  })}
</div>

</>);
} 

export default Home;