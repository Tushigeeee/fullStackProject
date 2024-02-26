import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import "./product.css";
import { DeleteProductModal } from "./DeleteProductModal";
import { useProductContext } from "../../context/ProductsContext";
import { Button, Flex, Image } from "antd";

import { Footer } from "../../components/footer";
import { Comment } from "./comment/Comment";

export const SingleProduct = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const { products, productContextLoading } = useProductContext();
  const selectedProduct = products.find((product) => product._id === id);
  console.log(selectedProduct);
  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div className="single-product-container">
        <Header />

        {selectedProduct && (
          <div className="single-product-content">
            <div className="name">
              <h1>Trail Name : {selectedProduct.name}</h1>
            </div>
            <div className="imgDescription">
              <Image
                style={{
                  height: "250px",
                  width: "300px",
                  borderRadius: "50px",
                }}
                src={selectedProduct.image}
                alt={"productImage"}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <h3>Review: {selectedProduct.description}</h3>
              </div>
            </div>
            <div className="cardBottom">
              <div className="priceCategory">
                <h3>Length (miles): {selectedProduct.price}</h3>
                <h3>Difficulty: {selectedProduct.category}</h3>
              </div>
              <Flex className="single-product-buttons">
                <Button block onClick={handleOpen}>
                  Edit
                </Button>
                <Button block onClick={handleOpenDelete}>
                  Delete
                </Button>
              </Flex>
            </div>
            <Comment />
          </div>
        )}

        <Footer />
        <EditProductModal
          handleClose={handleClose}
          open={open}
          selectedProduct={selectedProduct}
          id={id}
        />
        <DeleteProductModal
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          selectedProduct={selectedProduct}
          id={id}
        />
      </div>
    );
  }
};
