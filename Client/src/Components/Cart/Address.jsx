import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import "./Cart.css";
import { PricingDetails } from "./PricingDetails";
import { AddressBox } from "./AddressBox";
import { PaymentOptions } from "./PaymentOptions";
import Cookies from "js-cookie";

const { Option } = Select;
const { TextArea } = Input;

const statesInIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];
const citiesInIndia = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
];

export const Address = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAddress, setIsAddress] = useState(true);
  const [isAddressBox, setIsAddressBox] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [spinning, setSpinning] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (values) => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setIsAddress(false);
      setIsAddressBox(true);
    }, 3000);
    setFormData(values);
  };
  
  useEffect(() => {
    const userDetailsCookie = Cookies.get("currentUser");
    if (userDetailsCookie) {
      const userDetails = JSON.parse(userDetailsCookie);
      const { name, mobileNo, email } = userDetails;
      form.setFieldsValue({
        firstname: name,
        mobile: mobileNo,
        email: email,
      });
    }
  }, [form]);

  return (
    <div className="address-cart">
      {isAddress && (
        <div>
          <h2>ADDRESS</h2>
          <hr />
          <Form
            className="address-form"
            form={form}
            onFinish={handleSubmit}
            initialValues={formData}
          >
            <div>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="mobile"
                label="Mobile No"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="address1"
              label="Address 1"
              rules={[
                { required: true, message: "Please enter address line 1" },
              ]}
            >
              <TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>
            <Form.Item name="address2" label="Address 2">
              <TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>

            <div style={{ display: "flex" }}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                  { required: true, message: "Please enter your pincode" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please select your city" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a city"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {citiesInIndia.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  { required: true, message: "Please select your state" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a state"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {statesInIndia.map((state) => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">
                Save Address
              </Button>
            </Form.Item>
          </Form>
          <Spin spinning={spinning} fullscreen />
        </div>
      )}

      {isAddressBox && formData && (
        <div>
          <AddressBox
            name={`${formData.firstname} ${formData.lastname}`}
            mobileNo={formData.mobile}
            email={formData.email}
            address1={formData.address1}
            address2={formData.address2}
            city={formData.city}
            pincode={formData.pincode}
            state={formData.state}
            setIsAddressBox={setIsAddressBox}
            setIsAddress={setIsAddress}
          />
          <PaymentOptions />
        </div>
      )}

      <PricingDetails />
    </div>
  );
};
