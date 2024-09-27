import "../style.css";
import Logo from "../../../assets/logo.jpg";
import Notification from "../../../assets/Notification.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "../LayoutUser/OffCanvassNotification";
import UserAccountDropdown from "./UserAccountDropdown";

const NavBarUser = () => {
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
