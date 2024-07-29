import axiosApi from "../config/axios";

const PERMISSION_ENDPOINT="/permissions"

const findAllPermissions=async()=>{
    return await axiosApi.get(`${PERMISSION_ENDPOINT}`)
}
 export default {findAllPermissions}