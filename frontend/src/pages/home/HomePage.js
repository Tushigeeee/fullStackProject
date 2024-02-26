import React from "react";
import { Header } from "../../components/header/Header";
import "./Home.css";

import videoFile from "../Assets/video (1080p).mp4";
import { Footer } from "../../components/footer";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="home-container">
      <div className="theme-picture">
        <video src={videoFile} autoPlay controls />
        <div className="home-content">
          <div className="header">
            <Header />
          </div>
          <h1>Welcome to Our Website!</h1>
          <h2>Discover, Explore, and Connect with Fellow Adventurers</h2>
          <div
            style={{
              paddingTop: "140px",
              fontSize: "50px",
              fontFamily: "Trattatello, fantasy",
            }}
          >
            <Link to="/signIn">Get Start Now</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
