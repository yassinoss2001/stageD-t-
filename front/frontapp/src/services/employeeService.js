import axiosApi from "../config/axios";

const EMPLOYEE_ENDPOINT="/users"

const findAllEmployees=async()=>{
    return await axiosApi.get(`${EMPLOYEE_ENDPOINT}`)
}
 export default {findAllEmployees}