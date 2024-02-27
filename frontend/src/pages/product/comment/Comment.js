import { Avatar, Button, Flex, Form, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductsContext";

import { useUserContext } from "../../../context/UserContext";

import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNotificationContext } from "../../../context/NotificationContext";
import { EditComment } from "./EditComment";

export const Comment = (props) => {
  const { id } = useParams();

  const { products, Update_Product } = useProductContext();
  const { currentUser } = useUserContext();

  const { successNotification, errorNotification } = useNotificationContext();

  const selectedProduct = products.find((product) => product._id === id);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const createComment = async (values, form) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://fullstackadventure-backend.onrender.com/products/${id}/comments`,
        // `http://localhost:8080/products/${id}/comments`,
        { comment: values.comment },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      console.log("createComment: data", data);

      Update_Product(data.updatedProduct);
      successNotification("Added comment successfully");
      setLoading(false);

      form.setFieldsValue({ comment: "" });
    } catch (error) {
      console.log(error);
      errorNotification(error.message);
    }
  };

  return (
    <Flex vertical="true" gap="small" justify="center">
      <Typography.Title level={5} style={{ marginBottom: 5 }}>
        Add comment
      </Typography.Title>
      <Flex
        horizental="true"
        gap="small"
        justify={"center"}
        align={"center"}
        style={{ width: "100%" }}
      >
        <Form
          form={form}
          name="trigger"
          onFinish={(values) => createComment(values, form)}
          onFinishFailed={(errorInfo) => {
            console.log(errorInfo);
          }}
          style={{
            width: "100%",
          }}
          layout="horizental"
          autoComplete="off"
        >
          <Flex horizental="true" gap="small" style={{ paddingRight: "0px" }}>
            <Form.Item
              align={"center"}
              justify={"center"}
              layout="horizental"
              name="comment"
              rules={[{ required: true, message: "Required" }]}
              style={{
                width: "80%",
              }}
            >
              <TextArea />
            </Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              size="large"
            >
              Send
            </Button>
          </Flex>
        </Form>
      </Flex>
      <Typography.Title level={5} style={{ marginBottom: 5 }}>
        Comments
      </Typography.Title>

      {selectedProduct.comments.map((comment, index) => (
        <Flex
          key={index}
          vertical="true"
          gap="middle"
          style={{
            border: "1px solid lightgray",

            borderRadius: "10px",
            padding: "5px 10px",
          }}
        >
          <Flex
            key={index}
            horizental="true"
            gap="middle"
            style={{
              borderRadius: "10px",
              padding: "5px 10px",
            }}
          >
            <Flex vertical="true" justify={"start"} align={"center"}>
              <Avatar size="large" src={comment.user.profilePicUrl} />
              <span>{comment.user.name}</span>
            </Flex>
            <Flex
              key={index}
              vertical="true"
              gap="small"
              style={{
                width: "100%",
                padding: "10px",
              }}
            >
              <Flex
                key={index}
                horizental="true"
                gap="middle"
                style={{
                  width: "100%",
                }}
              >
                <Flex
                  align="center"
                  justify="start"
                  style={{
                    padding: "0px 10px",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                >
                  <EditComment comment={comment} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
