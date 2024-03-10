import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import { HeartFilled, StarTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToWishList, getDataGroupWise } from "../../Redux/action";

export const FrontPageProductList = ({ data }) => {
  const navigate = useNavigate();
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="frontPage-listing-item">
      {Object.entries(data).map(([category, brands]) => (
        <div key={category}>
          <span className="category-name">{category?.toUpperCase()}</span>
          <br />
          {Object.entries(brands)
            .slice(0, 2)
            .map(([brand, products]) => (
              <div className="frontPage-productDisplay-brandrow" key={brand}>
                <hr />
                <span className="brand-name">{brand.toUpperCase()}</span>
                <Swiper
                  slidesPerView={isMobile ? (category == "tv's" ? 4 : 5) : 1}
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
                      product?.avgRating > 3 ? "green" : "#ff5857";
                    var heartColor = product.isFavourate
                      ? "#ff5857"
                      : "#c8c8c8";
                    const handleHeartClick = (id) => {
                      dispatch(addToWishList(id));

                      setTimeout(() => {
                        dispatch(getDataGroupWise());
                      }, 1000);
                    };
                    return (
                      <SwiperSlide key={index}>
                        <div
                          className={`product-slider-main-div-${
                            category == "tv's" ? "tvs" : "mobile"
                          }`}
                        >
                          <img
                            src={product?.productImages[0]}
                            alt={product?.title}
                          />
                          <HeartFilled
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "0px",
                              color: heartColor,
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleHeartClick(product.id)}
                          />
                          <h4>{product?.title?.slice(0, 30)}...</h4>
                          <div
                            onClick={() => navigate(`/product/${product?.id}`)}
                            className="product-slider-front-bottom-div"
                          >
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
                              {product?.avgRating}{" "}
                              <StarTwoTone twoToneColor="white" />
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
            <p className="frontPage-readMore-op">
              <span onClick={() => setShowMoreOffers(true)}>
                Explore more brands
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
                    slidesPerView={isMobile ? (category == "tv's" ? 4 : 5) : 1}
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
                                {product?.avgRating}{" "}
                                <StarTwoTone twoToneColor="red" />
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
                className="frontPage-readMore-op"
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
