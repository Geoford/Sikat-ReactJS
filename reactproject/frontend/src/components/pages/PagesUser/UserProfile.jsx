import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import uploadProfile from "../../../assets/uploadProfile.png";
import UserNavBar from "../../Layouts/LayoutUser/NavBarUser";
import Background from "../../Layouts/Background";
import RecentJournalEntries from "./UserProfileLayout/JournalEntries";
import ActivityLogs from "./UserProfileLayout/ActivityLogs";
import FiledCases from "./UserProfileLayout/FiledCases";
import UserDiary from "./UserProfileLayout/UserDiary";
import EditPersonalDetailButton from "./UserProfileLayout/EditPersonalDetailButton";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";

const UserProfile = () => {
  const [user, setUser] = useState(null);
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
      navigate("/Login");
    }
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <UserPageMainLayout>
      <div
        className="container position-relative mt-4 p-3 rounded shadow"
        style={{ background: "linear-gradient(to right, #ff8533, #990099)" }}
      >
        <div className="row">
          <div className="col-lg-4 col d-flex justify-content-center align-items-center">
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
                overflow: "hidden",
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
                    border: "2px solid #ff8533",
                    padding: "7px",
                    right: "15px",
                    bottom: "15px",
                  }}
                >
                  <img
                    src={uploadProfile}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <input type="file" id="uploadProfile" hidden />
                </div>
              </label>

              <img
                src={DefaultProfile}
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
          <div className="col-md text-center text-md-start pt-5">
            <h3>
              {user.firstName} {user.lastName} ({user.alias || "No Alias"})
            </h3>
            <p>
              {user.followersCount} Followers - {user.followingCount} Following
            </p>
            <p>{user.bio || "No bio available."}</p>
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
              style={{ minHeight: "37vh", top: "-45vh" }}
            >
              <div>
                <RecentJournalEntries />
              </div>
              <div>
                <ActivityLogs />
              </div>
              <div>
                <FiledCases />
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
