import Video from "./Video";
import "animate.css/animate.css";
import { teamInfo } from "../../constants/constants";
import { GithubOutlined } from "@ant-design/icons";

export default function MainPage() {
  const memberOfTeam = teamInfo.map(({ name, photo, text, link }) => {
    return (
      <div className="member_div" id={name} key={name}>
        <img src={photo} alt={name}></img>
        <div className="member_info">
          <h3 className="main_h1">
            {name}{" "}
            <a href={link}>
              <GithubOutlined />
            </a>
          </h3>
          <div>{text}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="main_page_wrapper">
      <section className="main_page_about">
        <div className="about_text animate__animated animate__backInDown">
          <h1 className="main_h1">Welcome to RS Lang!</h1>
          <p>
            RS Lang - это уникальное приложение для изучения английского.
            Увлекательные игры для тренировки слов и метод интервального
            повторения для запоминания слов навсегда.
          </p>
        </div>
        <div className="about_cards"></div>
      </section>
      <section className="main_page_video">
        <Video></Video>
      </section>
      <section className="main_page_team">
        <h1 className="main_h1">Наша команда</h1>
        <div className="team_wrapper">{memberOfTeam} </div>
      </section>
    </div>
  );
}
