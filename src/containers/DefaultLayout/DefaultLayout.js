import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';

import DefaultAsside from './DefaultAssiade';
// routes config
import routes from '../../routes';

class DefaultLayout extends Component {
  render() {
    return (
      <>
        <DefaultAsside />
        <br/><hr/><br/>
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                  <route.component {...props} />
                )} />
            ) : (null);
          })}
          <Redirect from="/" to="/app/dashboard" />
        </Switch>
      </>
    )
  }
}

export default DefaultLayout;
