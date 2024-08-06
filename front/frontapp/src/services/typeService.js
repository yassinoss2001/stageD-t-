import axiosApi from "../config/axios";

const TYPE_ENDPOINT = "/types";

// Fetch all types
const findAllTypes = async () => {
  return await axiosApi.get(`${TYPE_ENDPOINT}`);
};

// Add a new type
const addType = async (typeData) => {
  return await axiosApi.post(`${TYPE_ENDPOINT}`, typeData);
};

// Delete a type by its ID
const deleteType = async (id) => {
  return await axiosApi.delete(`${TYPE_ENDPOINT}/${id}`);
};

// Update a type by its ID
const updateType = async (id, typeData) => {
  return await axiosApi.patch(`${TYPE_ENDPOINT}/${id}`, typeData);
};

export default { findAllTypes, addType, deleteType, updateType };
