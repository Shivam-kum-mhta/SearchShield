// src/components/SearchHistory.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const History = ({setSearch}) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

      fetchSearchHistory();

  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/history/66755c1649bdf9334de5be56`);
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
        <ul>
          {searchHistory.map((history) => (
            <button onClick={()=>handleKeywordClick(history.keywords)} key={history._id}>
              {history.keywords} - {new Date(history.searchedAt).toLocaleString()}
            </button>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
};

export default History;
