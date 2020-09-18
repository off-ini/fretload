import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "tmarchandises?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "tmarchandises" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "tmarchandises/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "tmarchandises", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "tmarchandises/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "tmarchandises/" + id);
};
