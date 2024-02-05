import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

export const AccountEditModel = ({ handleClose, open }) => {
  const { currentUser } = useUserContext();
  const [inputValue, setInputValue] = useState({
    name: currentUser.user.name,
    email: currentUser.user.email,
    currentPassword: currentUser.user.password,
    newEmail: "",
    newPassword: "",
  });
  const { UPDATE_USER } = useUserContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleCancelButton = () => {
    setInputValue({
      name: currentUser.user.name,
      email: currentUser.user.email,
      currentPassword: currentUser.user.password,
    });
    handleClose();
  };

  const handleSaveButton = async () => {
    const updatedAccount = {
      name: inputValue.name,
      email: inputValue.email,
      currentPassword: inputValue.currentPassword,
      newPassword: inputValue.newPassword,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/account/changeProfile`,
        updatedAccount,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      UPDATE_USER(data);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title="Edit Account"
      visible={open}
      onCancel={handleCancelButton}
      footer={[
        <Button key="cancel" onClick={handleCancelButton}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSaveButton}>
          Save Changes
        </Button>,
      ]}
    >
      <div>
        <p>Current Name:</p>
        <Input
          placeholder="New Name"
          name="name"
          value={inputValue.name}
          onChange={handleInput}
        />
      </div>
      <div>
        <p>Current Email: </p>
        <Input
          placeholder="New Email"
          name="email"
          value={inputValue.email}
          onChange={handleInput}
        />
      </div>
      <div>
        <p>Current Password:</p>
        <Input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          value={inputValue.currentPassword}
          onChange={handleInput}
        />
      </div>
      <div>
        <p>New Password:</p>
        <Input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={inputValue.newPassword}
          onChange={handleInput}
        />
      </div>
    </Modal>
  );
};
