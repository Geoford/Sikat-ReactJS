import React from "react";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import uploadProfile from "../../../assets/uploadProfile.png";
import UserNavBar from "../../Layouts/NavBarUser";
import Background from "../../Layouts/Background";
import { Link, useNavigate } from "react-router-dom";
import RecentJournalEntries from "./UserProfileLayout/JournalEntries";
import ActivityLogs from "./UserProfileLayout/ActivityLogs";
import FiledCases from "./UserProfileLayout/FiledCases";
import UserDiary from "./UserProfileLayout/UserDiary";
import EditPersonalDetailButton from "./UserProfileLayout/EditPersonalDetailButton";

const UserProfile = () => {
  const Alias = "Alias";
  return (
    <div>
      <UserNavBar />
      <div
        className="container position-relative mt-4 p-3 rounded shadow"
        style={{ background: "linear-gradient(to right, #ff8533, #990099)" }}
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
                      marginBottom: "",
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
          <div className="col-md text-light text-center text-md-start d-flex flex-column justify-content-start justify-content-md-center ">
            <div className="">
              <h3>Juan Dela Cruz ({Alias})</h3>
              <p>(00) Followers - (00) following</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas dolorum tenetur necessitatibus quisquam nam,
                voluptatibus illum maxime assumenda molestias distinctio!
              </p>
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

      <Background />
    </div>
  );
};

export default UserProfile;
