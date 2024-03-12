import React, { useState, useEffect } from "react";
import "./Cart.css";
import { images } from "../imports";
import { Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
export const PaymentOptions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const navigate=useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const countDown = () => {
    let secondsToGo = 6;
    const modalInstance = Modal.info({
      title: 'Redirecting to Payment Gateway',
      content: (
        <div>
          <Spin size="large" />
          <p>Please wait while we redirect you to the payment gateway...</p>
        </div>
      ),
      centered: true,
      maskClosable: false,
    });
  
    setTimeout(() => {
      clearInterval(timer);
      modalInstance.update({
        title: 'While payment gateways are being developed',
        content: `Please choose Cash on Delivery (COD)`,
      });
    }, 3000);
  
    const timer = setInterval(() => {
      secondsToGo -= 1;
      if (secondsToGo <= 0) {
        clearInterval(timer);
        modalInstance.destroy();
      }
    }, 1000);
  }
  const handleCOD=()=>{
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      navigate("/orderconfirm")
    }, 3000);
    
  }
  
    

  return (
    <div className="payment-options">
      <h2>PAYMENT OPTIONS </h2>
      <hr />
      <div>
        <p onClick={countDown}>
          <img src={images.Paytym} alt="" />
          <p>Paytm payment bank wallet</p>
        </p>

        <p onClick={countDown}>
          <img src={images.UPI} alt="" />
          <p>Pay with any UPI App</p>
        </p>

        <p onClick={countDown}>Credit / Debit / ATM Card / Net Banking</p>
        <p onClick={handleCOD}>Cash on Delivery</p>
      </div>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
    </div>
  );
};
