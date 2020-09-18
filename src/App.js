import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { getDirection } from './utils/Utils';

import PrivateRouter from './components/router/PrivateRoute';

const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/auth/Login'));
const Register = React.lazy(() => import('./views/auth/Register'));
const Active = React.lazy(() => import('./views/auth/Active'));
const Error = React.lazy(() => import('./views/error/Error'));
const Welcome = React.lazy(() => import('./views/welcome/Welcome'));
const UserLayout = React.lazy(() => import('./containers/DefaultLayout/UserLayout'));


//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <HashRouter>
            <React.Fragment>
              {/*isMultiColorActive && <ColorSwitcher />*/}
              <React.Suspense fallback={<div className="loading" />}>
                <Switch>
                  <Route exact path="/" name="Home" component={Welcome} />
                  <Route exact path="/login" render={props => <UserLayout {...props}><Login {...props} /></UserLayout>} />
                  <Route exact path="/register" render={props => <UserLayout {...props}><Register {...props} /></UserLayout>} />
                  <Route exact path="/active/:code/users" render={props => <UserLayout {...props}><Active {...props} /></UserLayout>} />
                  {/*<Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                    <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                    <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                    <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />*/}
                  <PrivateRouter path="/app" name="Home" component={DefaultLayout} />
                  <Route
                    path="/error"
                    exact
                    render={props => <Error {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </React.Suspense>
              <NotificationContainer />
            </React.Fragment>
          </HashRouter>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
