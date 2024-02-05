import React from "react";
import "./signup.css";
import { FaUser, FaLock, FaEnvelope, FaImage } from "react-icons/fa";
import { Header } from "../../components/header/Header";

export const SignUp = () => {
  return (
    <div>
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
          <h1 style={{ fontSize: "50px" }}>Join the Advanture </h1>
          <h3 style={{ fontSize: "20px" }}>
            Discover, Explore, and Connect with Fellow Advanturers
          </h3>
        </div>
        <div className="wrapper">
          <form action="">
            <h1>Sign Up</h1>
            <div className="input-box">
              <input type="name" placeholder="User Name" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Comfirm Password" required />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input type="file" />
              <FaImage className="icon" />
            </div>
            <button type="submit">SignUp</button>

            <div className="register-link">
              <p>
                Already have an account? <a href="#">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
