import { auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { fetchUserData } from "../utils/utils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  // Define authentication functions
  const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid, setUserData);
    } else {
      setUserData(null);
    }
  }, [user]);

  const valueData = {
    userData,
    loading,
    error,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
