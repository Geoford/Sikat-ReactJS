import Dropdown from "react-bootstrap/Dropdown";
import DefaultProfile from "../../assets/userDefaultProfile.png";
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
      <button className="logo custom-button d-flex align-items-center justify-content-center">
        <img className="icon ms-1" src={DefaultProfile} alt="User Profile" />
        <Dropdown.Toggle
          id="UserAccountDropdown"
          className="noDisplay"
        ></Dropdown.Toggle>
      </button>

      <Dropdown.Menu className="text-end mt-2">
        {user && (
          <Dropdown.Item className="p-0 px-2 bg-transparent">
            <div>
              <Link
                to={`/UpdateUser/${user.id}`}
                className="w-100 btn btn-light text-end"
              >
                Account Settings
              </Link>
            </div>
          </Dropdown.Item>
        )}
        <Dropdown.Item className="p-0 px-2 bg-transparent">
          <div>
            <button className="w-100 btn btn-light text-end">
              Diary Entries
            </button>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className="p-0 px-2 bg-transparent">
          <div>
            <button
              onClick={handleLogout}
              className="w-100 btn btn-light text-end"
            >
              Logout
            </button>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserAccountDropdown;
