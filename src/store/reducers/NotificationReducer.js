import * as actions from "../actions/type";

const initSate = {
  notifications : []
};

const NotificationReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.ALL_NOTIFICATIONS: {
        return { ...state, notifications: action.payload };
    }
  
    case actions.GET_NOTIFICATIONS: {
      return { ...state, notifications: action.payload };
    }

    case actions.CREATE_NOTIFICATION: {
      return { ...state, notifications: [{...action.payload},...state.notifications] };
    }

    case actions.EDIT_NOTIFICATION: {
      let notification = action.payload;
      let notifications = state.notifications.map( u => {
        if(u.id === notification.id){
          return {...notification}
        }
        return {...u}
      });
      return { ...state, notifications: notifications};
    }
    case actions.NOTIFICATION_DETAIL: {
      let notifications = state.notifications.filter( v => v.id !== action.payload);
      return { ...state, notifications: notifications };
    }

    case actions.DELETE_NOTIFICATION: {
      let notifications = state.notifications.filter( v => v.id !== action.payload);
      return { ...state, notifications };
    }
    default:{
      return state;
    }
  }
};

export default NotificationReducer;