import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FeaturedMovie.css';

const FeaturedMovie = ({ movies, showAll }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    console.log('Navigating to movie detail with state:', movie);
    navigate(`/movie/${movie.id}`, { state: { movieItem: movie } });
  };

  const moviesToShow = showAll ? movies : movies.slice(0, 7);

  return (
    <div className="featured-movie-container">
      <h2>{showAll ? "All Movies" : "Featured Movies"}</h2>
      <div className="movie-list">
        {moviesToShow.map(movie => (
          <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
            <img src={movie.image} alt={movie.title} />
            {/* <p>{movie.title}</p>*/ }
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovie;
