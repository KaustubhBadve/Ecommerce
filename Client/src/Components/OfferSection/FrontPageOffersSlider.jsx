import "../component.css";

export const FrontPageOffers = ({ images }) => {
  return (
    <div className="offerSection-frontPage">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} />
        </div>
      ))}
    </div>
  );
};
