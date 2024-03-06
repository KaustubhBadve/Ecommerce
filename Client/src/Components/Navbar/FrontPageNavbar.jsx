import React, { useState, useEffect } from "react";
import {  Input } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Logo from "../../images/Logo.png";
import "./Navbar.css";
import {
  getLocationData,
  findCityAndRegionFromPincode,
} from "../../Lib/Functions/getLocationData";
import ModalPinCode from "./ModalForPinCode";
import LoginModal from "../Login/LoginModal";
import {images} from "../imports"
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const FrontPageNavbar = () => {
  const navigate=useNavigate()
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
    <div className="front-top-navbar">
      <div>
        <img onClick={()=>navigate("/")} src={Logo} style={{width:"100%", height:"100%", borderRadius:"10px"}}/>
      </div>
      {location && (
        <div className="navbar-top-location">
          <img src={images?.locationn}/>
          <p>
            {city}, {region}, {pincode}{" "}
            <EditOutlined
              style={{ fontSize: "15px", color: "grey" }}
              onClick={handleEditClick}
            />
          </p>
        </div>
      )}
      <Search
        placeholder="Search for product category or brand"
        onSearch={(value) => console.log("Searched:", value)}
        className="navbar-top-searchBar"
      />
      <div className="navbar-top-icon">
        <HeartOutlined onClick={() => setModalLoginVisible(true)} />{" "}
        <p>Wish List</p>
      </div>
      <div className="navbar-top-icon">
        <UserOutlined /> <p>Hi, Sign In</p>
      </div>
      <div className="navbar-top-icon">
        <ShoppingCartOutlined style={{ fontSize: "40px" }} />
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

export default FrontPageNavbar;
