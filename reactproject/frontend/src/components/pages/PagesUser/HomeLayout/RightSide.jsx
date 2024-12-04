import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfile from "../../../../../src/assets/userDefaultProfile.png";
import HomeDiaryDropdown from "../../../Layouts/LayoutUser/HomeDiaryDropdown";
import SampleImage from "../../../../assets/Background.jpg";

const UserList = ({ users, handleFollowToggle, isFollowing }) => (
  <div
    className="custom-scrollbar mt-2"
    style={{ height: "clamp(5rem, 12dvw, 25rem)", overflowY: "scroll" }}
  >
    {users.map((user) => (
      <div key={user.userID} className="pb-2 pe-1 mb-2">
        <div className="w-100 d-flex align-items-center justify-content-between gap-2">
          <Link
            to={`/Profile/${user.userID}`}
            className="linkText position-relative rounded d-flex w-100 p-2"
          >
            <div className="row d-flex align-items-center">
              <div className="col-3">
                <div className="profilePicture">
                  <img
                    src={
                      user.profile_image
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
              <div className="col ps-0 ps-xl-2">
                <div className="overflow-hidden followerName" style={{}}>
                  <p className="m-0 ms-2 text-start text-nowrap">
                    {user.isAdmin === 1
                      ? "Gender and Development"
                      : user.firstName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <button
            className="secondaryButton position-absolute"
            onClick={() => handleFollowToggle(user.userID, user.username)}
            style={{ right: "2.5rem" }}
          >
            <p className="m-0">
              {isFollowing(user.userID) ? "Unfollow" : "Follow"}
            </p>
          </button>
        </div>
      </div>
    ))}
  </div>
);

const RightSide = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchFollowers(parsedUser.userID);
      fetchUsers();
      fetchFollowedUsers(parsedUser.userID);
      fetchLatestAnnouncement(); // Fetch the latest announcement
    } else {
      navigate("/");
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

  const fetchFollowers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followers/${userID}`
      );
      setFollowers(response.data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowedUsers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followedUsers/${userID}`
      );
      setFollowedUsers(response.data);
      localStorage.setItem("followedUsers", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const fetchLatestAnnouncement = async () => {
    try {
      const response = await axios.get("http://localhost:8081/announcement");
      setLatestAnnouncement(response.data);
    } catch (error) {
      console.error("Error fetching latest announcement:", error);
    }
  };

  const handleFollowToggle = async (followUserId, targetUsername) => {
    if (!followUserId) {
      console.error("User ID to follow/unfollow is undefined");
      return;
    }

    if (user.userID === followUserId) {
      alert("You cannot follow yourself.");
      return;
    }

    const isFollowing = followedUsers.some((f) => f.userID === followUserId);

    try {
      if (isFollowing) {
        const confirmed = window.confirm(
          `Are you sure you want to unfollow ${targetUsername}?`
        );

        if (!confirmed) {
          return;
        }
        await axios.delete(`http://localhost:8081/unfollow/${followUserId}`, {
          data: { followerId: user.userID },
        });

        setFollowedUsers((prev) =>
          prev.filter((u) => u.userID !== followUserId)
        );
        alert(`You have unfollowed ${targetUsername}`);
      } else {
        const response = await axios.post(
          `http://localhost:8081/follow/${followUserId}`,
          {
            followerId: user.userID,
          }
        );
        setFollowedUsers((prev) => [...prev, response.data]);
        alert(`You are now following ${targetUsername}`);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      alert("There was an error processing your request.");
    }
  };

  if (!user) return null;

  return (
    <div className="p-2 " style={{ height: "87vh" }}>
      <div className="text-end" style={{ fontSize: "15px", color: "gray" }}>
        <p className="m-0 mb-1">
          Are you or someone you know experiencing gender-based violence?
        </p>
        <Link to={"/GetHelp/"}>
          <button className="secondaryButton text-decoration-underline">
            Report an Incident
          </button>
        </Link>
      </div>

      <div className="rounded mb-2 mt-3">
        <div className="d-flex align-items-center justify-content-start gap-1 border-top border-secondary-subtle text-secondary pt-2">
          <i className="bx bx-group bx-sm"></i>
          <h5 className="m-0">Followers</h5>
        </div>

        <UserList
          users={followers}
          handleFollowToggle={handleFollowToggle}
          isFollowing={(id) => followedUsers.some((f) => f.userID === id)}
        />
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-start gap-1 border-top border-secondary-subtle text-secondary pt-2 mb-2">
          <i className="bx bx-news bx-sm"></i>
          <h5 className="m-0">Announcements/Events</h5>
        </div>

        {latestAnnouncement ? (
          <div
            className="overflow-y-scroll custom-scrollbar rounded pe-1"
            style={{ height: "clamp(5rem, 17dvw, 30rem)" }}
          >
            <Link
              to={`/DiaryEntry/${latestAnnouncement.entryID}`}
              className="linkText rounded p-0"
            >
              <p className="m-0 mb-1 text-start">
                {latestAnnouncement.title || "Untitled Announcement"}
              </p>
              <img
                src={
                  latestAnnouncement.diary_image
                    ? `http://localhost:8081${latestAnnouncement.diary_image}`
                    : SampleImage
                }
                alt="Announcement"
                style={{ width: "100%", borderRadius: ".3rem" }}
              />
            </Link>
          </div>
        ) : (
          <p className="text-secondary">No announcements available.</p>
        )}
      </div>
    </div>
  );
};

export default RightSide;
