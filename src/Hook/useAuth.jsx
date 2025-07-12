import React, { use } from 'react';
import { Authcontex } from '../Provider/AuthContex';

const useAuth = () => {
    const userInfo = use(Authcontex)
    return userInfo;
       
    
};

export default useAuth;