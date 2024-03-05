import React from "react";
import { Carousel } from "antd";

export const Slider = ({ images,classname }) => (
  <Carousel autoplay style={{padding:"10px"}}>
    {images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`Slide ${index + 1}`}  className={`slider_${classname}`} />
      </div>
    ))}
  </Carousel>
);
