import axiosApi from "../config/axios";

const TYPES_ENDPOINT="/types"

const findAllTypes=async()=>{
    return await axiosApi.get(`${TYPES_ENDPOINT}`)
}
 export default {findAllTypes}