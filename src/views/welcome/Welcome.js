import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Welcome extends Component {
  componentWillMount() {
    const {history} = this.props;
    history.push('/app');
  }
  
  render() {
    return (
      <>
        <h1>Welcome</h1>
        <h3>
          <NavLink to={`/login`} >
              Connectez Vous !
          </NavLink>
        </h3>
        <h3>
          <NavLink to={`/register`} >
              Inscrivez Vous !
          </NavLink>
        </h3>
      </>
    )
  }
}
