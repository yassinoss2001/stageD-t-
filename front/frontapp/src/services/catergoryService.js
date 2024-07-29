import axiosApi from "../config/axios";

const CATEGORY_ENDPOINT="/categories"

const findAllCatgories=async()=>{
    return await axiosApi.get(`${CATEGORY_ENDPOINT}`)
}
 export default {findAllCatgories}