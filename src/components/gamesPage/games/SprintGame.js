import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState, useEffect } from "react";
import clickSound from "../../../assets/sprint_sound.wav";
import GameOver from "./GameOver";

export default function SprintGame({words}) {
  const [timer, setTimer] = useState(60);
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

  const audioClick = new Audio(clickSound);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setGameOver(true);
    }
  }, [timer]);

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
    audioClick.play();

    answer === expected ? addPoints() : clearCurrentStatus();

    getRandomWordAndTranslation();
  }
  return (
    <Fragment>
      {gameOver ? (
        <GameOver points={points} />
      ) : (
        <Fragment>
          <div>Спринт</div>
          <div>{timer}</div>
          <div className="game_container">
            <section className={pointsClassName}>
              <div>{points}</div>
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
                  onClick={() => isCorrect(true)}
                >
                  Верно
                </Button>
                <Button
                  type="primary"
                  danger
                  id="button_wrong"
                  onClick={() => isCorrect(false)}
                >
                  Неверно
                </Button>
              </section>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
