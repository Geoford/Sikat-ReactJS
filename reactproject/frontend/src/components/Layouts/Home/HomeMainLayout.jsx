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
    <MainLayout>
      <div className="row mt-3 px-3">
        <div>{isAdminPage ? <AdminChatButton /> : <ChatButton />}</div>
        <div
          className="col-lg d-none d-lg-block"
          style={{ position: "sticky", top: "75px", height: "100%" }}
        >
          {isAdminPage ? <AdminLeftSide /> : <LeftSide />}
        </div>
        <div className="col-lg-6">
          {isAdminPage ? <AdminCenter /> : <Center />}
        </div>
        <div
          className="col-lg d-none d-lg-block"
          style={{ position: "sticky", top: "75px", height: "100%" }}
        >
          {isAdminPage ? <AdminRightSide /> : <RightSide />}
        </div>
      </div>
    </MainLayout>
  );
}
