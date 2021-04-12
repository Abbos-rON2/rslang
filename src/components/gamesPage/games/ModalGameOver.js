import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";

export default function ModalGameOver(props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Game Over</p>
        <div>Total points: {props.points}</div>
      </Modal>
    </>
  );
}
