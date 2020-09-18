import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/AuthActions';

// sidebar nav config
import nav from '../../_nav';

class DefaultAsside extends Component {

  logout = () => {
      let {dispach, logout, history} = this.props
      logout().then(res => {
        dispach({type:actions.LOGOUT});
        history.push('/login');
      }).catch(err => {

      })
  }

  render() {
    return (
      <>
        <ul>
            {
              nav.items.map((n, i) => (

                  <li className="nav-item" key={i} >
                      <Link className="nav-link " to={n.url}>
                          <i className={n.icon} />
                          <span>{n.name}</span>
                      </Link>
                  </li>
              ))
            }
        </ul>
        <button onClick={this.logout}>Logout</button> 
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user
  }
}

const mapDispatchToProps = dispach => {
  return {
    dispach:dispach,
    logout: () => actionsCreator.logout()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DefaultAsside));

