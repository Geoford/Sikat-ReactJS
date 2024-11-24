import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexNavBar from "../Layouts/NavBar/NavBarIndex";
import Background from "../Layouts/Background";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../assets/logo.jpg";
import BackgroundImg1 from "../../assets/LogInBackground (1).png";
import BackgroundImg2 from "../../assets/LogInBackground (2).png";
import { PreLoader } from "./PreLoader";

const LoginRegister = () => {
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
    <>
      <div className="">
        {/* <nav className="w-100 navbar navbar-expand-lg position-absolute p-0">
        <div className="container-fluid py-2 px-3 shadow">
          <div className="logo">
            <Link to="/">
              <img className="logoImage" src={Logo} alt="Logo" />
            </Link>
          </div>
          
        </div>
      </nav> */}
        <div
          className="d-flex align-items-center position-absolute  gap-1"
          style={{ top: "20px", right: "30px" }}
        >
          <button
            className={isLoginPage ? "btn fw-bolder" : "purpleButton fw-bolder"}
            onClick={handleRegisterClick}
            style={{ border: "none", width: "90px", padding: "5px" }}
          >
            Register
          </button>
          <button
            className={isLoginPage ? "purpleButton fw-bolder" : "btn fw-bolder"}
            onClick={handleLoginClick}
            style={{ border: "none", width: "90px", padding: "5px" }}
          >
            Log in
          </button>
        </div>

        <div className={`fade-container ${fadeIn ? "fade-in" : "fade-out"}`}>
          {isLoginPage ? <Login /> : <Register />}
        </div>
        <Background>
          <div className="vh-100 position-relative">
            <div>
              <img
                className="position-absolute fade-left"
                src={BackgroundImg1}
                alt=""
                style={{
                  left: "0",
                  top: "0px",
                  width: "clamp(45rem, 90vw, 90rem)",
                }}
              />
            </div>
            <div>
              <img
                className="position-absolute fade-right"
                src={BackgroundImg2}
                alt=""
                style={{
                  right: "0",
                  bottom: "0px",
                  width: "clamp(45rem, 90vw, 90rem)",
                }}
              />
            </div>
          </div>
        </Background>
      </div>
    </>
  );
};

export default LoginRegister;
