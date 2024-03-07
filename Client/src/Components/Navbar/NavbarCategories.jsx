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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {isMobile ? (
        <div ref={sidebarRef} className={`navabr-categories-menu-${showMenu}`}>
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
            <div>
              <img
                style={{ borderRadius: "10px" }}
                src={images.categoryNavbar}
                alt=""
              />
            </div>
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
