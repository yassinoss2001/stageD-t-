import axiosApi from "../config/axios";

const TASK_ENDPOINT = "/task";

const findAllTasks = async () => {
  return await axiosApi.get(`${TASK_ENDPOINT}`);
};

const addTask = async (task) => {
  return await axiosApi.post(`${TASK_ENDPOINT}`, task);
};

const deleteTask = async (id) => {
  return await axiosApi.delete(`${TASK_ENDPOINT}/${id}`);
};

const updateTask = async (id, taskData) => {
  return await axiosApi.patch(`${TASK_ENDPOINT}/${id}`, taskData);
};

const findTasksByUserId = async (userId) => {
  return await axiosApi.get(`${TASK_ENDPOINT}/by-user/${userId}`);
};


export default {
  findAllTasks,
  addTask,
  deleteTask,
  updateTask,
  findTasksByUserId
};
