import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoris, getProductList } from "../../Redux/action";
import { MenuOutlined } from "@ant-design/icons";
import { images } from "../imports";

export const NavbarCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef(null);
  const { categories } = useSelector((state) => state?.mainReducer);

  useEffect(() => {
    dispatch(getCategoris());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToProducts = (val) => {
    dispatch(getProductList(val));
    setShowMenu(!showMenu);
    navigate(`/productlist?category=${val}`);
  };

  return (
    <>
    <div className="navabr-categories">
      <div
        key="home"
        onClick={() => navigateToProducts("home")}
      >
        Home
      </div>
      {categories?.map((item) => (
        <div
          key={item.categoryName}
          onClick={() => navigateToProducts(item.categoryName.toLowerCase())}
        >
          {item.categoryName}
        </div>
      ))}
    </div>
  </>
  );
};
