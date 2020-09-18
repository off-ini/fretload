import APIModel from "../../models/APIModel";
import axios from "axios";

export const allUsers = () => {
    return axios.get(APIModel.HOST + "users");
};

export const getUsers = (search) => {
  return axios.get(APIModel.HOST + "users" + search);
};

export const userDetail = (id) => {
  return axios.get(APIModel.HOST + "users/" + id);
};

export const createUser = (params) => {
  return axios.post(APIModel.HOST + "users", params);
};

export const editUser = (id, data) => {
  return axios.post(APIModel.HOST + "users/" + id, data);
};

export const deleteUser = (id) => {
  return axios.delete(APIModel.HOST + "users/" + id);
};
