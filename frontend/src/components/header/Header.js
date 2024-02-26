import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import footer_logo from "../../pages/Assets/new.png";
export const Header = () => {
  const { currentUser, signOut, userContextLoading, setProducts } =
    useUserContext();

  const { successNotification } = useNotificationContext();
  const handleLogOut = () => {
    signOut();
    successNotification("You have been logged out");
    setProducts([]);
  };

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="Header">
      <div className="Header-Left">
        <Link to="/">
          {" "}
          <img src={footer_logo} alt="" />
        </Link>
      </div>

      <div className="Header-Right">
        <div className="Header-Right-Item">
          {currentUser && (
            <>
              <Link to="/products">Products</Link>
              <Link to="/account">
                Welcome .
                {currentUser.user
                  ? currentUser.user.email
                  : currentUser.newUser.email}
              </Link>
            </>
          )}
          {currentUser ? (
            <>
              <Link to="/" onClick={handleLogOut}>
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/signUp">Sign Up</Link>
              <Link to="/signIn">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
