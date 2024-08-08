import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/MovieDetail.css';

const SeriesDetail = ({ isAuthenticated }) => {
  const { state } = useLocation();
  const { seriesItem, isSearchResult } = state || {};
  const navigate = useNavigate();

  console.log('Series Item:', seriesItem);
  if (seriesItem) {
    console.log('Series Image URL:', seriesItem.image); // Add this line
  }

  if (!seriesItem) {
    return <div>Series not found</div>;
  }

  const handleRent = () => {
    if (isAuthenticated) {
      alert('It will be added to your list after processing payment! Thank you.');
    } else {
      alert('Please log in to rent this series.');
    }
  };

  const handleBuy = () => {
    if (isAuthenticated) {
      alert('It will be added to your list after processing payment! Thank you.');
    } else {
      alert('Please log in to buy this series.');
    }
  };

  return (
    <div className="movie-detail-container">
      {!isSearchResult && (
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      )}
      <div className="movie-detail-content">
        <div className="movie-detail-image">
          <img src={seriesItem.image} alt={seriesItem.title} />
        </div>
        <div className="movie-detail-info">
          <h1>{seriesItem.title}</h1>
          <p><strong>Genre:</strong> {seriesItem.genre}</p>
          <p><strong>Year:</strong> {seriesItem.year}</p>
          <p><strong>IMDB:</strong> {seriesItem.imdb}</p>
          <p><strong>Seasons:</strong> {seriesItem.seasons}</p>
          <p>{seriesItem.description}</p>
          <div className="movie-detail-buttons">
            <button onClick={handleRent}>Rent ${seriesItem.rentPrice}</button>
            <button onClick={handleBuy}>Buy ${seriesItem.buyPrice}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
