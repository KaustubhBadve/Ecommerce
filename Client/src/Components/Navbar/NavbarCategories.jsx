import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategoris, getProductList } from "../../Redux/action";

export const NavbarCategories = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { categories } = useSelector((state) => state?.mainReducer);
  useEffect(() => {
    dispatch(getCategoris());
  }, []);


  const navigateToProducts = (val)=>{
    console.log("PPP",val);
    dispatch(getProductList(val))
    navigate(`/productlist?category=${val}`)
  }
    

  return (
    <div className="navabr-categories">
      {categories?.map((item) => {
        return <div onClick={()=>navigateToProducts(item?.categoryName.toLowerCase())}>{item?.categoryName}</div>;
      })}
    </div>
  );
};
