import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import { StarOutlined } from "@ant-design/icons";

export const FrontPageProductList = ({ data }) => {
  const navigate = useNavigate();
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  return (
    <div className="frontPage-listing-item">
      {Object.entries(data).map(([category, brands]) => (
        <div key={category}>
          <span className="category-name">{category?.toUpperCase()}</span>
          <br />
          {Object.entries(brands)
            .slice(0, 2)
            .map(([brand, products]) => (
              <div key={brand}>
                <hr />
                <span className="brand-name">{brand.toUpperCase()}</span>
                <Swiper
                  slidesPerView={category == "tv's" ? 4 : 5}
                  spaceBetween={category == "tv's" ? 10 : 45}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="wiper-slide"
                >
                  {products.map((product, index) => {
                    let discountedPrice = Math.round(
                      (product?.price * (100 - product?.offer)) / 100
                    );
                    let ratingColor = product?.avgRating > 3 ? "green" : "red";
                    return (
                      <SwiperSlide key={index}>
                        <div
                          className={`product-slider-main-div-${
                            category == "tv's" ? "tvs" : "mobile"
                          }`}
                          onClick={() => navigate(`/product/${product?.id}`)}
                        >
                          <img
                            src={product?.productImages[0]}
                            alt={product?.title}
                          />
                          <h4>{product?.title?.slice(0, 30)}...</h4>
                          <div className="product-slider-front-bottom-div">
                            <div>
                              <b>
                                ₹ {discountedPrice?.toLocaleString("en-IN")}
                              </b>
                              <p>{product?.offer}% Off</p>
                            </div>
                            <span
                              style={{
                                backgroundColor: ratingColor,
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {product?.avgRating} <StarOutlined />
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ))}

          {!showMoreOffers && Object.entries(brands)?.length > 2 && (
            <p>
              <span
                style={{ color: "#357af1", cursor: "pointer" }}
                onClick={() => setShowMoreOffers(true)}
              >
                Read more
              </span>
            </p>
          )}

          {showMoreOffers &&
            Object.entries(brands)
              ?.slice(2)
              .map(([brand, products]) => (
                <div key={brand}>
                  <hr />
                  <span className="brand-name">{brand.toUpperCase()}</span>
                  <Swiper
                    slidesPerView={category == "tv's" ? 4 : 5}
                    spaceBetween={category == "tv's" ? 10 : 45}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    className="wiper-slide"
                  >
                    {products.map((product, index) => {
                      let discountedPrice = Math.round(
                        (product?.price * (100 - product?.offer)) / 100
                      );
                      let ratingColor =
                        product?.avgRating > 3 ? "green" : "red";
                      return (
                        <SwiperSlide key={index}>
                          <div
                            className={`product-slider-main-div-${
                              category == "tv's" ? "tvs" : "mobile"
                            }`}
                            onClick={() => navigate(`/product/${product?.id}`)}
                          >
                            <img
                              src={product?.productImages[0]}
                              alt={product?.title}
                            />
                            <h4>{product?.title?.slice(0, 30)}...</h4>
                            <div className="product-slider-front-bottom-div">
                              <div>
                                <b>
                                  ₹ {discountedPrice?.toLocaleString("en-IN")}
                                </b>
                                <p>{product?.offer}% Off</p>
                              </div>
                              <span
                                style={{
                                  backgroundColor: ratingColor,
                                  color: "white",
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                {product?.avgRating} <StarOutlined />
                              </span>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              ))}
          {showMoreOffers && Object.entries(brands)?.length > 2 && (
            <p>
              <span
                style={{ color: "#357af1", cursor: "pointer" }}
                onClick={() => setShowMoreOffers(false)}
              >
                Hide
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
