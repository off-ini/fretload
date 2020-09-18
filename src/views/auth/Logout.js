import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AuthActions';
import {withRouter} from 'react-router-dom';

import {
    DropdownItem,
  } from "reactstrap";

class Logout extends Component {

    logout = () => {
        let {dispach, logout, history} = this.props
        logout().then(res => {
            dispach({type:actions.LOGOUT});
            history.push('/login');
        }).catch(err => {
            history.push('/login');
        })
    }

  render() {
      //console.log(this.props);
    return (
      <>
        <DropdownItem onClick={this.logout}>
            Déconnecter
        </DropdownItem>
      </>
    )
  }
}
  
const mapDispatchToProps = dispach => {
return {
    dispach:dispach,
    logout: () => actionsCreator.logout(),
}
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
