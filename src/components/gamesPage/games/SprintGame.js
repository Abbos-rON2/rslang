import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState } from "react";
import clickSound from "../../../assets/sprint_sound.wav";

export default function SprintGame(props) {
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
  const [checkMarks, setCheckMarks] = useState([]);
  const [checkMarkDisplay, setCheckMarkDisplay] = useState(false);
  const audioClick = new Audio(clickSound);

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
    let currentPoints, pointsForNextLevel, currentPointsClassName, newAnswersArray;
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
    console.log(currentPoints);
    setPoints(currentPoints ? currentPoints : points);
    setNextLevelPoints(pointsForNextLevel ? pointsForNextLevel : nextLevelPoints);
    setPointsClassName(currentPointsClassName ? currentPointsClassName : "points_section");
    setAnswersArray(newAnswersArray ? newAnswersArray : answersArray);
  }

  function clearCurrentStatus(){
    setNextLevelPoints(0);
    setPointsClassName("points_section");
    setAnswersArray([]);
  }

  function isCorrect(answer) {
    let receivedAnswer;
    audioClick.play();
    if (answer === expected) {
      console.log("you are right!");
      receivedAnswer = "correct";
      checkRightAnswers();
    } else {
      console.log("you are wrong");
      receivedAnswer = "incorrect";
      clearCurrentStatus();

    }
    setCurrentAnswer(receivedAnswer);
    setAnswersArray((answersArray) => answersArray.concat(receivedAnswer));
    getRandomWordAndTranslation();
  }
  return (
    <Fragment>
      <div>Спринт</div>
      <div>Timer</div>
      <div className="game_container">
        <section className={pointsClassName}>
          <div>{points}</div>
        </section>
        <section className="learn_section">
          <section className="check_marks_section">
            {checkMarkDisplay ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <div className="check_mark_inactive"></div>
            )}
          </section>
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
  );
}
