import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/SearchResults.css';

const SearchResults = () => {
  const { state } = useLocation();
  const { results } = state || {};
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return (
      <div className="search-results-container">
        <div className="search-results-title">No Results Found</div>
      </div>
    );
  }

  const handleViewDetails = (result) => {
    const path = result.contentType === 'TV Show' ? `/series/${result.id}` : `/movie/${result.id}`;
    const state = result.contentType === 'TV Show' ? { seriesItem: result } : { movieItem: result };
    navigate(path, { state });
  };

  return (
    <div className="search-results-container">
      <div className="search-results-title">Search Results</div>
      <div className="search-results-list">
        {results.map((result) => (
          <div key={result.id} className="search-result-item">
            <img src={result.image} alt={result.title} />
            <div className="info">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <button className="details-button" onClick={() => handleViewDetails(result)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
