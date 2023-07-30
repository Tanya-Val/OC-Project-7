import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });
  
  

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", inputs, {
        withCredentials: true,
      });
  
      console.log("Response from server:", res.data);
  
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);
  

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};