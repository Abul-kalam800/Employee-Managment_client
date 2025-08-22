import React from 'react';

import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from '../../Hook/useAuth';
import LoadingSpnieer from '../../Pages/spinnerPage/LoadingSpnieer';
const ProfielPage = () => {

 

    const {user}=useAuth()
    const [profile,setProfile]=useState(null)
    
    
    useEffect(() => {
    axios.get(`http://localhost:5000/profile/${user.email}`)
      .then(res =>setProfile (res.data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <LoadingSpnieer></LoadingSpnieer>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl bg-indigo-300 shadow-lg rounded-2xl p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center bg-blue-400">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.role}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-3">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Salary:</strong> {profile.salary || "N/A"}</p>
          <p><strong>Account:</strong> {profile.bank_account || "Not Provided"}</p>
        </div>

        {/* Edit Profile Button */}
       
      </div>
    </div>
  );
}



export default ProfielPage;