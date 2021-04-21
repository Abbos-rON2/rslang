import { listOfGames } from "../../constants/constants";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import {Row, Col} from 'antd';
import Savanna from "./games/Savanna/Savanna";
import AudioCall from "./games/AudioCall";
import Sprint from "./games/Sprint";
import OurGame from "./games/OurGame";

export default function GamesPage() {
  const { path, url } = useRouteMatch();
  const games = listOfGames.map(({name, icon}) => {
    const location = {
      pathname: `${url}/${name}`,
      state: { from: "GamesPage" },
    };

    return (
      <Col sm={12} xs={24} lg={6} key={name}>
      <div
        className="games_div animate__animated animate__backInLeft"
        id={name}
      >
        <Link to={location} >
          {name}
          {icon}
        </Link>
      </div>
      </Col>
      
    );
  });

  return (
    <Switch>
      <Route path={path} exact>
      <Row gutter={[40, 40]} className="games_wrapper" align='middle'>
      {games}
      </Row>
      </Route>
      <Route path={`${path}/Саванна`} component={Savanna} />
      <Route path={`${path}/Аудиовызов`} component={AudioCall} />
      <Route path={`${path}/Спринт`} component={Sprint} />
      <Route path={`${path}/Своя игра`} component={OurGame} />
    </Switch>
  );
}
