import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/userDefaultProfile.png";
import MainLayout from "../Layouts/MainLayout";
import JournalEntries from "../Layouts/Profile/JournalEntries";
import DiaryEntryLayout from "../Layouts/Home/DiaryEntryLayout";
import ProfileDropdown from "../Layouts/Profile/ProfileDropdown";
import OthersProfileDropdown from "../Layouts/Profile/OthersProfileDropdown";
import axios from "axios";

const Profile = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [entries, setEntries] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [expandButtons, setExpandButtons] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Error parsing current user:", err);
  }

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
        if (!response.ok) throw new Error("User not found");
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
        setEntries([]);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      setError("No entries available.");
    }
  };

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
                  isGadified: !entry.isGadified, // Toggle gadify status
                }
              : entry
          )
        );
      })
      .catch((err) => console.error("Error updating gadify count:", err));
  };

  const handleClick = (entryID) => {
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

  const ownProfile = currentUser?.userID == userID;

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
                width: "clamp(13rem, 17dvw, 20rem)",
                height: "clamp(13rem, 17dvw, 20rem)",
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
                    className="grayHover d-flex align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      width: "clamp(2.5rem, 10dvw, 3rem)",
                      height: "clamp(2.5rem, 10dvw, 3rem)",
                      border: "3px solid #ffff",
                      right: "clamp(.3rem, 5dvw, -0rem)",
                      bottom: "15px",
                    }}
                  >
                    <i
                      className={isHovered ? "bx bxs-camera" : "bx bx-camera"}
                      style={{
                        color: "var(--primary)",
                        fontSize: "clamp(1.5rem, 5dvw, 1.8rem)",
                      }}
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
          <div className="col-md d-flex align-items-end justify-content-between flex-column text-dark text-center text-lg-start">
            <div
              className="w-100 position-relative rounded border-bottom p-4"
              style={{ height: "80%" }}
            >
              <h3 className="m-0">
                {user.firstName} {user.lastName} ({user.alias || "No Alias"})
              </h3>
              <p className="m-0 mt-1 text-secondary">
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
          <div className="col-lg-4 mb-2 p-0 px-md-1">
            <JournalEntries userID={userID} ownProfile={ownProfile} />
          </div>

          <div className="col-md-8 mb-2 p-0 px-md-1">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <DiaryEntryLayout
                  key={entry.entryID}
                  entry={entry}
                  expandButtons={expandButtons}
                  formatDate={formatDate}
                  followedUsers={followedUsers}
                  handleClick={handleClick}
                  setEntries={setEntries}
                  setFollowedUsers={setFollowedUsers}
                  user={user}
                />
              ))
            ) : (
              <p>No entries to display.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
