import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AuthActions';


class Login extends Component {
  constructor()
  {
    super();
    this.state={
      username:null,
      password:null,
    }
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
    let {dispatch, login, history} = this.props;
    const params = this.state;

    login(params).then(res => {
      dispatch({type:actions.LOGIN, payload:res.data});
      history.push('/app');
    }).catch(err => {

    });
  }

  render() {
    return (
      <>
      <div>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" onChange={this.handleChande} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={this.handleChande} />
        <button type="button" onClick={this.login}>Connecter</button>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch:dispatch,
    login: params => actionsCreator.login(params)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);