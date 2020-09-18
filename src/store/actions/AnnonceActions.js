import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "annonces?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "annonces" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "annonces/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "annonces", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "annonces/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "annonces/" + id);
};