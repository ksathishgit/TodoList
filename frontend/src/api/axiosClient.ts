import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/todolist/api/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosClient;
