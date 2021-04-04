import "../../../styles/sprint_styles.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Fragment, useState } from "react";
import clickSound from '../../../assets/sprint_sound.wav'

export default function SprintGame(props) {
  console.log(props)
  const [currentWord, setCurrentWord] = useState(props.words[0].word);
  const [currentTranslation, setCurrentTranslation] = useState(
    props.words[0].wordTranslate
  );
  const [expected, setExpected] = useState(true);
  const [points, setPoints] = useState(0);
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
    console.log(randomNum, randomIndex, currentWord, currentTranslation);
  }

  function isCorrect(answer) {
    audioClick.play();
     if (answer === expected) {
      console.log("you are right!");
      setPoints(points + 10);
    } else {
      console.log("you are wrong");

    }
 
    getRandomWordAndTranslation();
  }
  return (
    <Fragment>
      <div>Спринт</div>
      <div>Timer</div>
      <div className="game_container">
        <section className="points_section">
          <div>{points}</div>
        </section>
        <section className="learn_section">
          <section className="check_marks_section">
            <div className="check_marks">
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </div>
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
