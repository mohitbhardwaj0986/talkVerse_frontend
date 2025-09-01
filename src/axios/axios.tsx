import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;


const instance = axios.create({
  baseURL: `${backend_url}api/v1`,
  withCredentials: true, 
});

export default instance;
