import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "adresses?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "adresses" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "adresses/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "adresses", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "adresses/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "adresses/" + id);
};
