import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";

export default function GameOver({ points, gameOver }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    gameOver ? setIsModalVisible(true) : setIsModalVisible(false);
  }, [gameOver]);

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
        <div>Total points: {points}</div>
      </Modal>
    </>
  );
}
