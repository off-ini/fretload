import * as actions from '../actions/type';
import {cookieTimeAsMinutes} from '../../utils/cookies';
import Cookies from 'js-cookie';
import axios from 'axios';

const initState = {
    user: Cookies.getJSON('User') ? Cookies.getJSON('User') : null,
}

const AuthReducer = (state = initState, action) =>{
    switch (action.type) {
        case actions.LOGIN:
        {
            let user = { ...action.payload.user};

            user.auth = { 
                ...action.payload.auth,
                accessToken: action.payload.access_token,
                roles: action.payload.roles,
                permissions: action.payload.permissions
            };

            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.access_token}`;
            Cookies.set('User', user, {expires:cookieTimeAsMinutes(action.payload.expires_in)})
            return { ...state,
                user
            };
        }   
        case actions.LOGOUT:
        {
            axios.defaults.headers.common['Authorization'] = null;
            Cookies.remove('User');
            return {...state, user: null};
        }
        default:
            return state;
    }
}


export default AuthReducer;
