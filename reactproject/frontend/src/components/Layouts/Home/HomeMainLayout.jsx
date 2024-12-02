import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftSide from "../../pages/PagesUser/HomeLayout/LeftSide";
import Center from "../../pages/PagesUser/HomeLayout/Center";
import RightSide from "../../pages/PagesUser/HomeLayout/RightSide";

import AdminLeftSide from "../../pages/PagesAdmin/HomeLayout/LeftSide";
import AdminCenter from "../../pages/PagesAdmin/HomeLayout/Center";
import AdminRightSide from "../../pages/PagesAdmin/HomeLayout/RightSide";

import MainLayout from "../MainLayout";
import ChatButton from "../LayoutUser/ChatButton";
import AdminChatButton from "../LayoutAdmin/ChatButton";
import CenterLayout from "./CenterLayout";
import LeftSideLayout from "./LeftSideLayout";

import { InactivityContext } from "../../../components/InactivityContext";
import axios from "axios";

export default function HomeMainLayout({ isAdminPage }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { isInactive } = useContext(InactivityContext);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (isInactive && user) {
      alert("You have been logged out due to inactivity.");
      axios
        .post("http://localhost:8081/logout", {
          userID: user.userID,
        })
        .then(() => {
          localStorage.removeItem("user");
          navigate("/Login");
        })
        .catch((error) => {
          console.error("Error logging out due to inactivity:", error);
        });
    }
  }, [isInactive, navigate, user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <MainLayout ActiveTab="Home">
      <div className="overflow-x-hidden">
        <div className="row mt-3 px-3">
          <div>{isAdminPage ? <AdminChatButton /> : <ChatButton />}</div>

          {/* Left Side Component */}
          <div
            className="position-fixed col-md d-none d-lg-block"
            style={{
              top: "5.5rem",
              height: "calc(100dvh - 5.5rem)",
              left: "0",
              width: "25%",
            }}
          >
            <LeftSideLayout />
          </div>

          {/* Center Layout */}
          <div
            className="col-lg-6 mx-auto p-0 px-lg-2 mt-2 mt-lg-0"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row">
              <div className="col-4 d-block d-none d-md-block d-lg-none">
                <div
                  className="position-fixed ps-1"
                  style={{
                    top: "7.8rem",
                    height: "calc(100dvh - 5.5rem)",
                    left: "0",
                    width: "33%",
                  }}
                >
                  <LeftSideLayout />
                </div>
              </div>
              <div className="col me-0 me-md-2 me-lg-0">
                <CenterLayout />
              </div>
            </div>
          </div>

          {/* Right Side Component */}
          <div
            className="position-fixed col-md d-none d-lg-block"
            style={{
              top: "5.5rem",
              height: "calc(100dvh - 5.5rem)",
              right: "0",
              width: "25%",
            }}
          >
            {isAdminPage ? <AdminRightSide /> : <RightSide />}
          </div>
        </div>
      </div>
      {/* <div>
        {isInactive
          ? "You have been logged out due to inactivity"
          : "You are active"}
      </div> */}
    </MainLayout>
  );
}
