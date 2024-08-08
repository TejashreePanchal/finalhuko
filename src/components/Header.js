import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HeaderFooter.css';

const Header = ({ isAuthenticated, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      console.warn('Search query is empty');
      return;
    }
    try {
      const movieResponse = await fetch(`https://finalhuko-backend-ad893b87634b.herokuapp.com/movies/search?title=${searchQuery}`);
      const showResponse = await fetch(`https://finalhuko-backend-ad893b87634b.herokuapp.com/shows/search?title=${searchQuery}`);

      if (!movieResponse.ok || !showResponse.ok) {
        throw new Error('HTTP error!');
      }

      const movieData = await movieResponse.json();
      const showData = await showResponse.json();

      const results = [...(movieData.body || []), ...(showData.body || [])];

      navigate('/search', { state: { results } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    navigate('/home');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home"><span>Huko</span></Link>
      </div>
      <nav>
        <div className="center-links">
          <ul>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/series">Series</Link></li>
            {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
          </ul>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        <ul>
          {isAuthenticated ? (
            <li><button onClick={() => onLogout(navigate)} className="logout-button">Logout</button></li>
          ) : (
            <li><Link to="/signin">Sign In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
