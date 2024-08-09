// src/services/projectService.js

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

const updateProject = async (id, project) => {
  return await axiosApi.patch(`${PROJECT_ENDPOINT}/${id}`, project);
};

const findProjectById = async (id) => {
  return await axiosApi.get(`${PROJECT_ENDPOINT}/${id}`);
};

const projectService = {
  findAllProjects,
  addProject,
  deleteProject,
  updateProject,
  findProjectById
};

export default projectService;
