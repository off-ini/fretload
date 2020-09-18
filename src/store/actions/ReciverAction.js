import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "destinataires?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "destinataires" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "destinataires/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "destinataires", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "destinataires/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "destinataires/" + id);
};
