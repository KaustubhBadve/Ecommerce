import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataGroupWise, getProductList } from "../../Redux/action";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { Menu, Slider, Radio, Space, Tag } from "antd";
import { CloseOutlined, StarFilled } from "@ant-design/icons";
import "./Filter.css";

const { SubMenu } = Menu;

export const FilterSideBar = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const { organisedProducts } = useSelector((state) => state?.mainReducer);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.get("category")
  );
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
    console.log(selectedMinPriceRange, selectedMaxPriceRange);
    dispatch(
      getProductList(
        selectedCategory,
        selectedRatings,
        selectedBrand,
        selectedDiscount,
        selectedMinPriceRange,
        selectedMaxPriceRange
      )
    );
  }, [
    selectedCategory,
    selectedRatings,
    selectedBrand,
    selectedDiscount,
    selectedMinPriceRange,
    selectedMaxPriceRange,
  ]);

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
      setMinPriceRange(val[0]);
      setMaxPriceRange(val[1]);
    }, 1000),
    []
  );

  const handleRemoveFilter = (filterName) => {
    switch (filterName) {
      case "category":
        setSelectedCategory(null);
        break;
      case "brand":
        setSelectedBrand(null);
        break;
      case "ratings":
        setSelectedRatings(null);
        break;
      case "minPriceRange":
        setMinPriceRange(null);
        break;
      case "maxPriceRange":
        setMaxPriceRange(null);
        break;
      case "discount":
        setSelectedDiscount(null);
        break;
      case "offer":
        setSelectedOffer(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="filter-sideBar-products">
      <h3>Filters</h3>
      <hr />
      <h3>Selected Filters</h3>
      <div className="selected-filters">
        {selectedCategory && (
          <Tag
            closable
            onClose={() => handleRemoveFilter("category")}
          >
            {selectedCategory} 
          </Tag>
        )}
        {selectedBrand && (
          <Tag
            closable
            onClose={() => handleRemoveFilter("brand")}
          >
            {selectedBrand}
          </Tag>
        )}
        {selectedRatings && (
          <Tag
            closable
            onClose={() => handleRemoveFilter("ratings")}
          >
            {selectedRatings}+ Stars
          </Tag>
        )}
        {(selectedMinPriceRange || selectedMaxPriceRange) && (
          <Tag
            closable
            onClose={() => {
              handleRemoveFilter("minPriceRange");
              handleRemoveFilter("maxPriceRange");
            }}
          >
            Price: {selectedMinPriceRange} - {selectedMaxPriceRange}{" "}
        
          </Tag>
        )}
        {selectedDiscount && (
          <Tag
            closable
            onClose={() => handleRemoveFilter("discount")}
          >
            {selectedDiscount}% Discount 
          </Tag>
        )}
        {selectedOffer && (
          <Tag
            closable
            onClose={() => handleRemoveFilter("offer")}
          >
            {selectedOffer} 
          </Tag>
        )}
      </div>
      <hr />
      <h4>Categories</h4>

      <Menu mode="inline" className="menu-filter">
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
        <Slider
          onChange={handlePricing}
          min={999}
          max={199999}
          range
          defaultValue={[999, 199998]}
        />
      </div>
      <hr />
      <Menu mode="inline" className="menu-filter">
        <SubMenu title="CUSTOMER RATINGS">
          <Radio.Group onChange={handleRatings} value={selectedRatings}>
            <Space direction="vertical">
              <Radio value={4}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <span style={{ marginLeft: "10px" }}>4 and above</span>
              </Radio>
              <Radio value={3}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <span style={{ marginLeft: "10px" }}>3 and above</span>
              </Radio>
              <Radio value={2}>
                <StarFilled style={{ color: "#ffcc00" }} />
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <span style={{ marginLeft: "10px" }}>2 and above</span>
              </Radio>
            </Space>
          </Radio.Group>
        </SubMenu>
      </Menu>
      <hr />
      <Menu mode="inline" className="menu-filter">
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
      <Menu mode="inline" className="menu-filter">
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
