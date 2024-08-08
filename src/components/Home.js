import React from 'react';
import HeroSection from './HeroSection';
import FeaturedMovie from './FeaturedMovie';
import FeaturedSeries from './FeaturedSeries';
import ContentSection from './Content';
import image1 from '../images/content4.png'; // Replace with your actual image path
import image2 from '../images/content2.jpg'; // Replace with your actual image path

const Home = ({ movies, series }) => {
  return (
    <div>
      <HeroSection />
      <FeaturedMovie movies={movies.slice(0, 8)} />
      <ContentSection
        image={image1}
      />
      <FeaturedSeries series={series.slice(0, 8)} />
      <ContentSection
        image={image2}
      />
    </div>
  );
};

export default Home;
