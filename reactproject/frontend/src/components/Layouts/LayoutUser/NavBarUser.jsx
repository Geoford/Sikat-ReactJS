import "../style.css";
import Logo from "../../../assets/logo.jpg";
import Notification from "../../../assets/Notification.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "../LayoutUser/OffCanvassNotification";
import UserAccountDropdown from "./UserAccountDropdown";

const NavBarUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const fetchUser = JSON.parse(userData);

      fetch(`http://localhost:8081/fetchUser/user/${fetchUser.userID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <nav
      className="navbar navbar-expand-lg p-0"
      style={{ position: "sticky", top: "0" }}
    >
      <div className="container-fluid py-2 px-3 shadow">
        <div className="logo">
          <Link to="/Home">
            <img className="logoImage" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div>
            <NotificationButton />
          </div>
          <div>
            <UserAccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarUser;
