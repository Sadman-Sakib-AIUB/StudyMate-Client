import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User Create
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User  Create with Google
  const createUserWithGoogle = () =>{
    return signInWithPopup(auth, provider);
  }

  // User Login
  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  // User Profile Update
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // User Logout
  const signoutUser = () => {
    return signOut(auth);
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


  const authData = {
    user,
    setUser,
    createUser,
    signinUser,
    signoutUser,
    loading,
    setLoading,
    updateUser,
    createUserWithGoogle,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;