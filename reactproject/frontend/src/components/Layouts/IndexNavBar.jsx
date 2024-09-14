import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid py-2 px-3">
        <div className="logo"></div>
        <div className="d-flex align-items-center gap-1">
          <Link to="/Register">
            <button className="btn text-light">Sign up</button>
          </Link>
          <Link to="/Login">
            <button className="orangeButton">Log in</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
