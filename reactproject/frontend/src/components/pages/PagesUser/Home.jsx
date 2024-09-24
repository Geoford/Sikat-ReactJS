import UserNavBar from "../../Layouts/LayoutUser/NavBarUser";
import Background from "../../Layouts/Background";
import LeftSide from "../../pages/PagesUser/HomeLayout/LeftSide";
import Center from "../../pages/PagesUser/HomeLayout/Center";
import RightSide from "../../pages/PagesUser/HomeLayout/RightSide";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <UserNavBar />
      <div className="row mt-3 px-3">
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
      <Background />
    </div>
  );
}
