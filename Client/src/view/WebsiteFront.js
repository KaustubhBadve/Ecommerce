import { FrontPageNavbar } from "../Components/Navbar/FrontPageNavbar";
import { NavbarCategories } from "../Components/Navbar/NavbarCategories";
import { Slider } from "../Components/Slider";
import {
  slider1,
  slider2,
  slider3,
  frontpageoffer1,
  frontpageoffer2,
  frontpageoffer3,
  frontpageoffer4,
  frontpageoffer5,
  frontpageoffer6,
  OfferGrid1,
  OfferGrid2,
  OfferGrid3,
  OfferGrid4,
  OfferGrid5,
} from "../Components/imports";
import { FrontPageOffers } from "../Components/OfferSection/FrontPageOffers";
import { FooterFrontPage } from "../Components/Footer/FooterFrontPage";
import { FrontPageOffersGrid } from "../Components/OfferSection/FrontPageOffersGrid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataGroupWise } from "../Redux/action";
import { FrontPageProductList } from "../Components/Products/FrontPageProductList";

export const WebsiteFront = () => {
  const dispatch=useDispatch()
  const {organisedProducts}=useSelector((state)=>state?.mainReducer)
  useEffect(()=>{
     dispatch(getDataGroupWise())
  },[])
  return (
    <div className="view-main">
      <FrontPageNavbar />
      <div style={{ padding: "10px 0px" }}>
        <NavbarCategories />
        <Slider images={[slider1, slider2, slider3]} clasName={"frontPage"} />
        <FrontPageOffers
          images={[
            frontpageoffer1,
            frontpageoffer2,
            frontpageoffer3,
            frontpageoffer4,
            frontpageoffer5,
            frontpageoffer6,
          ]}
        />
        <FrontPageOffersGrid
          images={[OfferGrid1, OfferGrid2, OfferGrid3, OfferGrid4, OfferGrid5]}
        />
        <FrontPageProductList data={organisedProducts}/>
      </div>
      <FooterFrontPage />
    </div>
  );
};
