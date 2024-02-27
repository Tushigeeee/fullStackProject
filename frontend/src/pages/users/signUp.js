import React, { useState } from "react";
import "./signup.css";
import { FaUser, FaLock, FaEnvelope, FaImage } from "react-icons/fa";
import { Header } from "../../components/header/Header";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useNotificationContext } from "../../context/NotificationContext";
import { uploadImage } from "../../utils";
import { Footer } from "../../components/footer";

export const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [img, setImg] = useState(null);

  const { signUp } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const imageUrl = await uploadImage(img);
      const response = await axios.post(
        `https://fullstackadventure-backend.onrender.com/users/sign-up`,
        // `http://localhost:8080/users/sign-up`,
        {
          name: userName,
          email,
          password,
          userImage: imageUrl,
        }
      );

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (data) {
        signUp(data);

        successNotification(`Sign Up successful, Hello ${data.newUser.email}`);
        navigate("/");
      } else {
        errorNotification("Sign up failed, please try again");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        errorNotification(err.response.data);
      } else {
        errorNotification("Unknown error");
      }
    }
  };

  return (
    <div className="body">
      <Header />
      <div
        style={{
          height: "95vh",
          width: "100vw",
          display: "flex",
          gap: "100px",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            marginTop: "200px",
            marginLeft: "80px",
            color: "white",
            gap: "50px",
          }}
        >
          <h1 style={{ fontSize: "50px" }}>Join the Adventure</h1>
          <h3 style={{ fontSize: "20px" }}>
            Discover, Explore, and Connect with Fellow Adventurers
          </h3>
        </div>
        <div className="wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFinish();
            }}
          >
            <h1>Sign Up</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input type="file" onChange={(e) => setImg(e.target.files[0])} />
              <FaImage className="icon" />
            </div>
            <button type="submit">Sign Up</button>

            <div className="register-link">
              <p>
                Already have an account? <a href="./signIn">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
