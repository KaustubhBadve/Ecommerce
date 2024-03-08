import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  MenuOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import Logo from "../../images/Logo.png";
import "./Navbar.css";
import {
  getLocationData,
  findCityAndRegionFromPincode,
} from "../../Lib/Functions/getLocationData";
import ModalPinCode from "./ModalForPinCode";
import LoginModal from "../Login/LoginModal";
import { images } from "../imports";
import { useNavigate } from "react-router-dom";
import { getCategoris, getProductList } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";

const { Search } = Input;

export const FrontPageNavbar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.mainReducer);

  useEffect(() => {
    dispatch(getCategoris());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToProducts = (val) => {
    dispatch(getProductList(val));
    setShowMenu(!showMenu);
    navigate(`/productlist?category=${val}`);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
        <img onClick={() => navigate("/")} src={Logo} />
      </div>
      {location && (
        <div className="navbar-top-location">
          <img src={images?.locationn} />
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
      <div className="navbar-top-icon-WishList">
        <HeartTwoTone twoToneColor="#182336" onClick={() => setModalLoginVisible(true)} />{" "}
        <p>Wish List</p>
      </div>
      <div className="navbar-top-icon">
        <UserOutlined /> <p>Hi, Sign In</p>
      </div>
      <div className="navbar-top-icon-cart">
        <ShoppingCartOutlined />
      </div>

      {isMobile ? (
        <div ref={sidebarRef} className={`navabr-categories-menu-${showMenu}`}>
          <MenuOutlined
            className={`menu-icon-${showMenu}`}
            onClick={toggleMenu}
          />
          <div className={`nav-elements-${showMenu}`}>
            <ul>
              {categories?.map((item) => (
                <li
                  key={item.categoryName}
                  onClick={() =>
                    navigateToProducts(item.categoryName.toLowerCase())
                  }
                >
                  {item.categoryName}
                </li>
              ))}
            </ul>
            <div>
              <img
                style={{ borderRadius: "10px" }}
                src={images.categoryNavbar}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}

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
