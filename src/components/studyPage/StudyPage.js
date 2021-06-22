import "animate.css/animate.css";
import "./studyPage.css";
import {Row, Col} from 'antd';
import { Link, Switch, useRouteMatch, Route} from "react-router-dom";
import { Units } from "../../constants/constants"
import { Fragment } from "react";
import Unit from './Unitbook/Unit'
import Dictionary from "./Dictionary";


export default function StudyPage() {
  const { path, url } = useRouteMatch();

  const unit = Units.map((unit) => {
    return (
      <Col sm={12} xs={24} md={8} key={unit}>
      <div
        className="unit_div animate__animated animate__backInLeft"
        id={unit}
        key={unit}
        >
        <Link to={`${url}/unit-${unit}`}>Unit {unit}</Link>
      </div>
      </Col>
    );
  });

  return (
    <Fragment >
      <div className='study-page_links'>
        <Link to={`${path}/dictionary`}>dictionary</Link>
        <Link to={`${path}`}>Words</Link>
      </div>
      <Switch>
        <Route path={path} exact>
          <Row gutter={[40, 40]} className="units_wrapper" align='middle'>
            {unit}
          </Row>
        </Route>
        <Route path={`${path}/unit-:unit`} component={Unit}/>
        <Route path={`${path}/dictionary`} component={Dictionary}/>
      </Switch>
    </Fragment>
  );
}
