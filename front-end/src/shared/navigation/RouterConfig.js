import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getListOfRoutes } from './routes';

export const RouterConfig = (props) => {
  const routes =
    getListOfRoutes() &&
    getListOfRoutes().filter(
      (ele) => ele.auth === props.isLoggedIn || ele.auth === undefined,
    );

  return (
    <>
      {props.isLoggedIn ? (
        <Switch>
          {routes.map((route, index) => (
            <Route {...route} key={index} />
          ))}
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          {routes.map((route, index) => (
            <Route {...route} key={index} />
          ))}
          <Redirect to="/auth" />
        </Switch>
      )}
    </>
  );
};

RouterConfig.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default RouterConfig;
