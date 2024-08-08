import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/HeroSection.css';

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "/images/banner6.jpg", // Make sure this path matches your project structure
    },
    {
      id: 2,
      image: "/images/banner1.jpg", // Make sure this path matches your project structure
    },
    {
      id: 3,
      image: "/images/banner7.jpg", // Make sure this path matches your project structure
    },
    // Add more slides as needed
  ];

  return (
    <div className="hero-section">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={600}
      >
        {slides.map(slide => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
