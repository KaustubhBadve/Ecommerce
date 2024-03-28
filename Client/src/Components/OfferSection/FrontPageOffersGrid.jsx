import React from 'react';
import "./Offers.css";

export const FrontPageOffersGrid = ({ images, onClick }) => {
  return (
    <div className="offerSection-grid">
      <div className="image1" onClick={onClick}>
        <img src={images[0]} alt="Image 1" />
      </div>
      <div className="image2" onClick={onClick}>
        <img src={images[1]} alt="Image 2" />
      </div>
      <div className="image3" onClick={onClick}>
        <img src={images[2]} alt="Image 3" />
      </div>
      <div className="image4" onClick={onClick}>
        <img src={images[3]} alt="Image 4" />
      </div>
      <div className="image5" onClick={onClick}>
        <img src={images[4]} alt="Image 5" />
      </div>
    </div>
  );
};
