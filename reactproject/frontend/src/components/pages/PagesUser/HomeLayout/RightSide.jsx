import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Center = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      fetchUsers();
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="p-2">
      <div className="bg-light rounded border border-bg-secondary-subtle shadow-sm p-3 mb-2">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Followers</h4>
          </div>
          <div>
            <p className="orangerText" style={{ cursor: "pointer" }}>
              View All
            </p>
          </div>
        </div>
        <div
          className="mt-2 pe-1"
          style={{ height: "200px", overflowY: "scroll" }}
        >
          {users.map((user) => (
            <div
              key={user.userID}
              className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 pe-2 mb-2"
            >
              <div className="d-flex align-items-center gap-2">
                <div className="profilePicture"></div>
                <p className="m-0 ms-2">{user.username}</p>
              </div>
              <div>
                <button className="orangeButton">Follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light rounded border border-bg-secondary-subtle shadow-sm p-3">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Friends</h4>
          </div>
          <div>
            <p className="orangerText" style={{ cursor: "pointer" }}>
              View All
            </p>
          </div>
        </div>
        <div
          className="mt-2 pe-1"
          style={{ height: "260px", overflowY: "scroll" }}
        >
          {/* Example placeholders for friends */}
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2"
            >
              <div className="profilePicture"></div>
              <p className="m-0">UserName : Dummy</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Center;
