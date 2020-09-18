import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "tvehicules?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "tvehicules" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "tvehicules/" + id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "tvehicules", data);
};

export const edit = (id, data) => {
  return axios.put(APIModel.HOST + "tvehicules/" + id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "tvehicules/" + id);
};
