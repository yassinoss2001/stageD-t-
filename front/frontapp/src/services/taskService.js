import axiosApi from "../config/axios";

const TASK_ENDPOINT="/task"

const findAllTasks=async()=>{
    return await axiosApi.get(`${TASK_ENDPOINT}`)
}
 export default {findAllTasks}