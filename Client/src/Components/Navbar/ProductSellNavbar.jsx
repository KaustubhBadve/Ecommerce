import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { UserOutlined, TruckOutlined, EditOutlined } from "@ant-design/icons";
import Logo from "../../images/Logo.png";
import "./Navbar.css";
import {
  getLocationData,
  findCityAndRegionFromPincode,
} from "../../Lib/Functions/getLocationData";
import ModalPinCode from "./ModalForPinCode";
import LoginModal from "../Login/LoginModal";

export const ProductSellNavbar = () => {
  const [location, setLocation] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);

  useEffect(() => {
    getLocationData().then((locationData) => {
      setLocation(locationData);
      setRegion(locationData?.region);
      setPincode(locationData?.postal);
      setCity(locationData?.city);
    });
  }, []);

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const updatePincode = (val) => {
    findCityAndRegionFromPincode(val).then((data) => {
      let Area = data?.city;
      let Division = data?.region;
      setPincode(val);
      setCity(Area);
      setRegion(Division);
    });
    setPincode(val);
  };
  return (
    <div className="productSell-top-navbar">
      <div>
        {/* <Image src={Logo} /> */}
      </div>
      {location && (
        <div className="productSell-top-location">
          <TruckOutlined style={{ fontSize: "20px" }} />
          <p>
            {city}, {region}, {pincode}{" "}
            <EditOutlined
              style={{ fontSize: "15px", color: "grey" }}
              onClick={handleEditClick}
            />
          </p>
        </div>
      )}
      <div style={{ fontSize: "16px" }} className="productSell-top-location">
        <p>Fees and Commisions</p>
      </div>

      <div style={{ fontSize: "16px" }} className="productSell-top-location">
        <p>Start Selling</p>
      </div>
      <ModalPinCode
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        pincode={pincode}
        updatePincode={updatePincode}
      />

      <LoginModal
        visible={modalLoginVisible}
        onCancel={() => setModalLoginVisible(false)}
      />
    </div>
  );
};

export default ProductSellNavbar;
