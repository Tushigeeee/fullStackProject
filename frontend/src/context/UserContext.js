import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "../pages/utils/utils";
import { useNotificationContext } from "./NotificationContext";
const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);

  const [userContextLoading, setUserContextLoading] = useState(false);

  const { errorNotification } = useNotificationContext();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!user) {
        setUserContextLoading(false);
        return;
      }
      if (token && !isTokenExpired(token)) {
        setCurrentUser(user);
        setUserContextLoading(false);
      } else {
        localStorage.removeItem("user");
        signOut();
        errorNotification("Session expired. Please sign in again.");
        setUserContextLoading(false);
      }
    } catch (error) {
      errorNotification(error?.message);
    }
  }, [errorNotification]);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };
  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    console.log("UserProvider --> logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const UPDATE_USER = async (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(JSON.parse(updatedUser));
  };

  return (
    <userContext.Provider
      value={{
        currentUser,
        userContextLoading,
        signOut,
        signIn,
        signUp,
        UPDATE_USER,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);
  return context;
};
