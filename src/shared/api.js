import axios from "axios";
import TokenValidate from "./TokenValidate";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const BASE_URL = 'http://localhost:8000/';

export const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(
  async (config) => {
    if (config.url.includes("/login")) return config
    if(config.url.includes("/register")) return config
   if (config.url.includes("/refresh")) return config
   const valid = TokenValidate()
   if(!valid) return <Navigate to={"/"}/>
   config.headers["Authorization"] = "Bearer " + Cookies.get("accessToken")
   config.headers["Content-Type"] = "application/json"
   return config;
 },
(error) => {
 
   return Promise.reject(error);
}
);
// Response Interceptor
api.interceptors.response.use(
 (response) => {
   return response;
 },
 (error) => {
   const request = error.config; //actual Request
   if (error.response) {
  
    console.error('Response error:', error.response.status, error.response.data);
  } else if (error.request) {
    console.log(error)
    
  } else {
   
    console.error('Request setup error:', error.message);
  }
   if (error.response.status === 401 && !request._retry) {
     request._retry = true;
     api.defaults.headers.common["Authorization"] =
     "Bearer " + Cookies.get("accessToken");
     api.defaults.headers.common["Content-Type"] = "application/json";    
     return api(request);
   } 

   return Promise.reject(error);
 }
);
