import axiosApi from "../config/axios";

const TYPE_ENDPOINT = "/types";

const findAllTypes = async () => {
  return await axiosApi.get(`${TYPE_ENDPOINT}`);
};

const addType = async (typeData) => {
  return await axiosApi.post(`${TYPE_ENDPOINT}`, typeData);
};

const deleteType = async (id) => {
  return await axiosApi.delete(`${TYPE_ENDPOINT}/${id}`);
};

export default { findAllTypes, addType, deleteType };
