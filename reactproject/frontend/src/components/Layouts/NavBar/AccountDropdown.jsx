import Dropdown from "react-bootstrap/Dropdown";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import DropDownButton from "../../../assets/DropDown.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8081/fetchUser/user/${userID}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      fetchUserData(parsedUser.userID);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading)
    return (
      <div>
        <Dropdown.Toggle
          as="button"
          className="logo position-relative custom-button d-flex align-items-center justify-content-center overflow-visible p-0"
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
              border: "2px solid var(--primary)",
            }}
          >
            <img
              className="mt-1"
              src={DropDownButton}
              alt=""
              style={{ width: "60%", height: "60%" }}
            />
          </div>
          <div
            className="overflow-hidden rounded-circle"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              className=" "
              src={DefaultProfile}
              alt="User Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Dropdown.Toggle>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  if (!user) return null;
  return (
    <Dropdown>
      <div>
        <Dropdown.Toggle
          as="button"
          className="logo position-relative custom-button d-flex align-items-center justify-content-center overflow-visible p-0"
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
              border: "2px solid var(--primary)",
            }}
          >
            <img
              className="mt-1"
              src={DropDownButton}
              alt=""
              style={{ width: "60%", height: "60%" }}
            />
          </div>
          <div
            className="overflow-hidden rounded-circle"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              className=" "
              src={
                user && user.profile_image
                  ? `http://localhost:8081${user.profile_image}`
                  : DefaultProfile
              }
              alt="User Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Dropdown.Toggle>
      </div>

      <Dropdown.Menu className="text-end mt-2 px-2">
        {user && (
          <Dropdown.Item className="w-100 btn text-end p-0">
            <Link
              className="text-decoration-none text-dark"
              to={`/Profile/${user.userID}`}
            >
              <button className="w-100 btn btn-light d-flex align-items-center justify-content-end gap-2">
                {user && user.isAdmin ? (
                  <p className="m-0">Admin Account</p>
                ) : (
                  <p className="m-0">Account</p>
                )}
                <i class="bx bx-user"></i>
              </button>
            </Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <Link className="text-decoration-none text-dark" to="/DiaryEntries">
            <button className="w-100 btn btn-light d-flex align-items-center justify-content-end gap-2">
              Diary Entries
              <i class="bx bx-edit"></i>
            </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <Link
            className="text-decoration-none text-dark"
            to="/Admin/Analytics"
          >
            <button className="w-100 btn btn-light d-flex align-items-center justify-content-end gap-2">
              Analytics
              <i class="bx bx-chart"></i>
            </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <Link
            className="text-decoration-none text-dark"
            to={`/Settings/${user.userID}`}
          >
            <button className="w-100 btn btn-light text-end d-flex align-items-center justify-content-end gap-2">
              Settings <i class="bx bx-cog"></i>
            </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdownItem w-100 btn text-end p-0">
          <button
            className="w-100 btn btn-light text-end d-flex align-items-center justify-content-end gap-2"
            onClick={handleLogout}
          >
            Log out <i class="bx bx-log-in"></i>
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountDropdown;
