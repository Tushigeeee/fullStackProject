import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import "./product.css";
import { DeleteProductModal } from "./DeleteProductModal";
import { useProductContext } from "../../context/ProductsContext";
import { Button, Flex } from "antd";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

export const SingleProduct = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const { products, productContextLoading, Update_Product } =
    useProductContext();

  const selectedProduct = products.find((product) => product._id === id);
  const { currentUser } = useUserContext();

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert("Please enter a comment");
    } else {
      const response = await axios.post(
        `http://localhost:8080/products/${id}/comments`,

        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      Update_Product(data);
      setComment("");
    }
  };

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div className="single-product-container">
        <Header />
        <div className="single-product-header">
          <Flex className="single-product-buttons">
            <Button block onClick={handleOpen}>
              Edit
            </Button>
            <Button block onClick={handleOpenDelete}>
              Delete
            </Button>
          </Flex>
        </div>
        {selectedProduct && (
          <div className="single-product-content">
            <div style={{ width: "40%" }}>
              <h1>Name : {selectedProduct.name}</h1>
              <img
                style={{
                  height: "250px",
                  width: "300px",
                  borderRadius: "50px",
                }}
                src={selectedProduct.image}
                alt={"productImage"}
              />
              <h3>Description : {selectedProduct.description}</h3>
              <h3>Price : {selectedProduct.price}</h3>
              <h3>Category : {selectedProduct.category}</h3>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",

            backdropFilter: "blur(10px)",
          }}
        >
          <h3>Comments</h3>
          {selectedProduct &&
            selectedProduct.comments &&
            selectedProduct.comments.map((comment, i) => {
              return (
                <div key={i} style={{ margin: "0px", display: "flex" }}>
                  <b>
                    <p style={{ marginRight: "10px" }}>{comment.userEmail}</p>
                  </b>
                  <p>{comment.comment}</p>
                </div>
              );
            })}

          <div style={{ marginTop: "30px", marginBottom: "60px" }}>
            <h3>Add Comment</h3>
            <form>
              <textarea
                style={{
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "50px",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
                placeholder="Add Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                style={{
                  width: "80px",
                  height: "40px",
                  borderRadius: "6px",
                  border: "none",
                }}
                onClick={handleAddComment}
              >
                Add
              </button>
            </form>
          </div>
        </div>

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
