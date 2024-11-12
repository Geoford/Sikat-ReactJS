import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexNavBar from "../Layouts/NavBar/NavBarIndex";
import Background from "../Layouts/Background";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../assets/logo.jpg";
import BackgroundImg1 from "../../assets/LogInBackground (1).png";
import BackgroundImg2 from "../../assets/LogInBackground (2).png";
import TextLogo from "../../assets/TextLogo.png";
import TransparentLogo from "../../assets/TransparentLogo.png";
import sampleImage from "../../assets/Background.jpg";
import { PreLoader } from "./PreLoader";

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
    <>
      <PreLoader></PreLoader>

      <div className="">
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center gap-2">
          <div
            className="p-3 rounded shadow"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <div className="position-relative">
              <img src={TransparentLogo} alt="" style={{ width: "12vw" }} />
              <img src={TextLogo} alt="" style={{ width: "25vw" }} />
              <div className="" style={{ right: "0", top: "0" }}>
                <Link to="/Login">
                  <button className="w-100 orangeButton text-dark px-5 py-2">
                    <h5 className="m-0">Log In</h5>
                  </button>
                </Link>
              </div>
            </div>

            <div className="d-flex gap-2 mt-2">
              <div className="d-flex flex-column gap-2">
                <div
                  className="border border-secondary rounded bg-light p-2"
                  style={{ width: "20vw", height: "20vh" }}
                >
                  <h5
                    className="rounded py-1"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    Mision
                  </h5>
                  <p>
                    A gender responsive educational institution where
                    stakeholders enjoy equal responsibilities and opportunities.
                  </p>
                </div>
                <div
                  className="border border-secondary rounded bg-light p-2"
                  style={{ width: "20vw", minHeight: "20vh" }}
                >
                  <h5
                    className="rounded py-1"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    Vision
                  </h5>

                  <p>
                    CvSU–GAD Resource Center shall integrate and advocate gender
                    equity and equality principles and perspectives in providing
                    instruction, research and extension services.
                  </p>
                </div>
              </div>

              <div
                className="position-relative rounded overflow-hidden bg-light"
                style={{ width: "30vw" }}
              >
                <div
                  className="w-100 position-absolute d-flex align-items-end justify-content-center"
                  style={{
                    background:
                      "linear-gradient(to top, rgb(38, 38, 38,.8), rgb(38, 38, 38,.0))",
                    bottom: "0",
                    height: "7rem",
                  }}
                >
                  <h5 className="text-light">Latest Announcement</h5>
                </div>
                <img
                  src={sampleImage}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Background>
          <div className="vh-100 position-relative">
            <div>
              <img
                className="position-absolute"
                src={BackgroundImg1}
                alt=""
                style={{ left: "0", top: "0px" }}
              />
            </div>
            <div>
              <img
                className="position-absolute"
                src={BackgroundImg2}
                alt=""
                style={{ right: "0", bottom: "0px" }}
              />
            </div>
          </div>
        </Background>
      </div>
    </>
  );
};

export default IndexPage;
