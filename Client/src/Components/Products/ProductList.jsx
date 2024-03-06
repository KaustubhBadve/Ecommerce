import "./Product.css";
import { fAsssured } from "../imports";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const ProductList = ({ productList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="product-list">
      {productList?.map((product) => {
        let ratingColor = product?.avgRating > 3 ? "green" : "red";
        let discountedPrice = Math.round(
          (product?.price * (100 - product?.offer)) / 100
        );
        const currentDate = new Date();
        const randomDays = Math.floor(Math.random() * 5) + 2;
        const deliveryDate = new Date(
          currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
        );
        const formattedDate = deliveryDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        });

        return (
          <div
            className="product-list-Individual-main-div"
            onClick={() => navigate(`/product/${product?.id}`)}
            key={product?.id}
          >
            <div
              className={`product-list-Individual-main-div-${
                product?.category == "tv's" ? "tvs" : "mobile"
              }`}
            >
              <img src={product?.productImages[0]} alt="productImg" />
            </div>
            <div>
              <h2 className="product-title">
                {product?.title?.slice(0, 100)}...
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "550",
                  color: "#878787",
                }}
              >
                <span
                  style={{
                    backgroundColor: ratingColor,
                    color: "white",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {product?.avgRating} <StarOutlined />
                </span>{" "}
                {`${product?.ratings?.toLocaleString(
                  "en-IN"
                )} Ratings & ${product?.reviews?.toLocaleString(
                  "en-IN"
                )} Reviews`}
              </div>
              {product?.highlight.map((highlight) => {
                return <li>{highlight}</li>;
              })}
            </div>
            <div>
              <div>
                <span>₹ {discountedPrice?.toLocaleString("en-IN")}</span>
                <img src={fAsssured} alt="" />
              </div>
              <div>
                <span
                  style={{ color: "grey", textDecorationLine: "line-through" }}
                >
                  ₹ {product?.price?.toLocaleString("en-IN")}
                </span>{" "}
                <span style={{ color: "green" }}>
                  {product?.offer?.toLocaleString("en-IN")}% Off
                </span>
              </div>
              <div>
                Free delivery by{" "}
                <b style={{ color: "green" }}> {formattedDate}</b>
              </div>
              <div>
                Upto{" "}
                <b>₹ {(discountedPrice - Math.floor(discountedPrice*0.2))?.toLocaleString("en-IN")}</b> off
                on Exchange
              </div>
              <div style={{ color: "green" }}>
                <b>Bank Offer</b>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
