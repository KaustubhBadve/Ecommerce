import React from "react";
import FrontPageNavbar from "../Components/Navbar/FrontPageNavbar";
import { NavbarCategories } from "../Components/Navbar/NavbarCategories";
import { FooterFrontPage } from "../Components/Footer/FooterFrontPage";

const Layout = ({ children }) => {
  return (
    <div>
      <FrontPageNavbar />
      <NavbarCategories />
      {children}
      <FooterFrontPage />
    </div>
  );
};

export default Layout;
