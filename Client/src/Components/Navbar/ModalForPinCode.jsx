import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

const ModalPinCode = ({ visible, onCancel, pincode, updatePincode }) => {
  const [pinCodeVal, setPincodeVal] = useState(pincode);
  const handleOk = () => {
    if(isNaN(pinCodeVal) || pinCodeVal[0]=="0" || pinCodeVal.length<6){
        message.error("Enter valid pincode")
    }
    else if (pinCodeVal.trim() != "") {
      updatePincode(pinCodeVal);
      onCancel();
    }
  };

  return (
    <Modal
      title="Enter your pincode to see product availability and delivery options"
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      className="modal_for_upateLocation"
      footer={null}
      closable={false}
    >
      <Input
        placeholder="Enter pincode"
        defaultValue={pinCodeVal}
        onChange={(e) => setPincodeVal(e.target.value)}
        maxLength={6}
        minLength={6}
        style={{
          width: "40%",
          marginBottom:"10px"
        }}
      />
      <br />
      <Button onClick={handleOk}>Submit</Button>
      <hr />
      <h3>OR</h3>
      <p onClick={()=>onCancel()} style={{ fontSize: "18px", color: "#1e4751", cursor: "pointer" }}>
        {" "}
        <GlobalOutlined /> Use Current Location
      </p>
    </Modal>
  );
};

export default ModalPinCode;
