import React, { useState } from "react";
import { Modal, Button, Input, Image } from "antd";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { uploadImage } from "../../utils";

export const AccountEditModel = ({ handleClose, open }) => {
  const { currentUser } = useUserContext();
  const [inputValue, setInputValue] = useState({
    name: currentUser.user.name,
    email: currentUser.user.email,
    password: currentUser.user.password,
    userImage: currentUser.user.userImage,
    newName: "",
    newEmail: "",
    newPassword: "",
    newUserImage: "",
  });
  const { UPDATE_USER } = useUserContext();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log(currentUser);

  const handleCancelButton = () => {
    setInputValue({
      name: currentUser.user.name,
      email: currentUser.user.email,
      password: currentUser.user.password,
      userImage: currentUser.user.userImage,
    });
    handleClose();
  };
  const [newUserImage, setNewUserImage] = useState();

  const handleFileChange = async (e) => {
    const userImage = await uploadImage(e.target.files[0]);
    setNewUserImage(userImage);
  };
  console.log(newUserImage);
  console.log(currentUser);

  const handleSaveButton = async () => {
    const updatedAccount = {
      name: inputValue.name,
      email: inputValue.email,

      password: inputValue.currentPassword,
      newPassword: inputValue.newPassword,
      newName: inputValue.name,
      newEmail: inputValue.email,
      userImage: currentUser.user.userImage,
      newUserImage: newUserImage,
    };
    console.log(updatedAccount);
    try {
      const response = await axios.put(
        `https://fullstackadventure-backend.onrender.com/account/changeProfile`,
        // `http://localhost:8080/account/changeProfile`,
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
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title="Edit Account"
      open={open}
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
      <div>
        <label>Image</label>
        <input
          name="image"
          onChange={handleFileChange}
          placeholder="choose file"
          type="file"
        />
        <Image
          height={"60px"}
          src={newUserImage ? newUserImage : currentUser.user.userImage}
        />
      </div>
    </Modal>
  );
};
