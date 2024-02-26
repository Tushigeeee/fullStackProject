import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "antd";
import "./Products.css";
import { Header } from "../../components/header/Header";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductsContext";
import { Footer } from "../../components/footer";

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
          Share your Experience
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
              <h3 style={{ marginLeft: "60px", paddingBottom: "30px" }}>
                Trail Name: {product.name}
              </h3>
              {}

              <Image
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

              <div className="preview">
                <p style={{ color: "black" }}>Review:</p>
                <p style={{ color: "White" }}> {product.description}</p>
              </div>
              <div>
                <p style={{ color: "black" }}>Length (mile):</p>
                <p style={{ color: "white" }}> {product.price}</p>
              </div>
              <div>
                <p style={{ color: "black" }}>Difficulty:</p>
                <p style={{ color: "white" }}> {product.category}</p>
              </div>

              <p style={{ color: "lightyellow" }}>
                Added by {product.userEmail}
              </p>
            </div>
          ))}
        <Footer />
      </div>

      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
