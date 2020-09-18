import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "mpayements?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "mpayements" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "mpayements/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "mpayements", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "mpayements/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "mpayements/" + id);
};
