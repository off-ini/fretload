import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "missions?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "missions" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "missions/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "missions", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "missions/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "missions/" + id);
};
