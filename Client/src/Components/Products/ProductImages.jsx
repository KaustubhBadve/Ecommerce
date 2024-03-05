import { FireOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import React, { useState } from "react";

export const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(
    images?.length ? images[0] : ""
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
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
        <div>
          <Image src={selectedImage} alt="Selected Image" />
        </div>
      </div>
      <div>
        <Button
          style={{ backgroundColor: "#FF9E00", color: "white" }}
          type="primary"
          size={"large"}
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
    </div>
  );
};
