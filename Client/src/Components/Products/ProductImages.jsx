import {
  FireOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Image, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishList, getProduct } from "../../Redux/action";
import LoginModal from "../Login/LoginModal";

export const ProductImages = ({ images, category, product }) => {
  const [selectedImage, setSelectedImage] = useState(
    images?.length > 0 ? images[2] : ""
  );
  const [heartColor, setHeartColor] = useState(
    product?.isFavourate ? "#ff5857" : "#c8c8c8"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state?.mainReducer);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleHeartClick = () => {
    dispatch(addToWishList(product?.id));

    setTimeout(() => {
      dispatch(getProduct(product?.id));
      setHeartColor(product?.isFavourate ? "#ff5857" : "#c8c8c8");
    }, 800);
  };

  const handleAddToCart = () => {
    if (!userName) {
      setModalLoginVisible(true);
    } else {
      dispatch(addToCart(product?.id));
      message.success("Product added to cart");
    }
  };
  return (
    <div className="product-individual-images-main">
      <div className="product-individual-images-main2">
        <div>
          {images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div
          className={category == "tv's" ? "Imagetvs" : "Imagemobile"}
          style={{ position: "relative" }}
        >
          <Image src={selectedImage} alt="Selected Image" />
          <HeartFilled
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              color: heartColor,
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => handleHeartClick(product.id)}
          />
        </div>
      </div>
      <div>
        <Button
          style={{ backgroundColor: "#FF9E00", color: "white" }}
          type="primary"
          size={"large"}
          onClick={() => handleAddToCart()}
        >
          <ShoppingCartOutlined /> ADD TO CART
        </Button>
        <Button
          style={{ backgroundColor: "#FB641B", color: "white" }}
          type="primary"
          size={"large"}
        >
          <FireOutlined /> BUY NOW
        </Button>
      </div>
      <LoginModal
        visible={modalLoginVisible}
        onCancell={() => setModalLoginVisible(false)}
      />
    </div>
  );
};
