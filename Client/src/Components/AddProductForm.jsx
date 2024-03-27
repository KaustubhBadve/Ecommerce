import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Select, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { images } from "./imports";
import { Slider } from "./Slider";
import { BASE_URL } from "../Config.js/AppConfig";

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState([""]);

  const handleAddHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = value;
    setHighlights(updatedHighlights);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const filteredHighlights = highlights.filter(
        (highlight) => highlight.trim() !== ""
      );
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("offer", values.offer || 10);
      formData.append("description", values.description);
      formData.append("highlight", filteredHighlights);
      formData.append("brand", values.brand);

      values.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      await axios.post(`${BASE_URL}/api/addProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Product added successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add_product">
      <Form
        form={form}
        name="product_form"
        onFinish={onFinish}
        className="add_product_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the product title" },
          ]}
        >
          <Input placeholder="Enter product title"/>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            { required: true, message: "Please enter the product category" },
          ]}
        >
          <Select placeholder="Select Category">
            <Select.Option value="mobiles">Mobiles</Select.Option>
            <Select.Option value="tvs">TV's</Select.Option>
            <Select.Option value="homeAppliances">
              Home Appliances
            </Select.Option>
            <Select.Option value="smartWatches">Smart Watches</Select.Option>
            <Select.Option value="accessories">Accessories</Select.Option>
            <Select.Option value="laptops">Laptops</Select.Option>
            <Select.Option value="offerZone">Offer Zone</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            { required: true, message: "Please enter the product brand" },
          ]}
        >
          <Input placeholder="Enter product brand"/>
        </Form.Item>

        {highlights.map((highlight, index) => (
          <Form.Item
            key={index}
            label={`Highlight ${index + 1}`}
            name={`highlight${index}`}
            rules={[
              { required: true, message: "Please enter the product highlight" },
            ]}
          >
            <Input
             placeholder="Enter product highlights"
             value={highlight}
              onChange={(e) => handleHighlightChange(index, e.target.value)}
            />
          </Form.Item>
        ))}
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ width: "50%" }}
            type="dashed"
            onClick={handleAddHighlight}
            block
          >
            Add more highlights
          </Button>
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item label="Offer" name="offer">
          <Input defaultValue={"10"} placeholder="Enter product dicount %"/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea style={{height:"20vh"}} placeholder="Enter product description"/>
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(event) => event.fileList}
        >
          <Upload
            maxCount={5}
            listType="picture"
            beforeUpload={() => false}
            name="images"
            multiple={true}
          >
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button style={{width:"100%",height:"50px", cursor:"pointer", backgroundColor:"orange"}} type="primary" htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
      <div className="add_product_Slider">
      <Slider images={[images.productUpload1, images.productUpload2]} clasName={"productUpload"} />
      </div>
    </div>
  );
};

export default ProductForm;
