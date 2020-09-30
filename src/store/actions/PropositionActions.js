import APIModel from "../../models/APIModel";
import axios from "axios";

export const all = (pageNumber) => {
    return axios.get(APIModel.HOST + "propositions?page="+pageNumber);
};

export const get = (search) => {
  return axios.get(APIModel.HOST + "propositions" + search);
};

export const detail = (id) => {
  return axios.get(APIModel.HOST + "propositions/" + id);
};

export const detailByAnnonceAndUser = (annonce_id, user_id) => {
  return axios.get(APIModel.HOST + "propositions/annoncebyuser/" + annonce_id +'/'+ user_id);
};

export const create = (data) => {
  return axios.post(APIModel.HOST + "propositions", data);
};

export const edit = (annonce_id, user_id, data) => {
  return axios.put(APIModel.HOST + "propositions/" + annonce_id +'/'+ user_id, data);
};

export const deleted = (id) => {
  return axios.delete(APIModel.HOST + "propositions/" + id);
};