import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Products.css";
import { Header } from "../../components/header/Header";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductsContext";

export const Products = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { products, productContextLoading } = useProductContext();
  console.log(products);

  if (productContextLoading) {
    return <div className="loading">...Loading Products</div>;
  }

  return (
    <div className="products-container">
      <Header />

      <div className="button-container">
        <Button
          variant="outlined"
          onClick={handleOpen}
          className="create-product-button"
        >
          Create Product
        </Button>
      </div>

      <div className="product-cards-container">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <h3 style={{ marginLeft: "80px" }}>Name: {product.name}</h3>
              {}

              <img
                style={{
                  width: "300px",
                  height: "250px",
                  borderRadius: "10px",
                }}
                src={product.image}
                alt={product.name}
              />

              <p
                style={{
                  color: product.type === "public" ? "lightgreen" : "lightblue",
                }}
              >
                Type: {product.type}
              </p>

              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p style={{ color: "lightyellow" }}>
                Added by {product.userEmail}
              </p>
            </div>
          ))}
      </div>

      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
