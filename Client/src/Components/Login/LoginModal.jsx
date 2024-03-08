import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import login_img from "../../images/login_img.png";
import "./Login.css";

const LoginModal = ({ visible, onCancel }) => {
  const handleOk = () => {
    onCancel();
  };

  return (
    <Modal
      title=""
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
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
              placeholder="Enter Email/Mobile No"
              // onChange={(e) => setPincodeVal(e.target.value)}
              style={{
                height: "20%",
                marginBottom: "10px",
                borderTop: "none",
              }}
            />
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
              Request OTP
            </Button>
          </div>

          <p>New to FlipKart? create an account</p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
