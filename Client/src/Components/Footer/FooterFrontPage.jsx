import {
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import "./footer.css";

export const FooterFrontPage = () => {
  const column1Items = [
    "HOME",
    "ABOUT US",
    "STORE LOCATOR",
    "CAREERS",
    "CONTACT US",
    "BRAND STORES",
    "E-WASTE",
    "BLOG",
    "LOYALTY",
  ];

  const column2Items = [
    "AIR CONDITIONERS",
    "MOBILES & TABLETS",
    "TELEVISIONS",
    "LAPTOP & PRINTER",
    "HOME APPLIANCES",
    "KITCHEN APPLIANCES",
    "TV & ENTERTAINMENT",
    "PERSONAL CARE",
    "CAMERA",
  ];

  const column3Items = ["MY ACCOUNT", "MY ORDERS"];

  const column4Items = [
    "TERMS OF USE",
    "PRIVACY POLICY",
    "PAYMENT & RETURNS",
    "SHIPPING OPTION",
    "HELP/FAQ",
    "LOYALTY PROGRAMME",
  ];

  const cities = [
    "AHMEDABAD",
    "DELHI",
    "FARIDABAD",
    "GURGAON",
    "HYDERABAD",
    "INDIRAPURAM",
    "KAKINADA",
    "MUMBAI",
    "NAVI MUMBAI",
    "NOIDA",
    "PALGHAR",
    "PUNE",
    "RAJAHMUNDRY",
    "SURAT",
    "THANE",
    "TIRUPATI",
    "VADODARA",
    "VIJAYAWADA",
    "VISAKHAPATNAM",
    "WARANGAL",
  ];

  const socialMediaStyle = {
    fontSize: "24px",
    marginRight: "10px",
    color: "#F8D89B",
  };

  return (
    <div className="footer-front-page">
      <div className="footer-front-page-sub1">
        <div>
          <ul>Useful Links</ul>
          {column1Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
        <div>
          <ul>Categories</ul>
          {column2Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
        <div>
          <ul>My Account</ul>
          {column3Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
        <div>
          <ul>Info</ul>
          {column4Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
        <div className="footer-last-column">
          <ul>Newsletter</ul>
          <p>
            Stay in touch with us, get product updates, offers, discounts
            directly to your inbox
          </p>
          <Input
            placeholder="Enter your E-mail"
            addonAfter={
              <MailOutlined style={{ color: "red", cursor: "pointer" }} />
            }
          />
          <span>We'll never share your email address with a third party.</span>

          <ul>Follow Us On</ul>
          <div>
            <a href="https://www.facebook.com/your-facebook-page-url">
              <FacebookOutlined style={socialMediaStyle} />
            </a>
            <a href="https://www.instagram.com/your-instagram-page-url">
              <InstagramOutlined style={socialMediaStyle} />
            </a>
            <a href="https://www.youtube.com/your-youtube-channel-url">
              <YoutubeOutlined style={socialMediaStyle} />
            </a>
            <a href="https://twitter.com/your-twitter-account-url">
              <TwitterOutlined style={socialMediaStyle} />
            </a>
            <a href="https://www.linkedin.com/your-linkedin-page-url">
              <LinkedinOutlined style={socialMediaStyle} />
            </a>
            <a href="https://api.whatsapp.com/send?phone=your-whatsapp-number">
              <WhatsAppOutlined style={socialMediaStyle} />
            </a>
          </div>

          <ul>FOR ONLINE ORDER</ul>
          <h2>+91 8888711188</h2>
          <span>[ Mon To Sun : 10:00 AM To 6:00 PM ]</span>
        </div>
        ;
      </div>

      <div>
        {cities.map((item, index) => (
          <span key={index}>
            {item}
            {index !== cities.length - 1 && " | "}
          </span>
        ))}
      </div>
    </div>
  );
};
