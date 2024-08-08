import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FeaturedMovie.css'; // Reuse the same CSS for consistency

const FeaturedSeries = ({ series, showAll }) => {
  const navigate = useNavigate();

  const handleSeriesClick = (serie) => {
    navigate(`/series/${serie.id}`, { state: { seriesItem: serie } });
  };

  const seriesToShow = showAll ? series : series.slice(0, 7);

  return (
    <div className="featured-movie-container">
      <h2>{showAll ? "All Series" : "Featured Series"}</h2>
      <div className="movie-list">
        {seriesToShow.map(serie => (
          <div key={serie.id} className="movie-item" onClick={() => handleSeriesClick(serie)}>
            <img src={serie.image} alt={serie.title} />
            {/* <p>{serie.title}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSeries;
