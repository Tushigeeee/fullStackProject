import React, { useState } from "react";

import axios from "axios";

import { Button, Form, Input } from "antd";

import { useProductContext } from "../../../context/ProductsContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";
import { Modal } from "../../../components/Modal/Modal";

export const UpdateProductComment = ({
  open,
  handleClose,
  productId,
  comment,
}) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const { successNotification, errorNotification } = useNotificationContext();
  const { Update_Product } = useProductContext();
  const { currentUser } = useUserContext();

  const handleCancelUpdateComment = () => {
    handleClose();
  };

  const onFinish = async () => {
    try {
      setModalLoading(true);
      const response = await axios.put(
        `https://fullstackadventure-backend.onrender.com/products/${productId}/comments/${comment._id}`,
        // `http://localhost:8080/products/${productId}/comments/${comment._id}`,
        {
          comment: updatedComment,
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
      successNotification(" Comment updated successfully");
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
          name="basic"
          initialValues={{ comment: comment.comment }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please input your comment!" }]}
          >
            <Input
              type="text"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Update
            </Button>
            <Button
              type="default"
              onClick={handleCancelUpdateComment}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
