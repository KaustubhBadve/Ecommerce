import ProductSellNavbar from "../Components/Navbar/ProductSellNavbar";
import ProductForm from "../Components/AddProductForm";
import { FooterFrontPage } from "../Components/Footer/FooterFrontPage";

export const SellersDashboard = () => {
  return (
    <div>
      <ProductSellNavbar />
      <div style={{ margin: "5px 5px" }}>
        <ProductForm />
      </div>
    </div>
  );
};
