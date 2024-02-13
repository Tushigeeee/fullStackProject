import React, { useState } from "react";
import axios from "axios";
import { useProductContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { Modal } from "../../components/Modal/Modal";
import { Button, Form, Input, InputNumber, Image, Radio } from "antd";
import { uploadImage } from "../../utils";

export const EditProductModal = (props) => {
  const {
    handleClose,
    open,
    selectedProduct,
    id,
    setNewImageUrl,
    newImageUrl,
  } = props;
  const { Update_Product } = useProductContext();
  const { currentUser } = useUserContext();

  const { successNotification } = useNotificationContext();

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [selectedType, setSelectedType] = useState(selectedProduct.type);

  const lenght = newImageUrl?.length;

  const handleFileChange = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    setNewImageUrl(imageUrl);
  };
  const onChangeType = ({ target: { value } }) => {
    setSelectedType(value);
  };

  const options = [
    {
      label: "public",
      value: "public",
    },
    {
      label: "private",
      value: "private",
    },
  ];
  const inputPress = (e) => {
    const { value, name } = e.target;
    setDisabledSubmitButton(value === selectedProduct[name]);
  };
  const handleEditButton = async (values) => {
    const updatedProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      type: values.type,
      image: newImageUrl ? newImageUrl : selectedProduct.image,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/products/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Update_Product(data);

      successNotification("Product edited successfully");
      handleClose();
      setDisabledSubmitButton(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <Form
            initialValues={{
              name: selectedProduct.name,
              description: selectedProduct.description,
              category: selectedProduct.category,
              price: selectedProduct.price,
              type: selectedProduct.type,
            }}
            name="trigger"
            onFinish={(values) => {
              handleEditButton(values);
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
                { min: 2, message: "must be more than 2 characters" },
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
                options={options}
                onChange={(onChangeType, inputPress)}
                value={selectedType}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item label="image" name="image">
              <label>File</label>
              <input
                name="image"
                onChange={handleFileChange}
                placeholder="choose file"
                type="file"
              />
              <Image
                height={"60px"}
                src={newImageUrl ? newImageUrl : selectedProduct.image}
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Required" }]}
            >
              <Radio.Group
                options={options}
                onChange={(onChangeType, inputPress)}
                value={selectedType}
                optionType="button"
                buttonStyle="solid"
              />
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
                disabled={disabledSubmitButton && lenght === 0}
              >
                Submit
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                  setDisabledSubmitButton(true);
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};
