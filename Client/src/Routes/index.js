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
    </Routes>
  );
}
