import axiosApi from "../config/axios";

const PROJECT_ENDPOINT="/projects"

const findAllProjects=async()=>{
    return await axiosApi.get(`${PROJECT_ENDPOINT}`)
}
 export default {findAllProjects}