import React from 'react';
import * as authActions from "../store/actions/type";
import { NotificationManager } from "../components/common/react-notifications";
import {
    FormText
} from "reactstrap";

export const ERROR_TITLE = "Erreur";
export const SUCCESS_TITLE = "OK";

export const LOGIN_ERROR = "Identifient ou mot de passe incorrect";
export const REGISTER_ERROR = "Erreur lors de l'incription";
export const REGISTER_SUCCESS = "Incription Reussie";

export const ADD_ERROR = "Erreur lors de l'enregistrement";
export const EDIT_ERROR = "Erreur lors de la modification";
export const DELETE_ERROR = "Erreur lors de la suppression";
export const GET_ERROR = "Erreur lors de l'affichage";
export const ADD_SUCCESS = "Enregistrement réussie";
export const EDIT_SUCCESS = "Modification réussie";
export const DELETE_SUCCESS = "Suppression réussie";
export const GET_SUCCESS = "Affichage réussie";

export const errorHandler = (error, dispatch, history, title, message) => {

    if(!title)
    {
        title = "Erreur";
    }

    if(!message)
    {
        message = "Quelque chose ses mal passée";
    }

    const { response } = error;
  
    if (response) {
  
        if (response.status === 401) {
  
            dispatch({
                type: authActions.LOGOUT
            });

            if(history)
            {
                history.push('/login');
            }
  
            return;
        }
        /*title = 'Error ' + response.status + ' - ' + response.statusText;
        message = response.data.message;*/
    }
    NotificationManager.error(
        message,
        title,
        5000,
        null,
        null,
        ''
    );
}

export const successHandler = (title, message) => {

    if(!title)
    {
        title = " ";
    }

    if(!message)
    {
        message = "Tout ses bien passée";
    }
    NotificationManager.success(
        message,
        title,
        5000,
        null,
        null,
        ''
    );
}

export const is_msg = (error, props) => {
    if(error)
    {
        const { response } = error; 
        const {data} = response;
        if(typeof(data[props]) != "undefined")
        {
            return true;
        }
        return false;
    }
    return false;
}

export const fildsMsgHandler = (error, props) => {
    try{
        if(error)
        {
            const { response } = error; 
            const {data} = response;
            if(typeof(data[props]) != "undefined")
            {
            return (
                <>
                    {
                    data[props].map((msg, idx) => {
                            return (
                                <FormText color="danger">
                                    {msg}
                                </FormText>
                            )
                    })
                    }
                </> 
                );
            }
            return null;
        }
    }catch(e)
    {
        return;
    }
    
}

export const appTitle = (title) => {
    const t = "FretLoad";
    var  e = document.getElementById("app-title");
    e.innerHTML = t +" - " +title;
}
