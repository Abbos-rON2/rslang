import Video from "./Video";
import "animate.css/animate.css";
import {teamInfo} from "../../constants/constants";
import {GithubOutlined } from "@ant-design/icons"

export default function MainPage() {
  const memberOfTeam = teamInfo.map(({name, photo, text, link}) => {
    return (
      <div
        className="member_div"
        id={name}
        key={name}
        >
           <img src={photo}></img>
     <div className="member_info">
      
     <div>{name} <a href={link}><GithubOutlined /></a></div>
        <div>{text}</div>
        
     </div>
       
      </div>
    );
  });
    return (
    <div className="main_page_wrapper">
      <section className="main_page_about">
       
        <div className="about_text animate__animated animate__backInDown">
        <h1 className="h1">Welcome to RS Lang!</h1>
        <p>
          RS Lang - это уникальное приложение для изучения английского.
          Увлекательные игры для тренировки слов и метод интервального
          повторения для запоминания слов навсегда.
        </p>
          </div>
          <div className="about_cards">

          </div>
      </section>
      <section className="main_page_video"><Video></Video></section>
      <section className="main_page_team">
      <h3>Наша команда</h3>
      <div className="team_wrapper">{memberOfTeam} </div>
     
      </section>
    </div>
  );
}
