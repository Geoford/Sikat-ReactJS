import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import MainLayout from "../../Layouts/MainLayout";
import OthersJournalEntries from "./UserProfileLayout/OthersJournalEntries";
import OtherProfileDiary from "./UserProfileLayout/OtherProfileDiary";
import ProfileDropdown from "../../Layouts/LayoutUser/ProfileDropdown";
import OthersProfileDropdown from "../../Layouts/LayoutUser/OthersProfileDropdown";
import axios from "axios";

const Profile = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State to manage file
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const navigate = useNavigate();

  // Fetch the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      // If no user data is found, redirect to the homepage
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
  }, [userID, navigate, currentUser]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Check if the current user is viewing their own profile
  const ownProfile = currentUser.userID == userID;

  // Functions to toggle hover state
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
              <OtherProfileDiary userID={userID} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
