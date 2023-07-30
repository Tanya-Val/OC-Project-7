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

  const logout = () => {
    try {
      // Make a logout request to your server to clear the server-side session/cookies
      axios.post("http://localhost:3000/api/auth/logout", null, {
        withCredentials: true,
      });

      // Clear the current user from localStorage and state
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
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
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
