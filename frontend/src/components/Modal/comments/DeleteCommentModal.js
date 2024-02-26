import React, { useState } from "react";

import axios from "axios";
import { Modal } from "..";
import { Button, Form } from "antd";
import { useProductContext } from "../../../context/ProductsContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";

export const DeleteProductComment = ({
  open,
  handleClose,
  productId,
  commentId,
}) => {
  const [modalLoading, setModalLoading] = useState(false);
  const { successNotification, errorNotification } = useNotificationContext();
  const { Update_Product } = useProductContext();
  const { currentUser } = useUserContext();

  const handleCancelDeleteComment = () => {
    handleClose();
  };

  const onFinish = async () => {
    try {
      setModalLoading(true);
      const response = await axios.delete(
        `http://localhost:8080/products/${productId}/comments/${commentId}}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      Update_Product(data);
      successNotification("Product comment deleted successfully");
      setModalLoading(false);
      handleClose();
    } catch (error) {
      setModalLoading(false);
      errorNotification(error.response.data.message);
    }
  };
  return (
    <Modal open={open} handleClose={handleClose}>
      {modalLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading....
        </div>
      ) : (
        <Form
          onFinish={onFinish}
          autoComplete="off"
          name="normal_login"
          className="login-form"
        >
          Are you sure you want to delete this product comment?
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Button
              htmlType="button"
              onClick={handleCancelDeleteComment}
              className="login-form-button"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Delete
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};
