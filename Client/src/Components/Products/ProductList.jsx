import "./Product.css";
import { fAsssured } from "../imports";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveStaticOffer } from "../../Redux/action";

export const ProductList = ({ productList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="product-list">
      {productList?.map((product) => {
        let randomRating =
          Math.round((Math.random() * (5 - 2 + 1) + 2) * 10) / 10;
        let ratingColor = randomRating > 3 ? "green" : "red";
        let discount = Math.floor(Math.random() * 24 + 5);
        let discountedPrice = Math.round(
          (product?.price * (100 - discount)) / 100
        );
        const currentDate = new Date();
        const randomDays = Math.floor(Math.random() * 5) + 2;
        const deliveryDate = new Date(
          currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
        );
        const NoOfRating =
          Math.floor(Math.random() * (10000 - 1099 + 1)) + 1099;
        const NoOfReviews = Math.floor(Math.random() * (1000 - 467 + 1)) + 467;
        const formattedDate = deliveryDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        });

        const NavigateToProduct = (id) => {
          let offer = {
            deliveryDate: formattedDate,
            NoOfReviews,
            NoOfRating,
            discountedPrice,
            discount,
            randomRating,
            ratingColor,
          };
          dispatch(saveStaticOffer(offer));
          navigate(`/product/${id}`);
        };

        return (
          <div
            className="product-list-Individual-main-div"
            onClick={() => NavigateToProduct(product?.id)}
            key={product?.id}
          >
            <div>
              <img src={product?.productImages[0]} alt="productImg" />
            </div>
            <div>
              <h2 className="product-title">{product?.title}</h2>
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
                  {randomRating} <StarOutlined />
                </span>{" "}
                {`${NoOfRating?.toLocaleString('en-IN')} Ratings & ${NoOfReviews?.toLocaleString('en-IN')} Reviews`}
              </div>
              {product?.highlight.map((highlight) => {
                return <li>{highlight}</li>;
              })}
            </div>
            <div>
              <div>
                <span>₹ {discountedPrice?.toLocaleString('en-IN')}</span>
                <img src={fAsssured} alt="" />
              </div>
              <div>
                <span
                  style={{ color: "grey", textDecorationLine: "line-through" }}
                >
                  ₹ {product?.price?.toLocaleString('en-IN')}
                </span>{" "}
                <span style={{ color: "green" }}>{discount?.toLocaleString('en-IN')}% Off</span>
              </div>
              <div>
                Free delivery by{" "}
                <b style={{ color: "green" }}> {formattedDate}</b>
              </div>
              <div>
                Upto <b>₹ {(discountedPrice - 1899)?.toLocaleString('en-IN')}</b> off on Exchange
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
