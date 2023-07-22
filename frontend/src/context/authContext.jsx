import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser,
    setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = () => {

    // //TO DO
    // setCurrentUser({
    //   id: 1,
    //   name: "John Doe",
    //   profilePicture: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress" +
    //     "&cs=tinysrgb&w=1600"
    // });

    Axios
      .post("http://localhost:3000/login", {
        email: "user@example.com",
        password: "password123"
      })
      .then((response) => {
        const user = response.data; // Assuming the response returns the user data
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login
      }}>
      {children}
    </AuthContext.Provider>
  );
};
