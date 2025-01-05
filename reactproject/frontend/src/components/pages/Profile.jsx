import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/userDefaultProfile.png";
import MainLayout from "../Layouts/MainLayout";
import JournalEntries from "../Layouts/Profile/JournalEntries";
import DiaryEntryLayout from "../Layouts/Profile/DiaryEntryLayout";
import ProfileDropdown from "../Layouts/Profile/ProfileDropdown";
import OthersProfileDropdown from "../Layouts/Profile/OthersProfileDropdown";
import axios from "axios";
// import { Accordion } from "react-bootstrap";
import FlaggedDiaries from "../Layouts/Profile/FlaggedDiaries";
import ReportedComments from "../Layouts/Profile/ReportedComments";
import Followers from "../Layouts/Profile/Followers";
import { SuspensionModal } from "../Layouts/Profile/SuspensionModal";
// import Suspended from "../../components/pages/PagesUser/Suspended";

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

        console.log("User data:", data);
        // if (data.isSuspended === 1) {
        //   navigate("/suspended");
        //   return;
        // }
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
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        alert("File size exceeds the 2MB limit. Please select a smaller file.");
        setFile(null);
      } else {
        setFile(selectedFile);

        uploadProfile(selectedFile);
      }
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading profile:", error);
      });
  };

  const fetchFollowedUsers = async () => {
    try {
      if (!currentUser || !currentUser.userID) {
        console.error("Current user or userID is not available");
        return;
      }
      const response = await axios.get(
        `http://localhost:8081/followedUsers/${currentUser.userID}`
      );
      const followedUsersData = response.data.map((user) => user.userID);
      setFollowedUsers(followedUsersData);
      console.log("Followed Users:", followedUsersData);
    } catch (error) {
      console.error("Error fetching followed users:", error);
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

  const handleFollowToggle = async (followUserId) => {
    if (!followUserId) {
      console.error("User ID to follow/unfollow is undefined");
      return;
    }

    if (currentUser.userID === followUserId) {
      alert("You cannot follow yourself.");
      return;
    }

    const isFollowing = followedUsers.includes(followUserId);

    try {
      if (isFollowing) {
        const confirmed = window.confirm(
          `Are you sure you want to unfollow ${user.username}?`
        );

        if (!confirmed) return;

        await axios.delete(`http://localhost:8081/unfollow/${followUserId}`, {
          data: { followerId: currentUser.userID },
        });

        setFollowedUsers((prev) => prev.filter((id) => id !== followUserId));
        alert(`You have unfollowed user ${user.username}`);
      } else {
        const response = await axios.post(
          `http://localhost:8081/follow/${followUserId}`,
          {
            followerId: currentUser.userID,
          }
        );

        if (response.data.message === "Already following this user") {
          alert("You are already following this user.");
          return;
        }

        setFollowedUsers((prev) => [...prev, followUserId]);
        alert(`You are now following ${user.username}`);

        await axios.post(
          `http://localhost:8081/notifications/${followUserId}`,
          {
            userID: followUserId,
            actorID: currentUser.userID,
            entryID: null,
            profile_image: user.profile_image,
            type: "follow",
            message: `${currentUser.username} has followed you.`,
          }
        );
      }

      await fetchFollowedUsers(currentUser.userID);
    } catch (error) {
      console.error("Error toggling follow status:", error);
      alert("There was an error processing your request.");
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

  const suspensionTime = (suspendUntil) => {
    const now = new Date();
    const suspendDate = new Date(suspendUntil);

    const diff = suspendDate - now;

    if (diff <= 0) {
      return ``;
    }

    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const day = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `Y:${year} M:${month} D:${day} H:${hour} M:${minute}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const ownProfile = currentUser.userID == userID;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <MainLayout>
      <div
        className="container d-flex rounded shadow-sm mt-4 p-2 pt-3 pt-md-2"
        style={{ background: "#ffff" }}
      >
        {user.isSuspended ? (
          <SuspensionModal
            name={user.firstName}
            isAdmin={currentUser.isAdmin}
            show={true}
          ></SuspensionModal>
        ) : (
          ""
        )}
        <div className="w-100 row m-0">
          <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3 mb-lg-0 p-1 p-md-3">
            <div
              style={{
                position: "relative",
                backgroundColor: "#ffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "clamp(10rem, 17dvw, 20rem)",
                height: "clamp(10rem, 17dvw, 20rem)",
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
                      width: "clamp(2.3rem, 3dvw, 3rem)",
                      height: "clamp(2.3rem, 3dvw, 3rem)",
                      border: "3px solid #ffff",
                      right: ".2rem",
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
              className="w-100 position-relative rounded border-bottom pt-2 pt-lg-5"
              style={{ height: "80%" }}
            >
              <div>
                <h4 className="m-0">
                  {user.firstName} {user.lastName} ({user.alias || "No Alias"}){" "}
                </h4>
                {currentUser.isAdmin ? (
                  <h5 className="text-danger">
                    {user.isSuspended ? "Suspended " : ""}
                    {suspensionTime(user.suspendUntil)}
                  </h5>
                ) : (
                  ""
                )}
              </div>

              {user.isAdmin ? (
                ""
              ) : (
                <Followers
                  followersCount={user.followersCount}
                  followingCount={user.followingCount}
                ></Followers>
              )}
              <p className="mt-3 text-secondary">
                {user.bio || "No bio available."}
              </p>
            </div>
            <div
              className="w-100 d-flex justify-content-center  justify-content-lg-between algn-items-center pt-1"
              style={{ height: "4rem" }}
            >
              {ownProfile ? (
                <div>
                  {/* <button className="primaryButton py-2 px-5">
                    <h5 className="m-0">Follow</h5>
                  </button> */}
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  {currentUser.isAdmin ? (
                    <div className="d-flex gap-1">
                      <FlaggedDiaries userID={user.userID}></FlaggedDiaries>
                      <ReportedComments userID={user.userID}></ReportedComments>
                    </div>
                  ) : (
                    <>
                      {user.isAdmin ? (
                        <>
                          {/* <button
                            className="primaryButtonDisabled py-2 px-5"
                            disabled={user.isAdmin}
                          >
                            <h5 className="m-0">Follow</h5>
                          </button> */}
                        </>
                      ) : (
                        <>
                          <button
                            className="primaryButton py-2 px-5"
                            onClick={() => handleFollowToggle(user.userID)} // Use the user's ID directly
                            disabled={user.isAdmin}
                          >
                            <h5 className="m-0">
                              {" "}
                              {followedUsers.includes(user.userID)
                                ? "Unfollow"
                                : "Follow"}
                            </h5>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* {currentUser && currentUser.isAdmin ? "Im Admin" : " Im Not"} */}
              {ownProfile ? (
                <ProfileDropdown
                  userID={currentUser.userID}
                  isAdmin={currentUser.isAdmin}
                />
              ) : (
                <OthersProfileDropdown
                  isAdmin={currentUser.isAdmin}
                  userID={user.userID}
                  firstName={user.firstName}
                  reportedUserID={user.userID}
                  toBeReported={user.username}
                  suspended={user.isSuspended}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-4 mb-2 p-0 px-md-1">
            <JournalEntries userID={userID} ownProfile={ownProfile} />
          </div>

          <div className="col-md mb-2 p-0 px-md-1">
            {entries.length > 0 ? (
              entries
                .filter((entry) => ownProfile || entry.visibility !== "private")
                .map((entry) => (
                  <div className="w-100 ">
                    <DiaryEntryLayout
                      key={entry.entryID}
                      entry={entry}
                      user={currentUser}
                      // entryFirstName={entry.firstName}

                      followedUsers={followedUsers}
                      handleFollowToggle={handleFollowToggle}
                      handleClick={handleClick}
                      expandButtons={expandButtons}
                      formatDate={formatDate}
                    />

                    {/* {entry.firstName} */}
                  </div>
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
