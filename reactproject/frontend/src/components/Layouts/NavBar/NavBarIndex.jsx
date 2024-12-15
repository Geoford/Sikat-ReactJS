import "../style.css";
import Logo from "../../../assets/logo.jpg";
import TextLogo from "../../../assets/TextLogo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBarIndex = () => {
  return (
    <nav
      class="navbar navbar-expand-lg p-0 position-sticky"
      style={{ top: "0" }}
    >
      <div class="container-fluid py-2 px-3 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <div className="logo">
            <Link to={"/"}>
              <img className="logoImage" src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="TextLogo d-flex align-items-center">
            <Link to={"/"}>
              <img src={TextLogo} alt="" style={{ height: "2.5rem" }} />
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-4 text-light">
            <p className="m-0">Home</p>
            <p className="m-0">Contacts</p>
            <p className="m-0">About</p>
          </div>
          <Link to="/Login">
            <button className="orangeButton px-4 py-1">
              <p className="m-0 text-dark fw-bold">Log in</p>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarIndex;
