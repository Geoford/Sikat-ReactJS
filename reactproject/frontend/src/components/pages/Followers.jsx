import React, { useState, useEffect } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../Layouts/MainLayout";
import DefaultProfile from "../../assets/userDefaultProfile.png";
import { Link, useNavigate } from "react-router-dom";

const UserList = ({ type, users, handleFollowToggle, isFollowing }) => (
  <div
    className="custom-scrollbar mt-2 pe-1"
    style={{ height: "70vh", overflowY: "scroll" }}
  >
    {users.length === 0 ? (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <p className="m-0 text-secondary">No {type}</p>
      </div>
    ) : (
      users.map((user) => (
        <div key={user.userID} className="pb-2 pe-2 mb-2">
          <div className="position-relative d-flex align-items-center justify-content-between gap-2">
            <Link
              to={`/Profile/${user.userID}`}
              className="linkText rounded d-flex justify-content-between w-100 p-2"
            >
              <div className="d-flex align-items-center">
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
                <p className="m-0 ms-2">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </Link>
            <button
              className="primaryButton position-absolute"
              onClick={() => handleFollowToggle(user.userID)}
              style={{ right: "0" }}
            >
              <p className="m-0">
                {isFollowing(user.userID) ? "Unfollow" : "Follow"}
              </p>
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

const Followers = () => {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchFollowers(parsedUser.userID);
      fetchFollowedUsers(parsedUser.userID);
    } else {
      navigate("/");
    }
  }, [navigate]);

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
      const followedUsersData = response.data;
      setFollowedUsers(followedUsersData);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsersData));
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const handleFollowToggle = async (followUserId) => {
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
          `Are you sure you want to unfollow this user?`
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
        alert("You have unfollowed the user.");
      } else {
        const response = await axios.post(
          `http://localhost:8081/follow/${followUserId}`,
          {
            followerId: user.userID,
          }
        );
        const followedUserData = response.data;

        setFollowedUsers((prev) => [...prev, followedUserData]);
        alert("You are now following the user.");
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      alert("There was an error processing your request.");
    }
  };

  if (!user) return null;

  return (
    <MainLayout ActiveTab="Followers">
      <div
        className="container mt-5 mt-lg-4 rounded p-3 shadow-sm"
        style={{
          width: "clamp(19rem, 65dvw, 40rem)",
          height: "clamp(30rem, 65dvw, 39rem)",
          backgroundColor: "#ffff",
        }}
      >
        <Tabs
          defaultActiveKey="Followers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Followers" title="Followers">
            <div>
              <UserList
                type={"Followers"}
                users={followers}
                handleFollowToggle={handleFollowToggle}
                isFollowing={(id) => followedUsers.some((f) => f.userID === id)}
              />
            </div>
          </Tab>
          <Tab eventKey="Following" title="Following">
            <div>
              <UserList
                type={"Following"}
                users={followedUsers}
                handleFollowToggle={handleFollowToggle}
                isFollowing={() => true}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Followers;
