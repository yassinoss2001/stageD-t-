import axiosApi from "../config/axios";

const EMPLOYEE_ENDPOINT="/users"

const findAllEmployees=async()=>{
    return await axiosApi.get(`${EMPLOYEE_ENDPOINT}`)
}

const deleteEmployee = async (id) => {
    return await axiosApi.delete(`${EMPLOYEE_ENDPOINT}/${id}`);
  };

 export default {findAllEmployees,deleteEmployee}