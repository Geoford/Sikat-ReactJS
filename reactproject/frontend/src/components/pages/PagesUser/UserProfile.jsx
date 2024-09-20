import React from "react";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import UserNavBar from "../../Layouts/NavBarUser";
import Background from "../../Layouts/Background";

const UserProfile = () => {
  const Alias = "Alias";
  return (
    <div>
      <UserNavBar />
      <div className="container bg-light mt-5 p-3 rounded shadow">
        <div className="row">
          <div className="col-lg-3 col d-flex justify-content-center align-items-center ">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "clamp(250px, 50%, 450px)",
                height: "clamp(250px, 50%, 450px)",
                border: "2px solid lightgray",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={DefaultProfile}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md text-center text-md-start pt-5">
            <h5>Juan Dela Cruz ({Alias})</h5>
          </div>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default UserProfile;
