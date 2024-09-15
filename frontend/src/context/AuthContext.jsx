import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${process.env.React_App_BASE_URL}/api/user/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post(`${process.env.React_App_BASE_URL}/api/user/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// https://react-crud-v3am.onrender.com