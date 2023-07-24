import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    userFromLocalStorage && userFromLocalStorage !== "undefined"
      ? JSON.parse(userFromLocalStorage)
      : null
  );

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
