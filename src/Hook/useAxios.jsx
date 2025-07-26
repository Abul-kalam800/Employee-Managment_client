import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
const axioesInstance = axios.create({
      baseURL: 'http://localhost:5000',
})
const useAxios = () => {
    const {user }=useAuth()
    axioesInstance.interceptors.request.use(config=>{
        config.headers.Authorization=`Bearer ${user.accessToken}`
        return config

    }),(error)=>{

     return Promise.reject(error)
    }

    return axioesInstance;
  
    
};

export default useAxios;