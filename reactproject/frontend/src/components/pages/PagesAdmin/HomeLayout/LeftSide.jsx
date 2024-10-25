import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
import DefaultProfile from "../../../../assets/userDefaultProfile.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LeftSideLoader } from "../../../loaders/LeftSideLoader";
import axios from "axios";

const LeftSideAdmin = () => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
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
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/fetchUserEntry/user/${user.userID}`
      );
      if (response.data.entries && Array.isArray(response.data.entries)) {
        setEntries(response.data.entries);

        response.data.entries.forEach((entry) => {});
      } else {
        console.error("Response data is not an array", response.data);
        setEntries([]);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      setError("No entry.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <LeftSideLoader />;
  }

  if (!user) return null;

  return (
    <div className="p-2">
      <Link
        className="text-decoration-none text-dark"
        to={`/UserProfile/${user.userID}`}
      >
        <div className="mainProfilePicture d-flex align-items-center flex-column rounded gap-2 shadow py-3">
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "#ffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "21vh",
                  height: "21vh",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    user && user.profile_image
                      ? `http://localhost:8081${user.profile_image}`
                      : DefaultProfile
                  }
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <p className="m-0 mt-1 text-light fs-5">{user.firstName}</p>
        </div>
      </Link>

      <div className=" mt-3">
        <div className="d-flex justify-content-between border-bottom border-secondary-subtle">
          <div className="d-flex align-items-center text-secondary gap-1">
            <i class="bx bx-edit bx-sm"></i>
            <h4 className="m-0 ">Latest Post</h4>
          </div>
          <div>
            <Link
              to="/DiaryEntries"
              className="linkText rounded"
              style={{ cursor: "pointer" }}
            >
              View All
            </Link>
          </div>
        </div>
        <div
          className="mt-1 pe-1 custom-scrollbar"
          style={{ height: "45vh", overflowY: "scroll" }}
        >
          {error ? (
            <p>{error}</p> // Error message rendering
          ) : entries.length === 0 ? (
            <p>No entries available.</p>
          ) : (
            entries.map((entry) => (
              <Link
                key={entry.entryID} // Add key prop here
                to={`/DiaryEntry/${entry.entryID}`}
                className="rounded text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 mt-1">
                  <h6 className="m-0 p-2 text-start text-secondary">
                    {entry.title} - {formatDate(entry.created_at)}
                  </h6>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideAdmin;
