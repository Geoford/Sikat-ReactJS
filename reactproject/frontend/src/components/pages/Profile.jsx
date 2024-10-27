import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/userDefaultProfile.png";
import MainLayout from "../Layouts/MainLayout";
import OthersJournalEntries from "./PagesUser/UserProfileLayout/OthersJournalEntries";
import OtherProfileDiary from "./PagesUser/UserProfileLayout/OtherProfileDiary";
import ProfileDropdown from "../Layouts/LayoutUser/ProfileDropdown";
import OthersProfileDropdown from "../Layouts/LayoutUser/OthersProfileDropdown";
import DiaryEntryLayout from "../Layouts/Home/DiaryEntryLayout";
import axios from "axios";

const Profile = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State to manage file
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [entries, setEntries] = useState([]); // State to store diary entries
  const [followedUsers, setFollowedUsers] = useState([]); // State for followed users
  const [filters, setFilters] = useState([]); // State for filters
  const [expandButtons, setExpandButtons] = useState({}); // State to track expanded entries
  const [isLoading, setIsLoading] = useState(false); // Loading state for entries

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
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

    fetchUserData();
  }, [userID, navigate]);

  useEffect(() => {
    if (user) {
      fetchFollowedUsers(user.userID);
      fetchEntries(user.userID, filters);
    }
  }, [user, filters]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      uploadProfile(selectedFile);
    }
  };

  const uploadProfile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", user.userID);

    axios
      .post("http://localhost:8081/uploadProfile", formData)
      .then((res) => {
        console.log("Profile uploaded successfully", res.data);
        alert("Profile uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading profile:", error);
      });
  };

  const fetchFollowedUsers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followedUsers/${userID}`
      );
      const followedUsersData = response.data.map((user) => user.userID);
      setFollowedUsers(followedUsersData);
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const fetchEntries = async (userID, filters) => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/entries", {
        params: { userID, filters },
      });

      const gadifyStatusResponse = await axios.get(
        `http://localhost:8081/gadifyStatus/${userID}`
      );

      const updatedEntries = response.data.map((entry) => {
        const isGadified = gadifyStatusResponse.data.some(
          (g) => g.entryID === entry.entryID
        );
        return { ...entry, isGadified };
      });

      setEntries(updatedEntries);
    } catch (error) {
      console.error("There was an error fetching the diary entries!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (selectedFiltersArray) => {
    const activeFilters = selectedFiltersArray.filter((filter) =>
      ["Sexual Harassment", "Domestic Abuse", "Gender Related"].includes(filter)
    );
    setFilters(activeFilters);
  };

  const handleGadify = (entryID) => {
    if (!user) return;

    const entry = entries.find((entry) => entry.entryID === entryID);
    if (!entry) return;

    axios
      .post(`http://localhost:8081/entry/${entryID}/gadify`, {
        userID: user.userID,
      })
      .then((res) => {
        const isGadified =
          res.data.message === "Gadify action recorded successfully";

        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.entryID === entryID
              ? {
                  ...entry,
                  gadifyCount: isGadified
                    ? entry.gadifyCount + 1
                    : entry.gadifyCount - 1,
                }
              : entry
          )
        );
      })
      .catch((err) => console.error("Error updating gadify count:", err));
  };

  const handleFollowToggle = async (followUserId) => {
    if (!followUserId) return;

    const isFollowing = followedUsers.includes(followUserId);

    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:8081/unfollow/${followUserId}`, {
          data: { followerId: user.userID },
        });
        setFollowedUsers((prev) => prev.filter((id) => id !== followUserId));
      } else {
        await axios.post(`http://localhost:8081/follow/${followUserId}`, {
          followerId: user.userID,
        });
        setFollowedUsers((prev) => [...prev, followUserId]);
      }
      await fetchFollowedUsers(user.userID);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const handleClick = (entryID) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.entryID === entryID
          ? { ...entry, isGadified: !entry.isGadified }
          : entry
      )
    );

    const updatedExpandButtons = { ...expandButtons, [entryID]: true };
    setExpandButtons(updatedExpandButtons);

    setTimeout(() => {
      updatedExpandButtons[entryID] = false;
      setExpandButtons({ ...updatedExpandButtons });
    }, 300);

    handleGadify(entryID);
  };

  const formatDate = (dateString) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const timeDiff = now - entryDate;

    if (timeDiff < 24 * 60 * 60 * 1000) {
      return entryDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return entryDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const ownProfile = currentUser.userID == userID;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <MainLayout>
      <div
        className="container d-flex rounded shadow-sm mt-4 py-4 px-4"
        style={{ background: "#ffff" }}
      >
        <div className="w-100 row m-0 py-3">
          <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
            <div
              style={{
                position: "relative",
                backgroundColor: "#ffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
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
                  borderRadius: "50%",
                }}
              />
              {ownProfile && (
                <label
                  htmlFor="uploadProfile"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="grayHover  d-flex align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      border: "3px solid #ffff",
                      right: "15px",
                      bottom: "15px",
                    }}
                  >
                    <i
                      className={isHovered ? "bx bxs-camera" : "bx bx-camera"}
                      style={{ color: "var(--primary)", fontSize: "2rem" }}
                    ></i>
                    <input
                      type="file"
                      id="uploadProfile"
                      hidden
                      onChange={handleFileChange}
                    />
                  </div>
                </label>
              )}
            </div>
          </div>
          <div className="col-md d-flex align-items-end justify-content-between flex-column text-dark text-center text-md-start">
            <div
              className="w-100 position-relative rounded border-bottom p-4"
              style={{ height: "80%" }}
            >
              <h3 className="m-0">
                {user.firstName} {user.lastName} ({user.alias || "No Alias"})
              </h3>
              <p className="m-0 text-secondary">
                {user.followersCount} Followers - {user.followingCount}{" "}
                Following
              </p>
              <p className="mt-3">{user.bio || "No bio available."}</p>
            </div>
            <div>
              {ownProfile ? <ProfileDropdown /> : <OthersProfileDropdown />}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4 mb-2 p-0 px-md-2">
            <div
              className="position-sticky d-flex flex-column gap-2"
              style={{ minHeight: "37vh", top: "70px" }}
            >
              <OthersJournalEntries userID={userID} />
            </div>
          </div>

          <div className="col p-0 px-md-2">
            <div style={{ minHeight: "60vh" }}>
              {entries.map((entry) => (
                <DiaryEntryLayout
                  key={entry.entryID}
                  entry={entry}
                  user={user}
                  followedUsers={followedUsers}
                  handleFollowToggle={handleFollowToggle}
                  handleClick={handleClick}
                  expandButtons={expandButtons}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
