// import { Routes, Route } from "react-router-dom";
// import { Product } from "../view/Product";
// import { ProductListing } from "../view/ProductListing";
// import { SellersDashboard } from "../view/SellersDashboard";
// import { WebsiteFront } from "../view/WebsiteFront";

// export default function AllRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<WebsiteFront />}/>
//         <Route path="/sellerdashboard" element={<SellersDashboard />} />
//         <Route path="/productlist" element={<ProductListing />} />
//         <Route path="/product/:id" element={<Product />} />
//     </Routes>
//   );
// }


import { Routes, Route } from "react-router-dom";
import { Address } from "../Components/Cart/Address";
import { Cart } from "../Components/Cart/Cart";
import { OrderConfirmation } from "../Components/OrderConfirmation/OrderConfirmation";
import { WishList } from "../Components/WishList/WishList";
import AllRoutesLayout from "../view/Layout";
import { Product } from "../view/Product";
import { ProductListing } from "../view/ProductListing";
import { SellersDashboard } from "../view/SellersDashboard";
import { WebsiteFront } from "../view/WebsiteFront";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AllRoutesLayout>
            <WebsiteFront />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/sellerdashboard"
        element={
          <AllRoutesLayout>
            <SellersDashboard />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/productlist"
        element={
          <AllRoutesLayout>
            <ProductListing />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AllRoutesLayout>
            <Product />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/wishlist"
        element={
          <AllRoutesLayout>
            <WishList />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/cartItem"
        element={
          <AllRoutesLayout>
            <Cart />
          </AllRoutesLayout>
        }
      />
       <Route
        path="/address"
        element={
          <AllRoutesLayout>
            <Address />
          </AllRoutesLayout>
        }
      />
      <Route
        path="/orderconfirm"
        element={
          <AllRoutesLayout>
            <OrderConfirmation />
          </AllRoutesLayout>
        }
      />
    </Routes>
  );
}
