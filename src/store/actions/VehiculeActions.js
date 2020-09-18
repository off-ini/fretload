import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "vehicules?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "vehicules" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "vehicules/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "vehicules", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "vehicules/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "vehicules/" + id);
};
