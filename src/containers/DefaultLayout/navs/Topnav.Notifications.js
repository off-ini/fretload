import React, { Component } from "react";
import {connect} from 'react-redux';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Pusher from 'pusher-js';
import moment from 'moment';

import * as actions from '../../../store/actions/type';
import * as actionsCreator from '../../../store/actions/NotificationActions';
import * as msg from '../../../utils/messages';

import notifications from "../../../data/notifications";
import { NavLink } from "react-router-dom";

const NotificationItem = ({n, onRead}) => {
  const data = n.data;
  return (
    <div className="d-flex flex-row mb-3 pb-3 border-bottom" onClick={() => onRead(n.id)}>
      {/*<NavLink to={`/app/${data.type}s`}>
        <img
          src={'/assets/img/profile-pic-l-2.jpg'}
          alt={data.type}
          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
        />
      </NavLink>*/}
      {
        data.type === 'mission' ?
          <div className="pl-3 pr-2">
            <NavLink to={`/app/${data.type}s`}>
              <p className="font-weight-medium mb-1">
                {
                  'Novelle mission' + ' - ' + data.mission.marchandise.label
                }
              </p>
              <p className="text-muted mb-0 text-small">{moment(n.created_at).fromNow()}</p>
            </NavLink>
          </div>
        :
          <div className="pl-3 pr-2">
            <NavLink to={data.type === 'proposition' ? `/app/${data.type}s` : "propositions"}>
              <p className="font-weight-medium mb-1">
                {
                  data.proposition.annonce.title + ' - ' + data.proposition.montant_t
                }
              </p>
              <p className="text-muted mb-0 text-small">{moment(n.created_at).fromNow()}</p>
            </NavLink>
          </div>
      }
      
    </div>
  );
};


class TopnavNotifications extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      nombre:0
    }
  }

  componentDidMount = () => {
    this.all();
    this.push();
  }


  componentWillReceiveProps = (nextProps) => {
    this.setState({
      nombre: nextProps.notifications.length
    });
  }

  all = () =>
  {
    this.setState({loading:true});
      let { all, dispatch, history } = this.props
      all().then(res => {
      dispatch({type:actions.ALL_NOTIFICATIONS, payload:res.data});
      this.setState({nombre: this.props.notifications.length});
      }).catch(e => msg.errorHandler(e, dispatch, history))
      .finally(() => this.setState({loading:false}));
  }

  push = () => {
    let { dispatch, user } = this.props
    Pusher.logToConsole = true;

    var pusher = new Pusher('fdd79a640f3e479ff6aa', {
        cluster: 'mt1',
        forceTLS: true
    });
    var channel = pusher.subscribe('channel-notification');
    channel.bind('event-notification',
      function(data) {
        if(data.data.user_id === user.id)
        {
          //let nombre = this.state.nombre;
          dispatch({
            type:actions.CREATE_NOTIFICATION, 
            payload:data.data.data
          });
          /*this.setState({
            nombre:nombre + 1
          });*/
        }
      }
    );
  }

  read = (id) => {
    let { edit, dispatch, history } = this.props
    edit(id, null)
    .then(res => {
        this.all();
    })
    .catch(e => {
      msg.errorHandler(e, dispatch, history, msg.ERROR_TITLE, msg.EDIT_ERROR);
      this.setState({errors:e});
    })
    .finally(() => this.setState({validing:false}));
  }
  
  render() {
    return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          {
            this.state.nombre > 0 ?
              <span className="count">{this.state.nombre}</span>
            :null
          }
          
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {
              this.props.notifications ?
              <>
                {
                  this.props.notifications.map((n, index) => {
                    return <NotificationItem key={index} n={n} onRead={this.read} />;
                  })
                }
              </>
              :
              null
            }
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.NotificationReducer.notifications,
    user: state.AuthReducer.user
  }
}

const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
    all: (n) => actionsCreator.all(n),
    edit:(id, data) => actionsCreator.edit(id, data),
  }
}

export default connect(mapStateToProps, mapDispatchToProsps)(TopnavNotifications);
