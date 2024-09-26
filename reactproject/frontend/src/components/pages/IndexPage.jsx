import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexNavBar from "../Layouts/NavBarIndex";
import Background from "../Layouts/Background";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../assets/logo.jpg";
import BackgroundImg from "../../assets/Background.jpg";

const IndexPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true); // state to track if the login page is active
  const [fadeIn, setFadeIn] = useState(true); // state to track fade effect

  // Toggle between login and register with fade effect
  const handleLoginClick = () => {
    if (!isLoginPage) {
      setFadeIn(false);
      setTimeout(() => {
        setIsLoginPage(true);
        setFadeIn(true);
      }, 200); // duration of the fade-out animation
    }
  };

  const handleRegisterClick = () => {
    if (isLoginPage) {
      setFadeIn(false);
      setTimeout(() => {
        setIsLoginPage(false);
        setFadeIn(true);
      }, 200); // duration of the fade-out animation
    }
  };

  return (
    <div>
      <nav className="w-100 navbar navbar-expand-lg position-absolute p-0">
        <div className="container-fluid py-2 px-3 shadow">
          <div className="logo">
            <Link to="/">
              <img className="logoImage" src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="d-flex align-items-center gap-1">
            <button
              className={isLoginPage ? "btn text-light" : "orangeButton"}
              onClick={handleRegisterClick}
              style={{ border: "none", width: "90px", padding: "5px" }}
            >
              Register
            </button>
            <button
              className={isLoginPage ? "orangeButton" : "btn text-light"}
              onClick={handleLoginClick}
              style={{ border: "none", width: "90px", padding: "5px" }}
            >
              Log in
            </button>
          </div>
        </div>
      </nav>

      <div className={`fade-container ${fadeIn ? "fade-in" : "fade-out"}`}>
        {isLoginPage ? <Login /> : <Register />}
      </div>
      <Background>
        <img
          src={BackgroundImg}
          alt=""
          style={{ height: "100%", opacity: ".15" }}
        />
      </Background>
    </div>
  );
};

export default IndexPage;
