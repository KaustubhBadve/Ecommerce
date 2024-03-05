import { StarOutlined, StrikethroughOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { findCityAndRegionFromPincode } from "../../Lib/Functions/getLocationData";
import { offers } from "../../Lib/staticData";
import "./Product.css";
const { Search } = Input;

export const ProductDetails = ({ product, offerSection }) => {
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [pincodeError, setPincodeError] = useState(false);

  const handlePincode = async (val) => {
    setLoading(true);
    let op = await findCityAndRegionFromPincode(val);
    if (op?.region) {
      setPincodeError(false);
      setCity(`${op?.city},${op?.region}`);
    } else {
      setCity("");
      setPincodeError(true);
    }

    setLoading(false);
  };
  return (
    <div className="product-individual-main">
      <h2>{product?.title}</h2>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "550",
          color: "#878787",
        }}
      >
        <span
          style={{
            backgroundColor: offerSection?.ratingColor,
            color: "white",
            padding: "2px 5px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {(offerSection?.randomRating)?.toLocaleString("en-IN")}{" "}
          <StarOutlined />
        </span>{" "}
        {`${offerSection?.NoOfRating?.toLocaleString(
          "en-IN"
        )} Ratings & ${offerSection?.NoOfReviews?.toLocaleString(
          "en-IN"
        )} Reviews`}
      </div>
      <h4
        style={{
          color: "green",
          marginBottom: "0px",
        }}
      >
        Extra ₹{" "}
        {(product?.price - offerSection?.discountedPrice)?.toLocaleString(
          "en-IN"
        )}{" "}
        Off
      </h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0px",
        }}
      >
        <h1>₹ {offerSection?.discountedPrice?.toLocaleString("en-IN")}</h1>
        <span
          style={{
            color: "grey",
            fontSize: "1.2rem",
            textDecorationLine: "line-through",
          }}
        >
          ₹ {product?.price?.toLocaleString("en-IN")}
        </span>
        <h3 style={{ color: "green" }}>{offerSection?.discount}% Off</h3>
      </div>
      <div>
        <ul>Available offers</ul>
        <div>
          {offers?.slice(0, 3).map((offer, index) => {
            const words = offer.split(" ");
            const removedWords = words.slice(0, 2);
            const remainingWords = words.slice(2).join(" ");
            return (
              <p key={index}>
                <StrikethroughOutlined
                  style={{ backgroundColor: "green", color: "white" }}
                />
                <b> {removedWords.join(" ")} </b> {remainingWords}
              </p>
            );
          })}

          {!showMoreOffers && offers?.length > 3 && (
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
            offers?.slice(3).map((offer, index) => {
              const words = offer.split(" ");
              const removedWords = words.slice(0, 2);
              const remainingWords = words.slice(2).join(" ");
              return (
                <p key={index + 3}>
                  <StrikethroughOutlined
                    style={{ backgroundColor: "green", color: "white" }}
                  />
                  <b> {removedWords.join(" ")} </b> {remainingWords}
                </p>
              );
            })}
          {showMoreOffers && offers?.length > 3 && (
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
      </div>

      <div>
        <ul>Highlights</ul>
        <div>
          {product?.highlight?.map((highlight) => {
            return <li>{highlight}</li>;
          })}
        </div>
      </div>

      <div>
        <ul>Description</ul>
        <div>{product?.description}</div>
      </div>

      <div>
        <ul>Easy Payment Options</ul>
        <div>
          <li>
            No cost EMI starting from ₹{" "}
            {Math.floor(offerSection?.discountedPrice / 3)?.toLocaleString(
              "en-IN"
            )}
            /month
          </li>
          <li>Cash on Delivery</li>
          <li>Net banking & Credit/ Debit/ ATM card</li>
        </div>
      </div>

      <div>
        <ul>Delivery</ul>
        <div>
          <Search
            placeholder="Enter Pincode"
            enterButton
            size="medium"
            loading={loading}
            minLength={6}
            maxLength={6}
            onSearch={handlePincode}
          />
          {city && (
            <p style={{ color: "green" }}>
              Order gets Delivered to <b>{city}</b>
            </p>
          )}
          {pincodeError && (
            <p style={{ color: "red" }}>Please enter valid pincode</p>
          )}
        </div>
      </div>
    </div>
  );
};
