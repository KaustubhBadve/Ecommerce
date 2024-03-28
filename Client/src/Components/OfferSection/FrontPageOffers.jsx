import { useNavigate } from "react-router-dom";
import "../component.css";

export const FrontPageOffers = ({ images }) => {
  const navigate=useNavigate()
  return (
    <div className="offerSection-frontPage">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} onClick={()=>navigate("/productlist")} />
        </div>
      ))}
    </div>
  );
};
