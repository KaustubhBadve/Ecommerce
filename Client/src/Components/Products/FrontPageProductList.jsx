import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";

export const FrontPageProductList = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="frontPage-listing-item">
      {Object.entries(data).map(([category, brands]) => (
        <div key={category}>
          <span className="category-name">{category?.toUpperCase()}</span>
          <br />
          {Object.entries(brands).map(([brand, products]) => (
            <div key={brand}>
              <hr />
              <span className="brand-name">{brand.toUpperCase()}</span>
              <Swiper
                slidesPerView={category == "tvs" ? 4 : 5}
                spaceBetween={category == "tvs" ? 10 : 45}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="wiper-slide"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`product-slider-main-div-${
                        category == "tvs" ? "tvs" : "mobile"
                      }`}
                      onClick={() => navigate(`/product/${product?.id}`)}
                    >
                      <img
                        src={product?.productImages[0]}
                        alt={product?.title}
                      />
                      <h4>{product.title.slice(0, 30)}...</h4>
                      <p>Price: ₹{(product?.price).toLocaleString("en-IN")}</p>
                      <p>Offer: {product?.offer}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
