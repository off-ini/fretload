import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button, Input } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Formik, Form } from "formik";
import { NotificationManager } from "../../components/common/react-notifications";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../utils/IntlMessages";

import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AuthActions';
import * as msg from '../../utils/messages';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading:false,
    };
    //msg.appTitle('Connexion');
  }

  componentDidMount()
  {
    if(this.props.user)
    {
      this.props.history.push('/app');
    }
  }

  handleChande = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  login = e => {
    this.setState({loading:true});
    let {dispatch, login, history} = this.props;
    const params = this.state;

    login(params).then(res => {
      dispatch({type:actions.LOGIN, payload:res.data});
      this.setState({loading:false});
      history.push('/app');
    }).catch(err => {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ''
      );
      this.setState({loading:false});
    });
  }

  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.props.loginUser(values, this.props.history);
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              {/*<p className="text-white h2">LA MAGIE EST DANS LES DÉTAILS</p>
              <p className="white mb-0">      
                Veuillez utiliser vos identifiants pour vous connecter.
                <br />
                Si vous n'êtes pas membre, veuillez vous{" "}
                <NavLink to={`/register`} className="white">           
                  Inscrire
                </NavLink>
                .
              </p>
              */}
              </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                {/*<span className="logo-single" />*/}
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Nom d'utilisateur
                      </Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="username"
                        onChange={this.handleChande}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        Mot de passe
                      </Label>
                      <Input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={this.handleChande}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`}
                        size="lg"
                        onClick={this.login}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">Connexion</span>
                      </Button>
                    </div>


                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = state => {
return {
    user: state.AuthReducer.user
}
};

const mapDispatchToProps = dispatch => {
return {
    dispatch:dispatch,
    login: params => actionsCreator.login(params)
}
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
