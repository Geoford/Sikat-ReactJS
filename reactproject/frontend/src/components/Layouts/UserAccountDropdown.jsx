import Dropdown from "react-bootstrap/Dropdown";
import DefaultProfile from "../../assets/userDefaultProfile.png";
import DropDownButton from "../../assets/DropDown.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserAccountDropdown = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <Dropdown>
      <div>
        <Dropdown.Toggle
          as="button"
          className="logo position-relative custom-button d-flex align-items-center justify-content-center overflow-visible"
          id="UserAccountDropdown"
          bsPrefix="custom-toggle"
        >
          <div
            className="position-absolute rounded-circle d-flex justify-content-center align-items-center p-0"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              right: "-3px",
              bottom: "-1px",
              border: "2px solid #990099",
            }}
          >
            <img
              className="mt-1"
              src={DropDownButton}
              alt=""
              style={{ width: "60%", height: "60%" }}
            />
          </div>
          <img className="icon ms-1" src={DefaultProfile} alt="User Profile" />
        </Dropdown.Toggle>
      </div>

      <Dropdown.Menu className="text-end mt-2 px-2">
        {user && (
          <Dropdown.Item className="w-100 btn text-end p-0">
            <Link
              className="text-decoration-none text-dark"
              to="/UpdateUser/${user.userID}"
            >
              <button className="w-100 btn btn-light text-end">
                Account Settings
              </button>
            </Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <Link
            className="text-decoration-none text-dark"
            to="/UpdateUser/${user.userID}"
          >
            <button className="w-100 btn btn-light text-end">
              Diary Entries
            </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <button
            className="w-100 btn btn-light text-end"
            onClick={handleLogout}
          >
            Log out
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserAccountDropdown;
