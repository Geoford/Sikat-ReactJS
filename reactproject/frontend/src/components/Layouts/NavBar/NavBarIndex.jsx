import "../style.css";
import Logo from "../../../assets/logo.jpg";
import TextLogo from "../../../assets/TextLogo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBarIndex = ({ onNavigate, refs }) => {
  const { Home, Events, MissionVision, About, Contacts } = refs;
  return (
    <nav
      class="navbar navbar-expand-lg p-0 position-sticky"
      style={{ top: "0" }}
    >
      <div class="container-fluid d-flex flex-column flex-md-row gap-2 py-2 px-3 shadow-sm">
        <div className="w-100 d-flex justify-content-md-start align-items-center gap-2">
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
        <div className="w-100 d-flex justify-content-center justify-content-lg-end align-items-center gap-4 py-2 py-md-1 py-lg-0">
          <div className="d-flex align-items-center gap-2 text-light">
            <p
              className="navText m-0 d-none d-sm-block"
              onClick={() => onNavigate(Home)}
            >
              Home
            </p>
            <p className="navText m-0" onClick={() => onNavigate(Events)}>
              Events/Announcements
            </p>
            <p
              className="navText m-0 d-none d-md-block"
              onClick={() => onNavigate(MissionVision)}
            >
              Mission/Vision
            </p>
            <p className="navText m-0" onClick={() => onNavigate(About)}>
              About
            </p>
            <p className="navText m-0" onClick={() => onNavigate(Contacts)}>
              Contacts
            </p>
          </div>

          <Link
            className="d-none d-lg-block"
            to="/Login"
            style={{ minWidth: "6rem" }}
          >
            <button className="w-100 orangeButton px-4 py-1">
              <p className="m-0 text-dark fw-bold">Log in</p>
            </button>
          </Link>

          <Link
            className="position-absolute d-block d-lg-none"
            to="/Login"
            style={{ right: "1rem", top: "1rem" }}
          >
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
