import "./style.css";
import Logo from "../../assets/logo.jpg";
import Notification from "../../assets/Notification.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "./OffCanvassNotification";

const UserNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg p-0">
      <div className="container-fluid py-2 px-3 shadow">
        <div className="logo">
          <Link to="/Home">
            <img className="logoImage" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-1">
          <div>
            <button onClick={handleLogout} className="btn btn-danger ml-auto">
              Logout
            </button>
          </div>
          <div>
            <NotificationButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
