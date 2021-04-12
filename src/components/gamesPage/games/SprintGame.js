import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState, useEffect } from "react";
import clickSound from "../../../assets/sprint_sound.wav";
import ModalGameOver from "./ModalGameOver";

export default function SprintGame(props) {
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const checkMarkStartArr = [false, false, false];
  const [pointsClassName, setPointsClassName] = useState("points_section");
  const [currentWord, setCurrentWord] = useState(props.words[0].word);
  const [currentTranslation, setCurrentTranslation] = useState(
    props.words[0].wordTranslate
  );
  const [expected, setExpected] = useState(true);
  const [points, setPoints] = useState(0);
  const [rightAnswersCounter, setRightAnswersCounter] = useState(0);
  const [nextLevelPoints, setNextLevelPoints] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState();
  const [checkMarks, setCheckMarks] = useState(checkMarkStartArr);
  const audioClick = new Audio(clickSound);
  const [counterOfAnswers, setCounterOfAnswers] = useState(0);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  useEffect(() => {
    if(timer === 0){
      setGameOver(true);
    }
  }, [timer]);

  let checkEl = checkMarks.map((item, i) =>
    item === false ? (
      <CheckCircleTwoTone twoToneColor="#DCDCDC" key={i} />
    ) : (
      <CheckCircleTwoTone twoToneColor="#52c41a" key={i} />
    )
  );

  function getRandomWordAndTranslation() {
    let currentTranslation, expected;
    const randomNum = Math.round(Math.random());
    const randomIndex = Math.floor(Math.random() * 19);
    setCurrentWord(props.words[randomIndex].word);
    if (randomNum === 0) {
      currentTranslation = props.words[randomIndex + 1].wordTranslate;
      expected = false;
    } else {
      currentTranslation = props.words[randomIndex].wordTranslate;
      expected = true;
    }
    setCurrentTranslation(currentTranslation);
    setExpected(expected);
  }

  function checkRightAnswers() {
    let currentPoints,
      pointsForNextLevel,
      currentPointsClassName,
      newAnswersArray;
    if (answersArray.length >= 3 && currentAnswer === "correct") {
      if (
        (answersArray[answersArray.length - 2] &&
          answersArray[answersArray.length - 3]) === "correct"
      ) {
        pointsForNextLevel = nextLevelPoints + 1;
        newAnswersArray = [];

        switch (pointsForNextLevel) {
          case 1:
            currentPoints = points + 20;
            currentPointsClassName = "points_section points_1";
            break;
          case 2:
            currentPoints = points + 40;
            currentPointsClassName = "points_section points_2";
            break;
          case 3:
            currentPoints = points + 80;
            currentPointsClassName = "points_section points_3";
            break;
          default:
            currentPoints = points;
            currentPointsClassName = pointsClassName;
            break;
        }
      }
    } else {
      currentPoints = points + 10;
      currentPointsClassName = pointsClassName;
      pointsForNextLevel = nextLevelPoints;
    }
    setPoints(currentPoints ? currentPoints : points);
    setNextLevelPoints(
      pointsForNextLevel ? pointsForNextLevel : nextLevelPoints
    );
    setPointsClassName(
      currentPointsClassName ? currentPointsClassName : "points_section"
    );
    setAnswersArray(newAnswersArray ? newAnswersArray : answersArray);
  }

  function clearCurrentStatus() {
    setNextLevelPoints(0);
    setPointsClassName("points_section");
    setAnswersArray([]);
    setCheckMarks(checkMarkStartArr);
    setCounterOfAnswers(0);
  }

  function isCorrect(answer) {
    audioClick.play();
    let receivedAnswer, typeOfCheckMark, newArrOfCheckMarks;
    setCounterOfAnswers(counterOfAnswers >= 3 ? 0 : counterOfAnswers + 1);
    if (answer === expected) {
      checkRightAnswers();
      receivedAnswer = "correct";
      typeOfCheckMark = true;
    } else {
      receivedAnswer = "incorrect";
      typeOfCheckMark = false;
      clearCurrentStatus();
    }

    setCurrentAnswer(receivedAnswer);
    setAnswersArray((answersArray) => answersArray.concat(receivedAnswer));

    newArrOfCheckMarks = [...checkMarks];
    newArrOfCheckMarks[counterOfAnswers] = typeOfCheckMark;
    setCheckMarks(
      newArrOfCheckMarks.length > 3 || typeOfCheckMark === false
        ? checkMarkStartArr
        : newArrOfCheckMarks
    );

    getRandomWordAndTranslation();
    console.log(checkMarks, counterOfAnswers);
  }
  return (
    <Fragment>
      {gameOver ? (
        <ModalGameOver points={points}/>
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
