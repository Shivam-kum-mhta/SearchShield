// src/components/SearchHistory.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const History = ({setSearch}) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetchSearchHistory();

  }, []);

  const fetchSearchHistory = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`http://localhost:5000/gethistory`,{
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
      <h2>Search History</h2>
      {searchHistory.length ? (
        <div>
          {searchHistory.map((history) => (
            <div><button onClick={()=>handleKeywordClick(history.keywords)} key={history._id}>
              {history.keywords} - {new Date(history.searchedAt).toLocaleString()}
            </button></div>
          ))}
        </div>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
};

export default History;
