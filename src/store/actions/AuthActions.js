import APIModel from "../../models/APIModel";
import axios from "axios";

export const login = params => {
  return axios.post(APIModel.HOST + "auth/login",params/*,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    }
  }*/);
};

export const logout = () => {
  return axios.post(APIModel.HOST + "auth/logout"/*,null,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  }*/);
};
