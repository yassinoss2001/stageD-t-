import axiosApi from "../config/axios";

const AUTH_ENDPOINT = "/auth";

const login = async (data) => {
  return await axiosApi.post(`${AUTH_ENDPOINT}/signin`, data);
};

const logout = async (userId, token) => {
  return await axiosApi.get(`${AUTH_ENDPOINT}/logout`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const authService = { login, logout };

export default authService;
