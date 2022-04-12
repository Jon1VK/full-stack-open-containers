import axios from "axios";
const baseUrl = "/api/login";

const login = (username, password) => {
  return axios
    .post(baseUrl, { username, password })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const loginService = { login, setToken };

export default loginService;
