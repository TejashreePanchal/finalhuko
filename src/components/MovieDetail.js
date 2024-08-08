import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/MovieDetail.css';

const MovieDetail = ({ isAuthenticated }) => {
  const { state } = useLocation();
  const { movieItem, isSearchResult } = state || {};
  const navigate = useNavigate();

  console.log('Movie Item:', movieItem); // Add this line

  if (!movieItem) {
    return <div>Movie not found</div>;
  }

  const handleRent = () => {
    if (isAuthenticated) {
      alert('It will be added to your list after processing payment! Thank you.');
    } else {
      alert('Please log in to rent this movie.');
    }
  };

  const handleBuy = () => {
    if (isAuthenticated) {
      alert('It will be added to your list after processing payment! Thank you.');
    } else {
      alert('Please log in to buy this movie.');
    }
  };

  return (
    <div className="movie-detail-container">
      {!isSearchResult && (
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      )}
      <div className="movie-detail-content">
        <div className="movie-detail-image">
          <img src={movieItem.image} alt={movieItem.title} />
        </div>
        <div className="movie-detail-info">
          <h1>{movieItem.title}</h1>
          <p><strong>Genre:</strong> {movieItem.genre}</p>
          <p><strong>Year:</strong> {movieItem.year}</p>
          <p><strong>IMDB:</strong> {movieItem.imdb}</p>
          <p><strong>Duration:</strong> {movieItem.duration}</p>
          <p>{movieItem.description}</p>
          <div className="movie-detail-buttons">
            <button onClick={handleRent}>Rent ${movieItem.rentPrice}</button>
            <button onClick={handleBuy}>Buy ${movieItem.buyPrice}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
