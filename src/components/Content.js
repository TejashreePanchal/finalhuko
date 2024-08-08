import React from 'react';
import '../css/Content.css';

const ContentSection = ({ image }) => {
  return (
    <div className="content-section">
      <img src={image} alt="" className="content-image" />
      <div className="content-info">
      </div>
    </div>
  );
};

export default ContentSection;
