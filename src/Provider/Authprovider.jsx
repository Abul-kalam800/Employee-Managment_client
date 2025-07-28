import React, { useEffect, useState } from "react";
import { Authcontex } from "./AuthContex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  // update profile 
  const userProfile = (provider)=>{
    return updateProfile(auth.currentUser,provider)
  }
  //sign in with Google
  const signwithGoogle = (provider)=>{
    return signInWithPopup(auth,provider)
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
   signwithGoogle,
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
 
  return <Authcontex value={userInfo}>{children}</Authcontex>;
};

export default Authprovider;
