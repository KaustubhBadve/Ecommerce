import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataGroupWise, getProductList } from "../../Redux/action";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { Menu, Slider, Radio, Space } from "antd";
import { StarFilled } from "@ant-design/icons";
import "./Filter.css";

const { SubMenu } = Menu;

export const FilterSideBar = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const { organisedProducts } = useSelector((state) => state?.mainReducer);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get("category"));
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedMinPriceRange, setMinPriceRange] = useState(null);
  const [selectedMaxPriceRange, setMaxPriceRange] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    dispatch(getDataGroupWise());
  }, []);

  useEffect(() => {
    console.log();
    dispatch(
      getProductList(
        selectedCategory,
        selectedRatings,
        selectedBrand,
        selectedDiscount
      )
    );
  }, [selectedCategory, selectedRatings, selectedBrand, selectedDiscount]);

  const handleRatings = (e) => {
    setSelectedRatings(e.target.value);
  };

  const handleOffers = ({ key }) => {
    setSelectedOffer(key);
  };

  const handleDiscount = (e) => {
    setSelectedDiscount(e.target.value);
  };

  const handleBrandSelect = (brand, category) => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
  };

  const handlePricing = useCallback(
    debounce((val) => {
     
     
    }, 1000),
    []
  );

  return (
    <div className="filter-sideBar-products">
      <h3>Filters</h3>
      <hr />
      <h3>Categories</h3>

      <Menu mode="inline" style={{ width: "100%" }}>
        {Object.entries(organisedProducts)?.map(([category, brands]) => (
          <SubMenu key={category} title={category.toUpperCase()}>
            {Object.keys(brands)?.map((brand) => (
              <Menu.Item
                key={brand}
                onClick={() => handleBrandSelect(brand, category)}
              >
                {brand}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
      <hr />
      <div className="pricing-range">
        <h4>Pricing Range</h4>
        <Slider onChange={handlePricing} min={999} max={199999} range defaultValue={[0, 1000]} />
      </div>
      <hr />
      <Menu mode="inline" style={{ width: "100%" }}>
        <SubMenu title="CUSTOMER RATINGS">
          <Radio.Group onChange={handleRatings} value={selectedRatings}>
            <Space direction="vertical">
              <Radio value={4}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} /> 4 and above
              </Radio>
              <Radio value={3}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} /> 3 and above
              </Radio>
              <Radio value={2}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} /> 2 and above
              </Radio>
            </Space>
          </Radio.Group>
        </SubMenu>
      </Menu>
      <hr />
      <Menu mode="inline" style={{ width: "100%" }}>
        <SubMenu title="DISCOUNT">
          <Radio.Group onChange={handleDiscount} value={selectedDiscount}>
            <Space direction="vertical">
              <Radio value={20}>20% or more</Radio>
              <Radio value={15}>15% or more</Radio>
              <Radio value={10}>10% or more</Radio>
              <Radio value={5}>5% or more</Radio>
            </Space>
          </Radio.Group>
        </SubMenu>
      </Menu>
      <hr />
      <Menu mode="inline" style={{ width: "100%" }}>
        <SubMenu title="OFFERS">
          <Radio.Group onChange={handleOffers} value={selectedOffer}>
            <Space direction="vertical">
              <Radio value={4}>Buy More, Save More</Radio>
              <Radio value={3}>No cost EMI</Radio>
              <Radio value={2}>Special price</Radio>
            </Space>
          </Radio.Group>
        </SubMenu>
      </Menu>
    </div>
  );
};
