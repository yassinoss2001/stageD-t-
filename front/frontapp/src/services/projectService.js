import axiosApi from "../config/axios";

const PROJECT_ENDPOINT = "/projects";

const findAllProjects = async () => {
  return await axiosApi.get(`${PROJECT_ENDPOINT}`);
};

const addProject = async (project) => {
  return await axiosApi.post(`${PROJECT_ENDPOINT}`, project);
};

const deleteProject = async (id) => {
  return await axiosApi.delete(`${PROJECT_ENDPOINT}/${id}`);
};

export default {
  findAllProjects,
  addProject,
  deleteProject
};
