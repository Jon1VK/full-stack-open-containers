import axios from "axios";
const baseUrl = "/api/users/";

const getAllUsers = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getUserById = (userId) => {
  return axios.get(baseUrl + userId).then((response) => response.data);
};

const userService = {
  getAll: getAllUsers,
  getById: getUserById,
};

export default userService;
