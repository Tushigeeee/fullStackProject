import React, { useState } from "react";
import axios from "axios";
import { Modal } from "../../components/Modal/Modal";
import { useNotificationContext } from "../../context/NotificationContext";
import { Button, Form, Input, InputNumber, Radio } from "antd";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductsContext";
import { uploadImage } from "../utils/utils";

const plainOptions = ["public", "private"];

export const CreateProductModal = (props) => {
  const [img, setImg] = useState();

  const { handleClose, open } = props;
  const [type, setType] = React.useState("public");
  const { currentUser } = useUserContext();
  const { Create_Product } = useProductContext();

  const { successNotification } = useNotificationContext();

  const submitProductForm = async (values) => {
    try {
      const imageUrl = await uploadImage(img);

      const response = await axios.post(
        "http://localhost:8080/products",
        { ...values, image: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Create_Product(data);
      handleClose();
      successNotification("Create Product successfully");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Create Product</h3>
          </div>

          <Form
            name="trigger"
            onFinish={(values) => {
              submitProductForm(values);
            }}
            onFinishFailed={(errorInfo) => {
              console.log(errorInfo);
            }}
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Required" },
                { min: 2, message: "Must be more than 2 characters" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ min: 1, required: true, type: "number" }]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Required" }]}
            >
              <Radio.Group
                options={plainOptions}
                onChange={onChangeType}
                value={type}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="file" onChange={(e) => setImg(e.target.files[0])} />
            </Form.Item>
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
              >
                Create
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
