import axios from "axios";
const request = axios.create({
  baseURL: "https://backend-blogapp-6kc2.onrender.com",
});

export default request;
