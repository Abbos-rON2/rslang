import {DingtalkOutlined, CustomerServiceOutlined, DashboardOutlined } from "@ant-design/icons";
import team1 from "./../assets/team1.jpg";
import team2 from "./../assets/team2.JPG";
import team3 from "./../assets/team3.jpg";

export const numberOfUnits = [1, 2, 3, 4, 5, 6];
export const listOfGames = [
  {
    name: "Саванна",
    icon: <DingtalkOutlined/>,
  },
  {
    name: "Аудиовызов",
    icon: <CustomerServiceOutlined/>,
  },
  {
    name: "Спринт",
    icon: <DashboardOutlined/>,
  },
  {
    name: "Своя игра",
    icon: "",
  },
];
export const teamInfo = [
  {
    name: "Abbos",
    photo: "",
    text: "Реализовал подключение бекенда, форму регистрации, игру 'Спринт', подключение статистики",
    link: "https://github.com/Abbos-rON2",
  },
  {
    name: "Mariya",
    photo: team3,
    text: "Реализовала учебник и его страницы, словарь учебника",
    link: "https://github.com/MariyaSin",
  },
  {
    name: "Sergey",
    photo: team1,
    text: "Реализовал игру 'Аудио-колл'",
    link: "https://github.com/Likvidas",
  },
  {
    name: "Yuliya",
    photo: team2,
    text: "Реализовала стартовую страницу и общий макет приложения, игру 'Спринт'",
    link: "https://github.com/YuPodd",
  },
];
