import LeftSide from "../../pages/PagesUser/HomeLayout/LeftSide";
import Center from "../../pages/PagesUser/HomeLayout/Center";
import RightSide from "../../pages/PagesUser/HomeLayout/RightSide";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";
import ChatButton from "../../Layouts/LayoutUser/ChatButton";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <UserPageMainLayout>
      <div className="row mt-3 px-3">
        <div>
          <ChatButton />
        </div>
        <div
          className="col-md"
          style={{
            position: "sticky",
            top: "75px",
            height: "100%",
            // zIndex: "1",
          }}
        >
          <LeftSide />
        </div>
        <div className="col-md-6">
          <Center />
        </div>
        <div
          className="col-md"
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
