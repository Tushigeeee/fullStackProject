import React from "react";
import { HomePage, Products, Accounts, SingleProduct, SignUp } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/users/signIn";
import { useUserContext } from "./context/UserContext";

export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();
  console.log(currentUser);
  if (userContextLoading) {
    return <div>...Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/signIn" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <SingleProduct /> : <Navigate to="/signIn" />}
        />
        <Route
          path="/account"
          element={currentUser ? <Accounts /> : <Navigate to="/signIn" />}
        />

        <Route
          path="/signUp"
          element={currentUser ? <Navigate to="/" /> : <SignUp />}
        />

        <Route
          path="/signIn"
          element={currentUser ? <Navigate to="/" /> : <SignIn />}
        />
      </Routes>
    </BrowserRouter>
  );
};
