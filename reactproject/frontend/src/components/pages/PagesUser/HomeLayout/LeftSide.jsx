import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
import DefaultProfile from "../../../../assets/userDefaultProfile.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Center = () => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/Login");
    }
  }, [navigate]);

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
      } else {
        console.error("Response data is not an array", response.data);
        setEntries([]);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      setError("There was an issue loading your entries.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
                  width: "10vw",
                  height: "10vw",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={DefaultProfile} // Conditional rendering
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
          <p className="m-0 mt-1 text-light fs-5">{user.username}</p>
        </div>
      </Link>

      <div className="bg-light rounded border border-secondary-subtle shadow-sm p-3 mt-3">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Journal Entries</h4>
          </div>
        </div>
        <div
          className="mt-2 pe-1"
          style={{ height: "43vh", overflowY: "scroll" }}
        >
          {error ? (
            <p>{error}</p> // Error message rendering
          ) : entries.length === 0 ? (
            <p>No entries available.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.entryID}
                className="journalEntries d-flex align-items-start flex-column rounded ps-2 pt-1 mt-2"
              >
                <h5>{entry.title}</h5>
                <p className="text-start">{entry.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Center;
