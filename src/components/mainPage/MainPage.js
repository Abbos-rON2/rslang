import Video from "./Video";
import "animate.css/animate.css";
import { teamInfo } from "../../constants/constants";
import {Row, Col} from 'antd'
import { GithubOutlined } from "@ant-design/icons";

export default function MainPage() {
  const membersOfTeam = teamInfo.map(({ name, photo, text, link }) => {
    return (
      <Col xs={24} md={11} xxl={6} className='members-wrapper ' key={name}>
      <div className="member_div" id={name}>
        <img src={photo} alt={name} className='member_img'></img>
        <div className="member_info">
          <h3 className="member_name">
            {name}{" "}
            <a href={link}>
              <GithubOutlined />
            </a>
          </h3>
          <div>{text}</div>
        </div>
      </div>
      </Col>
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
        <Row justify="center">{membersOfTeam}</Row>
      </section>
    </div>
  );
}
