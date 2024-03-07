import { Slider } from "../Components/Slider";
import { images } from "../Components/imports";
import { FrontPageOffers } from "../Components/OfferSection/FrontPageOffers";
import { FrontPageOffersGrid } from "../Components/OfferSection/FrontPageOffersGrid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataGroupWise } from "../Redux/action";
import { FrontPageProductList } from "../Components/Products/FrontPageProductList";

export const WebsiteFront = () => {
  const dispatch = useDispatch();
  const { organisedProducts } = useSelector((state) => state?.mainReducer);
  useEffect(() => {
    dispatch(getDataGroupWise());
  }, []);
  return (
    <div>
      <Slider
        images={[images.slider1, images.slider2, images.slider3]}
        clasName="frontPage"
      />
       <FrontPageOffersGrid
        images={[images.OfferGrid1, images.OfferGrid2, images.OfferGrid3, images.OfferGrid4, images.OfferGrid5]}
      />
      <FrontPageOffers
        images={[
          images.frontpageoffer1,
          images.frontpageoffer2,
          images.frontpageoffer3,
          images.frontpageoffer4,
          images.frontpageoffer5,
          images.frontpageoffer6,
        ]}
      />
     
      <FrontPageProductList data={organisedProducts} />
    </div>
  );
};
