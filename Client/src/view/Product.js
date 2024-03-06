import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductDetails } from "../Components/Products/ProductDetails";
import { ProductImages } from "../Components/Products/ProductImages";
import { getProduct } from "../Redux/action";

export const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state?.mainReducer);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
      <div className="productPage">
        <ProductImages images={product?.productImages} category={product?.category} />
        <ProductDetails product={product} />
      </div>
  );
};
