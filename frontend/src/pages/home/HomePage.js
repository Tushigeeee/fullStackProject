import React from "react";
import { Header } from "../../components/header/Header";
import "./Home.css";

export const HomePage = () => {
  return (
    <div className="home-container">
      <Header />

      <div className="theme-picture">
        <img
          src="https://robbreport.com/wp-content/uploads/2021/12/sodrise01.jpg?w=1000"
          alt="Theme"
        />

        <div className="home-content">
          <h1>Welcome to Our Website!</h1>
          <h2>Discover amazing products that suit your needs.</h2>
        </div>
      </div>
    </div>
  );
};
