import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState, useEffect } from "react";
import GameOver from "./GameOver";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSound from 'use-sound'
import correct from '../../../assets/sound_correct.mp3'
import incorrect from '../../../assets/sound_incorrect.mp3'

export default function SprintGame({ words }) {
  const [gameOver, setGameOver] = useState(false);

  const defaultMarksValue = [false, false, false];
  const [checkMarks, setCheckMarks] = useState(defaultMarksValue);

  const [points, setPoints] = useState(0);
  const [levelPoints, setLevelPoints] = useState(10);
  const [pointsClassName, setPointsClassName] = useState("points_section");

  const [currentWord, setCurrentWord] = useState(words[0].word);
  const [currentTranslation, setCurrentTranslation] = useState(
    words[0].wordTranslate
  );
  const [expected, setExpected] = useState(true);

  const [sound_true] = useSound(correct);
  const [sound_false] = useSound(incorrect);

  useEffect(() => {
      if (gameOver) {
        setGameOver(true);
      } 
  }, [gameOver]);

  useEffect(() => {
    switch (levelPoints) {
      case 20:
        setPointsClassName("points_section points_1");
        break;
      case 40:
        setPointsClassName("points_section points_2");
        break;
      case 80:
        setPointsClassName("points_section points_3");
        break;
    }
  }, [levelPoints]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      clearTimeout(remainingTime);
      setGameOver(true);
    }
    return (
      <div className="timer">
        <div className="time-value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  let checkEl = checkMarks.map((item, i) =>
    !item ? (
      <CheckCircleTwoTone twoToneColor="#DCDCDC" key={i} />
    ) : (
      <CheckCircleTwoTone twoToneColor="#52c41a" key={i} />
    )
  );

  function getRandomWordAndTranslation() {
    let currentTranslation, expected;
    const randomNum = Math.round(Math.random());
    const randomIndex = Math.floor(Math.random() * 19);
    setCurrentWord(words[randomIndex].word);

    if (randomNum === 0) {
      currentTranslation = words[randomIndex + 1].wordTranslate;
      expected = false;
    } else {
      currentTranslation = words[randomIndex].wordTranslate;
      expected = true;
    }
    setCurrentTranslation(currentTranslation);
    setExpected(expected);
  }

  function addPoints() {
    const currentPoints = points + levelPoints;
    setPoints(currentPoints);

    let currentIndex = checkMarks.indexOf(false);
    checkMarks[currentIndex] = true;
    setCheckMarks([...checkMarks]);

    const levelPassed = checkMarks.every(Boolean);
    if (levelPassed) {
      const nextLevelPoints = levelPoints * 2;
      setLevelPoints(nextLevelPoints);
      setCheckMarks(defaultMarksValue);
    }
  }

  function clearCurrentStatus() {
    setLevelPoints(10);
    setPointsClassName("points_section");
    setCheckMarks(defaultMarksValue);
  }

  function isCorrect(answer) {
    if (answer === expected ) {
      sound_true();
      addPoints();
    } else{
      sound_false();
      clearCurrentStatus();
    }
    getRandomWordAndTranslation();
  }
  return (
    <Fragment>
      <GameOver points={points} gameOver={gameOver} />
      <div className="timer-wrapper">
      <CountdownCircleTimer size="100"
          isPlaying
          duration={60}
          colors={[["#34aeeb", 0.45], ["#6589a1", 0.45], ["#f03d11"]]}
          strokeWidth={5}
        >
          {renderTime}
        </CountdownCircleTimer>
        </div>
      <div className="game_container">
        <section className={pointsClassName}>
          <div className="points">{points}</div>
          <span className="level-points">+ {levelPoints} очков за слово</span>
        </section>
        <section className="learn_section">
          <section className="check_marks_section">{checkEl}</section>
          <section className="words_section">
            <div className="words_wrapper">
              <div>{currentWord}</div>
              <div>{currentTranslation}</div>
            </div>
          </section>
          <section className="buttons_section">
            <Button
              type="primary"
              id="button_ok" 
              disabled={gameOver ? true: false }
              onClick={() => isCorrect(true)}
            >
              Верно
            </Button>
            <Button
              type="primary"
              danger
              id="button_wrong"
              disabled={gameOver ? true: false }
              onClick={() => isCorrect(false)}
            >
              Неверно
            </Button>
          </section>
        </section>
      </div>
    </Fragment>
  );
}
