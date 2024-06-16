import { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import { createContext } from "react";
import { useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
     const {user, loading, error} = useAuthState(auth);


        // Define authentication functions
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

     const valueData = {
        user, loading, error, register, login, logout
     };
    
    return (
        <AuthContext.Provider value={valueData}>
        {!loading && children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
        return useContext(AuthContext);
    };