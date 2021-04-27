import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

export default function GameOver({ points, gameOver, restartGame, returnToGame }) {
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
        title="Game Over"
        visible={isModalVisible}
        onOk={handleOk}
        footer={[
          <Button
          key="submit"
          type="primary"
          onClick={restartGame}
        >
          Restart
        </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={returnToGame}
          >
            Ok
          </Button>,
        ]}
      >
        <p className="modal-text">Total points:</p>
        <div className="modal-points"> {points}</div>
      </Modal>
    </>
  );
}
