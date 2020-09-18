import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "marchandises?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "marchandises" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "marchandises/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "marchandises", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "marchandises/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "marchandises/" + id);
};
