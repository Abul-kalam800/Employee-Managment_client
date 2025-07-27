import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
const axioesInstance = axios.create({
  baseURL: "https://employee-managment-server-three.vercel.app",
});
const useAxios = () => {
  const { user, logOut } = useAuth();
  const navigation = useNavigate();
  axioesInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    };
  axioesInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("response interceptor", error.status);
      const status = error.status;
      if (status == 403) {
        navigation("/forbidden");
      }
      
      else if (status == 401 || status==405) {
        logOut()
          .then(() => {
            navigation("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axioesInstance;
};

export default useAxios;
