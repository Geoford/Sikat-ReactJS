import LeftSide from "../../pages/PagesAdmin/HomeLayout/LeftSide";
import Center from "../../pages/PagesAdmin/HomeLayout/Center";
import RightSide from "../../pages/PagesAdmin/HomeLayout/RightSide";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPageMainLayout from "../../Layouts/LayoutAdmin/UserPageMainLayout";
import ChatButton from "../../Layouts/LayoutAdmin/ChatButton";
import "boxicons/css/boxicons.min.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <UserPageMainLayout>
      <div className="row mt-3 px-3">
        <div>
          <ChatButton />
        </div>
        <div
          className="col-lg-3 d-none d-lg-block"
          style={{
            position: "sticky",
            top: "75px",
            height: "100%",
            // zIndex: "1",
          }}
        >
          <LeftSide />
        </div>
        <div className="col-lg-6">
          <Center />
        </div>
        <div
          className="col-lg-3 d-none d-lg-block"
          style={{
            position: "sticky",
            top: "75px",
            height: "100%",
            // zIndex: "-1",
          }}
        >
          <RightSide />
        </div>
      </div>
    </UserPageMainLayout>
  );
}
