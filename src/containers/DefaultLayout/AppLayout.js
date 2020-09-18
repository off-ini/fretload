import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch} from "react-router-dom";
import Can from '../../config/Can';

import TopNav from "./navs/Topnav";
import Sidebar from "./navs/Sidebar";

import routes from '../../routes';

class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <React.Suspense fallback={<div className="loading" />}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <Can I="view" a={route.tag}>
                            <route.component {...props} />
                          </Can>
                      )} />
                  ) : (null);
                })}
                <Redirect from="/app/" to="/app/dashboard" />
              </Switch>
            </React.Suspense>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps={}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(AppLayout));
