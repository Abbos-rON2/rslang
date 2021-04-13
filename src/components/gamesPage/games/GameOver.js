import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

export default function GameOver({ points, gameOver }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    gameOver ? setIsModalVisible(true) : setIsModalVisible(false);
  }, [gameOver]);

  function handleOk () {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Ok
          </Button>,
        ]}
      >
        <p>Game Over</p>
        <div>Total points: {points}</div>
      </Modal>
    </>
  );
}
