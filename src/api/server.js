import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : "http://localhost:8080/api";

export default axios.create({
  baseURL: BASE_URL,
});
