import axiosApi from "../config/axios";

const PERMISSION_ENDPOINT = "/permissions";

const findAllPermissions = async () => {
  return await axiosApi.get(`${PERMISSION_ENDPOINT}`);
};

const addPermission = async (permission) => {
  return await axiosApi.post(`${PERMISSION_ENDPOINT}`, permission);
};

const deletePermission = async (id) => {
  return await axiosApi.delete(`${PERMISSION_ENDPOINT}/${id}`);
};

// Add the updatePermission function
const updatePermission = async (id, permission) => {
  return await axiosApi.patch(`${PERMISSION_ENDPOINT}/${id}`, permission);
};

export default { findAllPermissions, addPermission, deletePermission, updatePermission };
