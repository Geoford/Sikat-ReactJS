import { useState, useEffect } from "react";
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

export default function HomeMainLayout({ isAdminPage }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading state for user data
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/"); // use react-router navigation for redirect
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>; // simple loading indicator

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
            <LeftSideLayout></LeftSideLayout>
          </div>

          {/* Center Layout - Adjust the margin to prevent overlap */}
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
                  {/* {isAdminPage ? <AdminLeftSide /> : <LeftSide />} */}
                  <LeftSideLayout></LeftSideLayout>
                </div>
              </div>
              <div className="col">
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
    </MainLayout>
  );
}
