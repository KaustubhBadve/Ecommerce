import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Login/LoginModal";

export const PricingDetails = ({btn}) => {
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const {cartTotalPrice,cartTotalDiscount,cart,userName}=useSelector((state)=>state.mainReducer)
    const navigate=useNavigate()

    const handlePlaceOrder =()=>{
      if (userName) {
        navigate("/address")
      } else {
        setModalLoginVisible(true);
      }
    }
  return (
    <div className="cart-pricing-section">
      <h2>PRICE DETAILS</h2>
      <hr />
      <div>
        <div>
          <p>Price ({cart?.length} Items)</p>
          <p>₹ {cartTotalPrice?.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p>Discount</p>
          <p style={{ color: "green" }}>
            - ₹ {cartTotalDiscount?.toLocaleString("en-IN")}
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
          <p>₹{(cartTotalPrice - cartTotalDiscount + 99)?.toLocaleString("en-IN")}</p>
        </div>
      </div>
      
      {btn ==1 &&
      <>
      <p style={{ color: "green", fontWeight: "550", marginTop: "30px" }}>
        You will save ₹{(cartTotalDiscount - 40)?.toLocaleString("en-IN")} on this
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
        onClick={()=>handlePlaceOrder()}
      >
        PLACE ORDER
      </Button>
      </>
      }
        <LoginModal
        visible={modalLoginVisible}
        onCancell={() => setModalLoginVisible(false)}
      />
    </div>
  );
};
