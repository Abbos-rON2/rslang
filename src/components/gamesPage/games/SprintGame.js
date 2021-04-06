import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState, useEffect } from "react";
import clickSound from "../../../assets/sprint_sound.wav";

export default function SprintGame(props) {
  const [pointsClassName, setPointsClassName] = useState('points_section');
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

  const addCheckMark = () => {
    setCheckMarks(
      checkMarks.concat(<CheckCircleTwoTone twoToneColor="#52c41a" />)
    );
  };
  const audioClick = new Audio(clickSound);

  function getRandomWordAndTranslation() {
    const randomNum = Math.round(Math.random());
    const randomIndex = Math.floor(Math.random() * 19);

    setCurrentWord(props.words[randomIndex].word);

    if (randomNum === 0) {
      setCurrentTranslation(props.words[randomIndex + 1].wordTranslate);
      setExpected(false);
    } else {
      setCurrentTranslation(props.words[randomIndex].wordTranslate);
      setExpected(true);
    }
  }
  function checkRightAnswers() {
    if (answersArray.length >= 3 && currentAnswer === "correct") {
      if (
        (answersArray[answersArray.length - 2] &&
          answersArray[answersArray.length - 3]) === "correct"
      ) {
        switch (nextLevelPoints) {
          case 0:
            setPoints(points + 20);
            setNextLevelPoints(nextLevelPoints + 1);
            setPointsClassName('points_section points_0');
            break;
          case 1:
            setPoints(points + 40);
            setNextLevelPoints(nextLevelPoints + 1);
            setPointsClassName('points_section points_1');
            break;
          case 2:
            setPoints(points + 80);
            setPointsClassName('points_section points_2');
            break;
        }
      }
    } else {
      setPoints(points + 10);
      setCheckMarks([]);
    }
  }

  function isCorrect(answer) {
    audioClick.play();

    if (answer === expected) {
      console.log("you are right!");
      setCurrentAnswer("correct");
      setAnswersArray(answersArray.concat(currentAnswer));
      console.log(answersArray, answersArray.length, currentAnswer);
      checkRightAnswers();
      setRightAnswersCounter(rightAnswersCounter + 1);
      addCheckMark();
    } else {
      console.log("you are wrong");
      setCurrentAnswer("incorrect");
      setAnswersArray(answersArray.concat(currentAnswer));
    }

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
            <div className="check_marks">{checkMarks}</div>
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
