import { Button } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems, reomveCartItems } from "../../Redux/action";
import { images } from "../imports";
import "./order.css";
export const OrderConfirmation = () => {
  const { userName, cart } = useSelector((state) => state?.mainReducer);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreOffers, setShowMoreOffers] = useState(false);

  const generateOrderNumber = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${randomLetter}${randomNumber}`;
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const calculateEstimatedDelivery = () => {
    const today = new Date();
    const estimatedDelivery = new Date(today);
    estimatedDelivery.setDate(today.getDate() + 4);
    return formatDate(estimatedDelivery);
  };

  const handleBackToHome =()=>{
     dispatch(reomveCartItems(0))
     navigate("/")
  }

  return (
    <div className="orderConfirmMain">
      <div className="order-comfirmation">
        <h2 style={{ textAlign: "center" }}>Your order is confirmed  <CheckCircleFilled style={{color:"#52c41a"}} /></h2>
        <h3>Hello, {userName}</h3>
        <p>Thank you for shopping with us</p>
        <p>Your order is confirmed and will be shipped within two days</p>
        <hr />
        <div className="order-comfirmation-child">
          <div className="order-comfirmation-child1">
            <div className="gridBox">
              <div>
                <p>Order date</p> <p>{formatDate(Date.now())}</p>
              </div>
              <div>
                <p>Estimated Delivery</p>
                <p>{calculateEstimatedDelivery()}</p>
              </div>

              <div>
                <p>Order Number</p>
                <p>{generateOrderNumber()}</p>
              </div>
              <div>
                <p>Payment method</p>
                <p>Cash on Delivery</p>
              </div>
              <div>
                <p>Order Price</p>
                <p>{generateOrderNumber()}</p>
              </div>
              <div>
                <p>Payment method</p>
                <p>Cash on Delivery</p>
              </div>
            </div>
            <Button onClick={handleBackToHome} type="primary">Go Back to Home</Button>
          </div>

          <div className="order-comfirmation-child2">
            <div>
              {cart?.slice(0, 2).map((product) => {
                let discountedPrice = Math.round(
                  (product?.price * (100 - product?.offer)) / 100
                );
                const titleSlicedVal = !isMobile ? 40 : 90;

                return (
                  <div className="product-list-orderConfirm" key={product?.id}>
                    <div
                      className={`product-list-orderConfirm-${
                        product?.category == "tv's" ? "tvs" : "mobile"
                      }`}
                    >
                      <img src={product?.productImages[0]} alt="productImg" />
                    </div>
                    <div>
                      <h3>
                        {product?.title?.slice(0, titleSlicedVal)}
                        {product?.title.length > titleSlicedVal ? "..." : ""}
                      </h3>
                      <div>
                        <span>
                          ₹ {discountedPrice?.toLocaleString("en-IN")}
                        </span>
                        <img src={images?.fAsssured} alt="" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {!showMoreOffers && cart.length > 2 && (
                <p
                  style={{
                    textAlign: "right",
                    paddingRight: "20px",
                  }}
                  className="frontPage-readMore-op"
                >
                  <span onClick={() => setShowMoreOffers(true)}>View more</span>
                </p>
              )}

              {showMoreOffers &&
                cart?.slice(2).map((product) => {
                  let discountedPrice = Math.round(
                    (product?.price * (100 - product?.offer)) / 100
                  );
                  const titleSlicedVal = !isMobile ? 40 : 90;

                  return (
                    <div
                      className="product-list-orderConfirm"
                      key={product?.id}
                    >
                      <div
                        className={`product-list-orderConfirm-${
                          product?.category == "tv's" ? "tvs" : "mobile"
                        }`}
                      >
                        <img src={product?.productImages[0]} alt="productImg" />
                      </div>
                      <div>
                        <h3>
                          {product?.title?.slice(0, titleSlicedVal)}
                          {product?.title.length > titleSlicedVal ? "..." : ""}
                        </h3>
                        <div>
                          <span>
                            ₹ {discountedPrice?.toLocaleString("en-IN")}
                          </span>
                          <img src={images?.fAsssured} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              {showMoreOffers && cart.length > 2 && (
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
          </div>
        </div>
      </div>
    </div>
  );
};
