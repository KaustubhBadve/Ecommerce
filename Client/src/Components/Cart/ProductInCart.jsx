import "./Cart.css";
import { images } from "../imports";
import { QqOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, InputNumber, message } from "antd";
import { useDispatch } from "react-redux";
import { reomveCartItems } from "../../Redux/action";
import { useNavigate } from "react-router-dom";

export const ProductInCart = ({ productList }) => {
  const [isMobile, setIsMobile] = useState(false);
  // const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    productList.forEach((product) => {
      initialCounts[product.id] = 1;
    });
    setCounts(initialCounts);
  }, [productList]);

  const handleIncrease = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.min(prevCounts[productId] + 1, 5),
    }));
  };

  const handleDecrease = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(prevCounts[productId] - 1, 1),
    }));
  };

  const handleRemoveItem = (id) => {
    dispatch(reomveCartItems(id));
    message.warning("Item removed from cart");
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

  const { totalPrice = 0, totalDiscount = 0 } = (productList || []).reduce(
    (totals, product) => {
      let originalPrice = product.price * counts[product.id];
      let discountedPrice =
        Math.round((product.price * (100 - product.offer)) / 100) *
        counts[product.id];
      return {
        totalPrice: totals.totalPrice + originalPrice,
        totalDiscount: totals.totalDiscount + (originalPrice - discountedPrice),
      };
    },
    { totalPrice: 0, totalDiscount: 0 }
  );

  return productList?.length ? (
    <div className="product-list-cart">
      <div>
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
                    value={counts[product.id]}
                    controls={false}
                    onChange={(value) =>
                      setCounts((prevCounts) => ({
                        ...prevCounts,
                        [product.id]: value,
                      }))
                    }
                    addonBefore={
                      <Button
                        size="small"
                        type="dashed"
                        onClick={() => handleIncrease(product.id)}
                      >
                        +
                      </Button>
                    }
                    addonAfter={
                      <Button
                        size="small"
                        type="dashed"
                        onClick={() => handleDecrease(product.id)}
                      >
                        -
                      </Button>
                    }
                  />
                  <Button
                    size="small"
                    style={{ cursor: "pointer" }}
                    danger
                    onClick={() => handleRemoveItem(product?.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
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
          style={{
            backgroundColor: "#FB641B",
            color: "white",
            width: "60%",
            marginTop: "30px",
          }}
          type="primary"
          size={"large"}
        >
          PLACE ORDER
        </Button>
      </div>
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
        width: "100%",
      }}
    >
      <QqOutlined style={{ fontSize: "5rem" }} />
      <p>Your cart is empty!</p>
      <Button
        style={{
          backgroundColor: "#3E4F6B",
          width: "30%",
          marginTop: "30px",
        }}
        type="primary"
        size={"large"}
        onClick={() => navigate("/")}
      >
        Shop now
      </Button>
    </div>
  );
};
