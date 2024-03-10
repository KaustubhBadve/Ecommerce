import React, { useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import login_img from "../../images/login_img.png";
import { useDispatch } from "react-redux";
import "./Login.css";
import { userSignup } from "../../Redux/action";
import axios from 'axios';
import Cookies from "js-cookie";


const SignInModal = ({ visible, onnCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const Signup = async (values) => {
    try {
      let resp = await axios.post("http://localhost:3033/api/auth/register", values);
      message.success("Registration Successful");
      Cookies.set("currentUser", JSON.stringify(resp?.data?.data));
      dispatch(userSignup(resp?.data?.data))
      onnCancel()
      return
    } catch (error) {
      if (error.response && error.response.data && Array.isArray(error.response.data.error)) {
        error.response.data.error.forEach((errorMessage) => {
          message.error(errorMessage);
        });
      } else {
        message.error("An error occurred during registration. Please try again later.");
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Modal
        title=""
        centered
        visible={visible}
        onCancel={onnCancel}
        footer={null}
        closable={false}
      >
        <div className="modal_for_Login">
          <div className="modal_for_Login_div1">
            <h1>Looks like you're new here!</h1>
            <h4>Sign up with your mobile number to get started</h4>
            <img src={login_img} />
          </div>
          <Form
            form={form}
            onFinish={Signup}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="userName"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email/Mobile No"
              rules={[
                {
                  required: true,
                  message: "Please enter your email or mobile no",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                  validator: (_, value) =>
                    validateEmail(value) ? Promise.resolve() : Promise.reject(),
                },
              ]}
            >
              <Input placeholder="Enter Email/Mobile No" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="mobileNo"
              label="Mobile No"
              rules={[
                { required: true, message: "Please enter your mobile no" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid mobile no",
                },
              ]}
            >
              <Input placeholder="Enter Mobile No" />
            </Form.Item>

            <Form.Item>
              <p>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </p>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "90%", marginTop: "30px" }}
                size="large"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* <LoginModal
     visible={modalLoginVisible}
     onCancell={() => setModalLoginVisible(false)}
    /> */}
    </>
  );
};

export default SignInModal;
