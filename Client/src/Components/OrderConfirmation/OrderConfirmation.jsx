import { useSelector } from "react-redux";
import "./order.css"
export const OrderConfirmation = () => {
  const { userName, cart } = useSelector((state) => state?.mainReducer);

  // Function to generate random alphanumeric order number
  const generateOrderNumber = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${randomLetter}${randomNumber}`;
  };

  // Function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  
  // Function to calculate estimated delivery date (four days from today)
  const calculateEstimatedDelivery = () => {
    const today = new Date();
    const estimatedDelivery = new Date(today);
    estimatedDelivery.setDate(today.getDate() + 4);
    return formatDate(estimatedDelivery);
  };

  return (
    <div className="order-comfirmation">
      <h2>Your order is confirmed !</h2>
      <h3>Hello, {userName}</h3>
      <p>Thank you for shopping with us</p>
      <p>Your order is confirmed and will be shipped within two days</p>
      <hr />
      <div className="order-comfirmation-child">

     
      <div className="order-comfirmation-child1">
        <div>
          <p>Order date</p> <p>{formatDate(Date.now())}</p>
        </div>
        <div>
          <p>Estimated Delivery</p>
          <p>{calculateEstimatedDelivery()}</p>
        </div>

        <div>
          <p>Order Number</p>
          <p>{generateOrderNumber()}</p>
        </div>
        <div>
          <p>Payment method</p>
          <p>Cash on Delivery</p>
        </div>
        <div>
          <p>Shipping address</p>
           <p></p>
        </div>
      </div>

      <div className="order-comfirmation-child2">
        
      </div>
      </div>
    </div>
  );
};
