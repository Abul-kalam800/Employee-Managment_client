import React, { useEffect, useState } from "react";
import { Authcontex } from "./AuthContex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //   sign up
  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   sign in
  const signUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // log out
  const logOut = ()=>{
    return signOut(auth)
  }
  const userProfile = (provider)=>{
    return updateProfile(auth.currentUser,provider)
  }
  const userInfo = {
    creatUser,
    user,
    setUser,
    loading,
    setLoading,
   signUser,
   logOut,
   userProfile,
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
