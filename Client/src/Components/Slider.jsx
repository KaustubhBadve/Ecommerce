
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade
} from "swiper/modules";


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


SwiperCore.use([Autoplay, Pagination,EffectFade]);

export const Slider = ({ images, clasName }) => (
  <Swiper
    autoplay={{ delay: 3000 }}
    loop={true}
    spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,EffectFade, Pagination]}
  >
    {images.map((image, index) => (
      <SwiperSlide key={index}>
        <img
          src={image}
          alt={`Slide ${index + 1}`}
          className={`slider_${clasName}`}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);