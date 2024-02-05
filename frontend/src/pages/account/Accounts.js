import React from "react";
import { Header } from "../../components/header/Header";
import { useUserContext } from "../../context/UserContext";
import { Button } from "antd";
import { AccountEditModel } from "./AccountEditModal";
export const Accounts = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "95vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header />

      <h1
        style={{
          paddingTop: "20px",
          color: "#81B2D9",
        }}
      >
        Account Information
      </h1>
      <div className="button-container">
        <Button variant="outlined" onClick={handleOpen}>
          Edit Account
        </Button>
      </div>
      {currentUser && (
        <div>
          <p>Name : {currentUser.user.name}</p>
          <p>Email: {currentUser.user.email}</p>
          <p>Image: {currentUser.user.Image}</p>
        </div>
      )}

      <AccountEditModel handleClose={handleClose} open={open} />
    </div>
  );
};
