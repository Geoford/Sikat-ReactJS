import Dropdown from "react-bootstrap/Dropdown";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import DropDownButton from "../../../assets/DropDown.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserAccountDropdown = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
          <img
            className="icon "
            src={
              user && user.profile_image
                ? `http://localhost:8081${user.profile_image}`
                : DefaultProfile
            }
            alt="User Profile"
          />
        </Dropdown.Toggle>
      </div>

      <Dropdown.Menu className="text-end mt-2 px-2">
        {user && (
          <Dropdown.Item className="w-100 btn text-end p-0">
            <Link
              className="text-decoration-none text-dark"
              to={`/UserProfile/${user.userID}`}
            >
              <button className="w-100 btn btn-light text-end">Account</button>
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
