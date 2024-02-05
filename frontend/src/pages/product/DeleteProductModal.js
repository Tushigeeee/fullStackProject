import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "antd";

export const DeleteProductModal = (props) => {
  const { handleCloseDelete, openDelete, id } = props;

  const { currentUser } = useUserContext();

  const { successNotification, errorNotification } = useNotificationContext();
  const { Delete_Product } = useProductContext();

  const navigate = useNavigate();

  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Delete_Product(data._id);

      successNotification("Product Deleted successfully");
      handleCloseDelete();
      navigate("/products");
    } catch (err) {
      errorNotification(err?.message);
      console.error(err);
    }
  };

  return (
    <div>
      <Modal handleClose={handleCloseDelete} open={openDelete}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Are You sure?</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ width: "100%" }}
              onClick={() => {
                handleDeleteButton(id);
              }}
            >
              Delete
            </Button>
            <Button
              block
              onClick={() => {
                handleCloseDelete();
              }}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
