import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import uploadProfileIcon from "../../../assets/uploadProfile.png";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";
import RecentJournalEntries from "./UserProfileLayout/JournalEntries";
import ActivityLogs from "./UserProfileLayout/ActivityLogs";
import FiledCases from "./UserProfileLayout/FiledCases";
import UserDiary from "./UserProfileLayout/UserDiary";
import EditPersonalDetailButton from "./UserProfileLayout/EditPersonalDetailButton";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
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
      navigate("/Login");
    }
  }, [navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", user.userID);

    axios
      .post("http://localhost:8081/uploadProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser((prev) => ({
          ...prev,
          profile_image: response.data.filePath,
        }));
      })
      .catch((error) => {
        console.error("Failed to upload the file", error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <UserPageMainLayout>
      <div
        className="container position-relative mt-4 p-3"
        //
      >
        <div className="row">
          <div className="col-lg-4 col d-flex justify-content-center align-items-center ">
            <div
              style={{
                position: "relative",
                backgroundColor: "#ffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "clamp(250px, 50%, 450px)",
                height: "clamp(250px, 50%, 450px)",
                borderRadius: "50%",
                overflow: "",
              }}
            >
              <label htmlFor="uploadProfile">
                <div
                  className="grayHover"
                  style={{
                    position: "absolute",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    border: "3px solid #b300b3",
                    padding: "9px",
                    right: "15px",
                    bottom: "15px",
                  }}
                >
                  <img
                    src={uploadProfileIcon}
                    alt="Upload Icon"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="file"
                    id="uploadProfile"
                    hidden
                    onChange={handleFileUpload}
                  />
                </div>
              </label>

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
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div className="col-md d-flex align-items-center text-light text-center text-md-start">
            <div style={{ background: "#b300b3" }}>
              <h3>
                {user.firstName} {user.lastName} ({user.alias || "No Alias"})
              </h3>
              <p>
                {user.followersCount} Followers - {user.followingCount}{" "}
                Following
              </p>
              <p>{user.bio || "No bio available."}</p>
            </div>
          </div>
          <div>
            <EditPersonalDetailButton />
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row ">
          <div className="col-lg-4 mb-2 p-0 px-md-2">
            <div
              className="position-sticky d-flex flex-column gap-2"
              style={{ minHeight: "37vh", top: "70px" }}
            >
              <div>
                <RecentJournalEntries />
              </div>
            </div>
          </div>

          <div className="col p-0 px-md-2">
            <div className="" style={{ minHeight: "60vh" }}>
              <UserDiary />
            </div>
          </div>
        </div>
      </div>
    </UserPageMainLayout>
  );
};

export default UserProfile;
