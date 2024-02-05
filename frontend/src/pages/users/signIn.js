import React from "react";
import "./signup.css";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Header } from "../../components/header/Header";

export const SignIn = () => {
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
        <div className="wrapper" style={{ paddingTop: "100px" }}>
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
