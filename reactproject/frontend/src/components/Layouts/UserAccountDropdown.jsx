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
      <Dropdown.Toggle
        as="button"
        className="logo custom-button d-flex align-items-center justify-content-center"
        id="UserAccountDropdown"
      >
        <img className="icon ms-3" src={DefaultProfile} alt="User Profile" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="text-end mt-2">
        {user && (
          <Dropdown.Item
            as={Link}
            to={`/UpdateUser/${user.userID}`}
            className="w-100 btn btn-light text-end"
          >
            Account Settings
          </Dropdown.Item>
        )}
        <Dropdown.Item
          as="button"
          className="w-100 btn btn-light text-end"
          onClick={() => navigate("/DiaryEntries")}
        >
          Diary Entries
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className="w-100 btn btn-light text-end"
          onClick={handleLogout}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserAccountDropdown;
