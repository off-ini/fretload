import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "notifications?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "notifications" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "notifications/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "notifications", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "notifications/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "notifications/" + id);
};
