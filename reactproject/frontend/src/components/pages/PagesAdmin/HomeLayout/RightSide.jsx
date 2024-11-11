import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfile from "../../../../../src/assets/anonymous.png";

const Center = () => {
  const [user, setUser] = useState(null);
  const [flaggedUsers, setFlaggedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchFlagged();
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchFlagged = async () => {
    try {
      const response = await axios.get("http://localhost:8081/flagged");
      if (response.data.length > 0) {
        setFlaggedUsers(response.data);
      } else {
        console.warn("No flagged reports found in response data.");
      }
    } catch (error) {
      console.error("Error fetching flagged users:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="p-2">
      <div>
        <Link className="btn btn-danger" to="/Admin/GenderBasedIncidents">
          <p className="m-0 text-end">Gender-Based Incidents Complaints 00</p>
        </Link>
      </div>
      <div className="rounded p-3 mb-2">
        <div className="d-flex justify-content-between border-bottom">
          <h4 className="text-secondary">Reported User/s</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div
            className="w-100 custom-scrollbar mt-2 pe-1"
            style={{ height: "25vh", overflowY: "scroll" }}
          >
            {/* WHEN CLICKED IT SHOULD DISPLAY THE COMMENT OF THE REPORTED USER */}
            <Link
              to="/Admin/DiaryEntry"
              className="text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              <div className="linkText d-flex align-items-center gap-2 rounded">
                <div className="profilePicture">
                  <img
                    src={DefaultProfile}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="d-flex flex-column align-items-start">
                  <p className="text-secondary m-0">FullName</p>
                  <p className="text-danger m-0">Violation,Violation</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="d-flex justify-content-between border-bottom">
          <h4 className="text-secondary">Flagged Diaries</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div
            className="w-100 custom-scrollbar mt-2 pe-1"
            style={{ height: "40vh", overflowY: "scroll" }}
          >
            {flaggedUsers.length > 0 ? (
              flaggedUsers.map((flaggedUser) => (
                <Link
                  key={flaggedUser.userID}
                  to="/Admin/DiaryEntry"
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <div className="linkText d-flex align-items-center gap-2 rounded mb-2">
                    <div className="profilePicture">
                      <img
                        src={flaggedUser.profile_image || DefaultProfile}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <p className="text-secondary m-0">
                        {flaggedUser.firstName} {flaggedUser.lastName}
                      </p>
                      <h5 className="text-secondary m-0">
                        {flaggedUser.title}
                      </h5>{" "}
                      {/* Assuming journalTitle is available */}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-secondary">No flagged diaries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
