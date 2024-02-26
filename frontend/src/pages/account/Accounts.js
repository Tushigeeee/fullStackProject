import React from "react";
import { Header } from "../../components/header/Header";
import { useUserContext } from "../../context/UserContext";
import { Button } from "antd";
import { AccountEditModel } from "./AccountEditModal";
import { useProductContext } from "../../context/ProductsContext";
import "./Account.css";
import { Footer } from "../../components/footer";

export const Accounts = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentUser, userContextLoading } = useUserContext();
  const { products, productContextLoading } = useProductContext();

  if (userContextLoading || productContextLoading) {
    return <div>Loading...</div>;
  }

  const userProducts = products.filter(
    (product) => product.userEmail === currentUser.user.email
  );

  return (
    <div className="accounts-container">
      <Header />

      <h1 className="account-info-title">Account Information</h1>

      {currentUser && (
        <div className="user-info-container">
          <img
            className="user-avatar"
            src={currentUser.user.userImage}
            alt={currentUser.user.name}
          />
          <div className="userInfo">
            {" "}
            <p className="user-name">Name : {currentUser.user.name}</p>
            <p className="user-email">Email: {currentUser.user.email}</p>
            <div className="button-container">
              <Button variant="outlined" onClick={handleOpen}>
                Edit Account
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="productCardContainer">
        {userProducts.map((product) => (
          <div key={product._id} className="productCard">
            <h3 className="product-name">{product.name}</h3>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />

            <p className="product-details">
              Review: <span>{product.description}</span>
            </p>
            <p className="product-details">
              Length (miles): <span>{product.price}</span>
            </p>
            <p className="product-details">
              Difficulty: <span>{product.category}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="footer">
        <Footer />
      </div>

      <AccountEditModel handleClose={handleClose} open={open} />
    </div>
  );
};
