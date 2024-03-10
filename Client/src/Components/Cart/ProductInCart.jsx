import "./Cart.css";
import { images } from "../imports";
import { QqOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, InputNumber } from "antd";

export const ProductInCart = ({ productList, wishList = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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

  const { totalPrice, totalDiscount } = productList.reduce(
    (totals, product) => {
      let originalPrice = product.price * count;
      let discountedPrice =
        Math.round((product.price * (100 - product.offer)) / 100) * count;
      return {
        totalPrice: totals.totalPrice + originalPrice,
        totalDiscount: totals.totalDiscount + (originalPrice - discountedPrice),
      };
    },
    { totalPrice: 0, totalDiscount: 0 }
  );

  return (
    <div className="product-list-cart">
      <div>
        {productList?.length ? (
          <div>
            {productList?.map((product) => {
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
              const titleSlicedVal = !isMobile ? 40 : 90;

              return (
                <div
                  className="product-list-Individual-main-div-cart"
                  key={product?.id}
                >
                  <div
                    className={`product-list-Individual-main-div-cart-${
                      product?.category == "tv's" ? "tvs" : "mobile"
                    }`}
                  >
                    <img src={product?.productImages[0]} alt="productImg" />
                  </div>
                  <div>
                    <h3 className="product-title">
                      {product?.title?.slice(0, titleSlicedVal)}
                      {product?.title.length > titleSlicedVal ? "..." : ""}
                    </h3>
                    <div>
                      <span>₹ {discountedPrice?.toLocaleString("en-IN")}</span>
                      <img src={images?.fAsssured} alt="" />
                    </div>
                    <div>
                      <span
                        style={{
                          color: "grey",
                          textDecorationLine: "line-through",
                        }}
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
                  </div>
                  <div>
                    <InputNumber
                      min={1}
                      max={5}
                      value={count}
                      controls={false}
                      onChange={(value) => setCount(value)}
                      addonBefore={<button onClick={handleIncrease}>+</button>}
                      addonAfter={<button onClick={handleDecrease}>-</button>}
                    />
                    <Button>Remove</Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="product-list-NoData"
            style={{
              fontSize: "2rem",
              fontWeight: 550,
              color: "#394C6F",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            <QqOutlined style={{ fontSize: "5rem" }} />
            <p>No Items in your Cart</p>
          </div>
        )}
      </div>
      <div className="cart-pricing-section">
        <h2>PRICE DETAILS</h2>
        <hr />
        <div>
          <div>
            <p>Price ({productList.length} Items)</p>
            <p>₹ {totalPrice.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p>Discount</p>
            <p style={{ color: "green" }}>
              - ₹ {totalDiscount.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p>Delivery Charges</p>
            <p>
              <span style={{ textDecoration: "line-through" }}>₹ 40 </span>{" "}
              <span style={{ color: "green" }}>Free</span>
            </p>
          </div>
          <div>
            <p>Secured Packaging Fee</p>
            <p>₹ 99</p>
          </div>

          <hr />
          <div>
            <p>Total Amount</p>
            <p>₹{(totalPrice - totalDiscount + 99).toLocaleString("en-IN")}</p>
          </div>
        </div>
        <p style={{ color: "green", fontWeight: "550", marginTop: "30px" }}>
          You will save ₹{(totalDiscount - 40).toLocaleString("en-IN")} on this
          order
        </p>
        <Button
          style={{ backgroundColor: "#FB641B", color: "white", width:"60%", marginTop:"30px" }}
          type="primary"
          size={"large"}
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
};
