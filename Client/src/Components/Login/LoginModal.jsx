import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import login_img from "../../images/login_img.png";
import "./Login.css";
import SignInModal from "./Signup";
import { userSignup } from "../../Redux/action";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoginModal = ({ visible, onCancell }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      let values = {
        email: email,
        password: password,
      };
      let resp = await axios.post(
        "http://localhost:3033/api/auth/login",
        values
      );
      message.success("Login Successful");
      message.success(`Hey ${resp?.data?.data?.name}`);
      Cookies.set("currentUser", JSON.stringify(resp?.data?.data));
      dispatch(userSignup(resp?.data?.data));
      onCancell();
      return;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.error)
      ) {
        error.response.data.error.forEach((errorMessage) => {
          message.error(errorMessage);
        });
      } else {
        message.error(
          "An error occurred during registration. Please try again later."
        );
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
        centered
        visible={visible}
        onCancel={onCancell}
        footer={null}
        closable={false}
      >
        <div className="modal_for_Login">
          <div className="modal_for_Login_div1">
            <h1>Login</h1>
            <h4>Get access to your Orders, Wishlist and Recommendations</h4>
            <img src={login_img} />
          </div>
          <div className="modal_for_Login_div2">
            <div style={{ height: "50%" }}>
              <Input
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: "20%",
                  marginBottom: "10px",
                  borderTop: "none",
                }}
              />

              {validateEmail(email) && (
                <Input.Password
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    height: "20%",
                    marginBottom: "10px",
                    borderTop: "none",
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}

              <p>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </p>
              <Button
                style={{ width: "90%", marginTop: "30px" }}
                type="primary"
                size="large"
                onClick={handleOk}
              >
                Login
              </Button>
            </div>

            <p
              onClick={() => {
                setModalSignInVisible(true);
                onCancell();
              }}
            >
              New to FlipKart? create an account
            </p>
          </div>
        </div>
      </Modal>
      <SignInModal
        visible={modalSignInVisible}
        onnCancel={() => setModalSignInVisible(false)}
      />
    </>
  );
};

export default LoginModal;
