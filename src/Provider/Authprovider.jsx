import React, { useEffect, useState } from "react";
import { Authcontex } from "./AuthContex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userInfo = {
    creatUser,
    user,
    setUser,
    loading,
    setLoading,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(user);
  return <Authcontex value={userInfo}>{children}</Authcontex>;
};

export default Authprovider;
