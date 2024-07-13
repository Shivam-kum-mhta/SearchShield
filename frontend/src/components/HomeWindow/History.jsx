// src/components/SearchHistory.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
const History = ({setSearch}) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
      fetchSearchHistory();

  }, []);

  const fetchSearchHistory = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`http://localhost:3003/gethistory`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };
  const handleKeywordClick = (keyword) => {
    console.log('keyword', keyword);
    setSearch(keyword);
    navigate("/",);
  };

  return (
    <div>
      <h2 className='text-[x-large]'>Search History</h2> 
      <div> <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={()=>{ }}
        className="w-4 h-6 text-red-500 cursor-pointer" // Example Tailwind CSS classes
      >
      </svg>
      </div>
      {searchHistory.length ? (
        <div>
          {searchHistory.map((history) => (
            <div className='flex mb-[10px] cursor-pointer' style={{    border: 'white',
              borderLeft:'solid'}} onClick={()=>handleKeywordClick(history.keywords)} key={history._id}>
              <div className='p-[7px]'>{history.keywords} </div>  <div className='text-[small] sticky left-[68vw]'><div> { Math.ceil( ( new Date(new Date().toLocaleString()) - new Date((new Date(history.searchedAt).toLocaleString()).split(',')[0] ))/ (1000*60*60*24) )-1} days ago</div>
              <div>{  ((new Date(history.searchedAt).toLocaleString()).split(',')[1]).split('') }</div></div>
            </div>))}</div>
): (
        <p>No search history found.</p>
      )}
    </div>
  );
};

History.propTypes = {
  // Define prop types here
  setSearch: PropTypes.string.isRequired,}
export default History;

