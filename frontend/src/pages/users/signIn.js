import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Header } from "../../components/header/Header";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer } from "../../components/footer";

export const SignIn = () => {
  const { signIn } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fullstackadventure-backend.onrender.com/users/sign-in",
        // "http://localhost:8080/users/sign-in",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        signIn(data);
        successNotification("Sign in successful");
        navigate("/");
      } else {
        errorNotification("Sign in failed, please try again");
      }
    } catch (err) {
      errorNotification(err?.message);
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
          <h1 style={{ fontSize: "50px" }}>Join the Adventure </h1>
          <h3 style={{ fontSize: "20px" }}>
            Discover, Explore, and Connect with Fellow Adventurers
          </h3>
        </div>
        <div className="wrapper" style={{ paddingTop: "100px" }}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {errorNotification && (
              <div className="error-message">{errorNotification}</div>
            )}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="">Forgot password?</Link>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account? <a href="./signUp">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
