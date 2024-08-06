import axiosApi from "../config/axios";

const EMPLOYEE_ENDPOINT = "/users";

const findAllEmployees = async () => {
  return await axiosApi.get(`${EMPLOYEE_ENDPOINT}`);
};

const deleteEmployee = async (id) => {
  return await axiosApi.delete(`${EMPLOYEE_ENDPOINT}/${id}`);
};

const updateEmployee = async (id, employeeData) => {
  return await axiosApi.patch(`${EMPLOYEE_ENDPOINT}/${id}`, employeeData);
};


const addEmployee = async (employeeData) => {
  return await axiosApi.post(`${EMPLOYEE_ENDPOINT}`, employeeData);
};

const employeeService = { findAllEmployees, deleteEmployee, updateEmployee, addEmployee  };

export default employeeService;
