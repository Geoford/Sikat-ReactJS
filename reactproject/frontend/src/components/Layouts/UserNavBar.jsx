import "./style.css";
import Logo from "../../assets/logo.jpg";
import Notification from "../../assets/Notification.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "./OffCanvassNotification";

const UserNavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid py-2 px-3">
        <div className="logo">
          <Link to="/Home">
            <img className="logoImage" src={Logo} />
          </Link>
        </div>
        <div className="d-flex align-items-center gap-1">
          <div>
            <NotificationButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
