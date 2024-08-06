import axiosApi from "../config/axios";


const AUTH_ENDPOINT = "/auth"; 




  const login = async (data) => {
    return await axiosApi.post(`${AUTH_ENDPOINT}/signin`, data);
  };


const authService = { login  };

export default authService;