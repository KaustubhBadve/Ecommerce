import { Button } from "antd";
import React, { useState, useEffect } from "react";
import "./Cart.css";

export const AddressBox = ({
  name,
  address1,
  address2,
  city,
  state,
  pincode,
  mobileNo,
  email,
  setIsAddressBox,
  setIsAddress
}) => {
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
  }, []);

  const handleEdit=()=>{
    setIsAddressBox(false)
    setIsAddress(true)
  }

  return (
    <div className="address-Box">
      <h2>ADDRESS</h2>
      <hr />
      <div className="address-Box-child">
        <h4>{name}</h4>
        <p>{email}</p>
        <p>
          {address1}, {address2 ? address1 : null},  {city}, {state}, {pincode}
        </p>
        <p>{mobileNo}</p>
      </div>
     <div><Button onClick={handleEdit}>Edit</Button></div> 
    </div>
  );
};
