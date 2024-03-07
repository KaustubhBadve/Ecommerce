import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategoris, getProductList } from "../../Redux/action";
import { MenuOutlined } from "@ant-design/icons";

export const NavbarCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
  }, [isMobile]);

  const navigateToProducts = (val) => {
    dispatch(getProductList(val));
    navigate(`/productlist?category=${val}`);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {isMobile ? (
        <div className={`navabr-categories-menu-${showMenu}`}>
          <MenuOutlined
            className={`menu-icon-${showMenu}`}
            onClick={toggleMenu}
          />
          <div className={`nav-elements-${showMenu}`}>
            <ul> 
              {categories?.map((item) => (
                <li
                  key={item.categoryName}
                  onClick={() =>
                    navigateToProducts(item.categoryName.toLowerCase())
                  }
                >
                  {item.categoryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="navabr-categories">
          {categories?.map((item) => (
            <div
              key={item.categoryName}
              onClick={() =>
                navigateToProducts(item.categoryName.toLowerCase())
              }
            >
              {item.categoryName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
