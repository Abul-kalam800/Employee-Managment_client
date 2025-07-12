import axios from 'axios';
import React from 'react';
const axioesInstance = axios.create({
      baseURL: 'http://localhost:5000',
})
const useAxios = () => {
    return axioesInstance;
  
    
};

export default useAxios;